import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { Observable } from 'rxjs/Observable';

import { defaultModalOptions, SimpleModalOptions } from './simple-modal-options';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalComponent } from './simple-modal.component';

@Component({
  selector: 'simple-modal-holder',
  template: '<ng-template #viewContainer></ng-template>',
})
export class SimpleModalHolderComponent {

  /**
   * Target viewContainer to insert modals
   */
  @ViewChild('viewContainer', { read: ViewContainerRef }) public viewContainer: ViewContainerRef;

  /**
   * modal collection, maintained by addModal and removeModal
   * @type {Array<SimpleModalComponent> }
   */
  modals: Array<SimpleModalComponent<any, any>> = [];

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) { }

  /**
   * Configures then adds modal to the modals array, and populates with data passed in
   * @param {Type<SimpleModalComponent>} component
   * @param {object?} data
   * @param {SimpleModalOptions?} options
   * @return {Observable<*>}
   */
  addModal<T, T1>(component: Type<SimpleModalComponent<T, T1>>, data?: T, options?: SimpleModalOptions): Observable<T1> {

    // create component
    const factory = this.resolver.resolveComponentFactory(SimpleModalWrapperComponent);
    const componentRef = this.viewContainer.createComponent(factory);
    const modalWrapper: SimpleModalWrapperComponent = <SimpleModalWrapperComponent>componentRef.instance;
    const _component: SimpleModalComponent<T, T1> = modalWrapper.addComponent(component);

    // assign options refs
    _component.options = options = Object.assign({}, defaultModalOptions, options);

    // add to stack
    this.modals.push(_component);

    // when opening the modal
    this.onOpening(() => {
      this.toggleWrapperClass(modalWrapper.wrapper, options.wrapperClass);
      this.toggleBodyClass(options.bodyClass);
    });

    // when closing modal
    _component.onClosing((modal) => this.removeModal(modal));

    // if clicking on background closes modal
    this.configureCloseOnClickOutside(modalWrapper);

    // map and return observable
    _component.mapDataObject(data);
    return _component.setupObserver();
  }

  /**
   * triggers components close function
   * to take effect
   * @param {SimpleModalComponent} component
   * @returns {Promise<void>}
   */
  removeModal(closingModal: SimpleModalComponent<any, any>): Promise<any> {
    const options = closingModal.options;
    this.toggleWrapperClass(closingModal.wrapper, options.wrapperClass);
    return this.wait(options.animationDuration).then(() => {
      this._removeElement(closingModal);
      this.toggleBodyClass(options.bodyClass);
    });
  }

  /**
  * Instructs all open modals to
  */
  removeAllModals(): Promise<any> {
    return Promise.all(this.modals.map(modal => this.removeModal(modal)));
  }

  /**
   * Bind a body class 'modal-open' to a condition of modals in pool > 0
   * @param bodyClass - string to add and remove from body in document
   */
  private toggleBodyClass(bodyClass: string) {
    if (!bodyClass) {
      return;
    }
    const body = document.getElementsByTagName('body')[0];
    if (!this.modals.length) {
      body.classList.remove(bodyClass);
    } else {
      body.classList.add(bodyClass);
    }
  }

  /**
   * if the option to close on background click is set, then hook up a callback
   * @param options
   * @param modalWrapper
   */
  private configureCloseOnClickOutside(modalWrapper: SimpleModalWrapperComponent) {
    if (modalWrapper.content.options.closeOnClickOutside) {
      modalWrapper.onClickOutsideModalContent(modalWrapper.content.options.closeOnClickOutside, () => {
        modalWrapper.content.close();
      });
    }
  }

  /**
   * Configure the adding and removal of a wrapper class - predominantly animation focused
   * @param options
   * @param modalWrapperEl
   */
  private toggleWrapperClass(modalWrapperEl: ElementRef, wrapperClass: string) {
    const wrapperClassList = modalWrapperEl.nativeElement.classList;
    if (wrapperClassList.contains(wrapperClass)) {
      wrapperClassList.remove(wrapperClass);
    } else {
      wrapperClassList.add(wrapperClass);
    }
  }

  /**
   * Helper function for a more readable timeout
   * @param ms
   */
  private wait(ms: number = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }


  /**
   * Side effects to other DOM when this component opens
   * @param options
   * @param _component
   * @param modalWrapper
   */
  private onOpening(onModalOpened: () => void) {
    // wait a tick for DOM then perform addition actions
    this.wait().then(() => onModalOpened());
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
  }

}
