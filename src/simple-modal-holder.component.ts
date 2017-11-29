import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalComponent } from './simple-modal.component';
import { SimpleModalOptions } from './simple-modal-options';

@Component({
  selector: 'simple-modal-holder',
  template: '<ng-template #viewContainer></ng-template>',
})
export class SimpleModalHolderComponent {

  /**
   * Target viewContainer to insert modals
   */
  @ViewChild('viewContainer', {read: ViewContainerRef}) public viewContainer: ViewContainerRef;

  /**
   * modal collection, maintained by addModal and removeModal
   * @type {Array<SimpleModalComponent> }
   */
  modals: Array<SimpleModalComponent<any, any>> = [];

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Configures then adds modal to the modals array, and populates with data passed in
   * @param {Type<SimpleModalComponent>} component
   * @param {object?} data
   * @param {SimpleModalOptions?} options
   * @return {Observable<*>}
   */
  addModal<T, T1>(component: Type<SimpleModalComponent<T, T1>>, data?: T, options?: SimpleModalOptions): Observable<T1> {
    options = options || <SimpleModalOptions>{};

    const factory = this.resolver.resolveComponentFactory(SimpleModalWrapperComponent);
    const componentRef = this.viewContainer.createComponent(factory, options.index);
    const modalWrapper: SimpleModalWrapperComponent = <SimpleModalWrapperComponent> componentRef.instance;
    const _component: SimpleModalComponent<T, T1> =  modalWrapper.addComponent(component);

    if (typeof(options.index) !== 'undefined') {
      this.modals.splice(options.index, 0, _component);
    } else {
      this.modals.push(_component);
    }
    setTimeout(() => {
      modalWrapper.wrapper.nativeElement.classList.add('show');
      modalWrapper.wrapper.nativeElement.classList.add('in');
    });
    if (options.autoCloseTimeout) {
      setTimeout(() => {
        this.removeModal(_component);
      }, options.autoCloseTimeout);
    }
    if (options.closeByClickingOutside) {
      modalWrapper.onClickOutsideModalContent( () => {
        this.removeModal(modalWrapper.content);
      });
    }
    if (options.backdropColor) {
      modalWrapper.wrapper.nativeElement.style.backgroundColor = options.backdropColor;
    }
    // to avoid circular references hand the modal a callback for it to self close
    _component.onClose(this.removeModal.bind(this));

    // update the body class depending on the count
    this.toggleModalOpenClassOnBody();

    return _component.fillData(data);
  }

  /**
   * Initiates the removal of a modal from the collection,
   * removal is deferred by 300ms to give classList updates enough
   * to take effect
   * @param {SimpleModalComponent} component
   */
  removeModal(component: SimpleModalComponent<any, any>) {
    const containerEl = component.wrapper.nativeElement;
    containerEl.classList.remove('show');
    containerEl.classList.remove('in');
    setTimeout(() => {
        this._removeElement(component);
    }, 300);
  }


  /**
   * Insructs the holder element to remove all modals,
   * and flushes the collections
   */
  removeAllModals() {
    this.viewContainer.clear();
    this.modals = [];
  }

  /**
   * Bind a body class 'modal-open' to a condition of modals in pool > 0
   */

  private toggleModalOpenClassOnBody() {
    const bodyClass = 'modal-open';
    const body = document.getElementsByTagName('body')[0];
    if (!this.modals.length) {
      body.classList.remove(bodyClass);
    } else {
      body.classList.add(bodyClass);
    }
  }

  /**
   * Instructs the holder to remove the modal and
   * removes this component from the collection
   * @param {SimpleModalComponent} component
   */
  private _removeElement(component) {
    const index = this.modals.indexOf(component);
    if (index > -1) {
      this.viewContainer.remove(index);
      this.modals.splice(index, 1);
    }
    this.toggleModalOpenClassOnBody();
  }

}
