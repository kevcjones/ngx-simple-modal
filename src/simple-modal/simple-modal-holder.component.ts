import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Type,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  DefaultSimpleModalOptionConfig,
  SimpleModalOptions,
  SimpleModalOptionsOverrides,
} from './simple-modal-options';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalComponent } from './simple-modal.component';

/**
 * View container manager which manages a list of modals currently active
 * inside the viewvontainer
 */
@Component({
  selector: 'simple-modal-holder',
  template: '<ng-template #viewContainer></ng-template>',
})
export class SimpleModalHolderComponent {
  /**
   * Target viewContainer to insert modals
   */
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true }) viewContainer;

  /**
   * modal collection, maintained by addModal and removeModal
   * @type {Array<SimpleModalComponent> }
   */
  modals: Array<SimpleModalComponent<any, any>> = [];

  /**
   * if auto focus is on and no element focused, store it here to be restored back after close
   */
  previousActiveElement = null;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(DefaultSimpleModalOptionConfig) private defaultSimpleModalOptions: SimpleModalOptions
  ) {}

  /**
   * Configures then adds modal to the modals array, and populates with data passed in
   * @param {Type<SimpleModalComponent>} component
   * @param {object?} data
   * @param {SimpleModalOptionsOverrides?} options
   * @return {Observable<*>}
   */
  addModal<T, T1>(
    component: Type<SimpleModalComponent<T, T1>>,
    data?: T,
    options?: SimpleModalOptionsOverrides
  ): Observable<T1> {
    // create component
    if (!this.viewContainer) {
      return of(null);
    }
    const factory = this.resolver.resolveComponentFactory(SimpleModalWrapperComponent);
    const componentRef = this.viewContainer.createComponent(factory);
    const modalWrapper: SimpleModalWrapperComponent = <SimpleModalWrapperComponent>(
      componentRef.instance
    );
    const _component: SimpleModalComponent<T, T1> = modalWrapper.addComponent(component);

    // assign options refs
    _component.options = options = Object.assign({}, this.defaultSimpleModalOptions, options);

    // set base classes for wrapper
    modalWrapper.modalClasses = options.wrapperDefaultClasses;

    // add to stack
    this.modals.push(_component);

    // wait a tick then setup the following while adding a modal
    this.wait().then(() => {
      this.toggleWrapperClass(modalWrapper.wrapper, options.wrapperClass);
      this.toggleBodyClass(options.bodyClass);
      this.wait(options.animationDuration).then(() => {
        this.autoFocusFirstElement(_component.wrapper, options.autoFocus);
      });
    });

    // when closing modal remove it
    _component.onClosing(modal => this.removeModal(modal));

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
      this.removeModalFromArray(closingModal);
      this.toggleBodyClass(options.bodyClass);
      this.restorePreviousFocus();
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
    const bodyClassItems = bodyClass.split(' ');
    if (!this.modals.length) {
      body.classList.remove(...bodyClassItems);
    } else {
      body.classList.add(...bodyClassItems);
    }
  }

  /**
   * if the option to close on background click is set, then hook up a callback
   * @param options
   * @param modalWrapper
   */
  private configureCloseOnClickOutside(modalWrapper: SimpleModalWrapperComponent) {
    if (modalWrapper.content.options.closeOnClickOutside) {
      modalWrapper.onClickOutsideModalContent(
        modalWrapper.content.options.closeOnClickOutside,
        () => {
          modalWrapper.content.close();
        }
      );
    }
  }

  /**
   * Auto focus o the first element if autofocus is on
   * @param options
   * @param modalWrapperEl
   */
  private autoFocusFirstElement(componentWrapper: ElementRef, autoFocus: boolean) {
    if (autoFocus) {
      const focusable = componentWrapper.nativeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length) {
        this.previousActiveElement = document.activeElement;
        focusable[0].focus();
      }
    }
  }

  /**
   * Restores the last focus is there was one
   */
  private restorePreviousFocus() {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  /**
   * Configure the adding and removal of a wrapper class - predominantly animation focused
   * @param options
   * @param modalWrapperEl
   */
  private toggleWrapperClass(modalWrapperEl: ElementRef, wrapperClass: string) {
    const wrapperClassList = modalWrapperEl.nativeElement.classList;
    const wrapperClassItems = wrapperClass.split(' ');
    if (wrapperClassList.toString().indexOf(wrapperClass) !== -1) {
      wrapperClassList.remove(...wrapperClassItems);
    } else {
      wrapperClassList.add(...wrapperClassItems);
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
   * Instructs the holder to remove the modal and
   * removes this component from the collection
   * @param {SimpleModalComponent} component
   */
  private removeModalFromArray(component) {
    const index = this.modals.indexOf(component);
    if (index > -1) {
      this.viewContainer.remove(index);
      this.modals.splice(index, 1);
    }
  }
}
