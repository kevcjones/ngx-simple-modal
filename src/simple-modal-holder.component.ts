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

    options = Object.assign({}, defaultModalOptions, options);

    // create
    const factory = this.resolver.resolveComponentFactory(SimpleModalWrapperComponent);
    const componentRef = this.viewContainer.createComponent(factory, options.index);
    const modalWrapper: SimpleModalWrapperComponent = <SimpleModalWrapperComponent>componentRef.instance;
    const _component: SimpleModalComponent<T, T1> = modalWrapper.addComponent(component);

    // config
    this.configIndex(options, _component);
    this.configAutoClose(options, _component);
    this.configCloseOnClickOutside(options, modalWrapper);
    this.configOpenActions(options, modalWrapper);
    this.configCloseActions(options, _component);

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
  removeModal(component: SimpleModalComponent<any, any>): Promise<any> {
    return component.close();
  }


   /**
   * Instructs all open modals to
   */
  removeAllModals(): Promise<any> {
    return Promise.all( this.modals.map( modal => modal.close()));
  }


  /**
   * Bind a body class 'modal-open' to a condition of modals in pool > 0
   * @param bodyClass - string to add and remove from body in document
   */
  private configBodyClass(options: SimpleModalOptions) {
    const bodyClass = options.bodyClass;
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
   * Take the index value in config and use it to splice into array of modals
   * TODO - challenge the point of this?
   * @param options
   * @param _component
   */
  private configIndex(options: SimpleModalOptions, _component: SimpleModalComponent<any, any>) {
    if ((options.index >= 0) && (options.index < this.modals.length)) {
      this.modals.splice(options.index, 0, _component);
    } else {
      this.modals.push(_component);
    }
  }

  /**
   * if there is an autoclose timeout in options, wait for that time and then call remove
   * @param options
   * @param _component
   */
  private configAutoClose(options: SimpleModalOptions, _component: SimpleModalComponent<any, any>) {
    if (options.autoCloseTimeout > 0) {
      this.wait(options.autoCloseTimeout).then(() => {
        _component.close();
      });
    }
  }

  /**
   * if the option to close on background click is set, then hook up a callback
   * @param options
   * @param modalWrapper
   */
  private configCloseOnClickOutside(options: SimpleModalOptions, modalWrapper: SimpleModalWrapperComponent) {
    if (options.closeByClickingOutside) {
      modalWrapper.onClickOutsideModalContent(() => {
        modalWrapper.content.close();
      });
    }
  }

  /**
   * Side effects to other DOM when this component opens
   * @param options
   * @param _component
   * @param modalWrapper
   */
  private configOpenActions(options: SimpleModalOptions, modalWrapper: SimpleModalWrapperComponent) {
    // wait a tick for DOM then perform addition actions
    this.wait().then(() => {
      this.configWrapperClass(options, modalWrapper.wrapper);
      this.configBodyClass(options);
    });
  }

  /**
   * When close function is called this callback is too
   * @param options
   * @param _component
   * @param modalWrapper
   */
  private configCloseActions(options: SimpleModalOptions, _component: SimpleModalComponent<any, any>) {
    _component.onClose(closingComponent => {
      this.configWrapperClass(options, _component.wrapper);
      this.configBodyClass(options);
      return this.wait(options.animationDuration).then( () => {
        this._removeElement(closingComponent);
      });
    });
  }


  private configWrapperClass(options: SimpleModalOptions, modalWrapperEl: ElementRef) {
    const wrapperClassList = modalWrapperEl.nativeElement.classList;
    if (wrapperClassList.contains(options.wrapperClass)) {
      wrapperClassList.remove(options.wrapperClass);
    } else {
      wrapperClassList.add(options.wrapperClass);
    }
  }


  private wait(ms: number = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
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
