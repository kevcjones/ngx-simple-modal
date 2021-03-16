import { Component, ComponentFactoryResolver, ElementRef, Inject, Type, ViewContainerRef, ViewChild, Renderer2, ComponentRef, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DefaultSimpleModalOptionConfig, SimpleModalOptions, SimpleModalOptionsOverrides } from './simple-modal-options';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalComponent } from './simple-modal.component';
import { DraggableDirective } from './simple-modal-draggable.directive';

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
   * @param renderer
   * @param ngZone
   * @param defaultSimpleModalOptions
   */
  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(DefaultSimpleModalOptionConfig) private defaultSimpleModalOptions: SimpleModalOptions,
  ) {
  }

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
    options?: SimpleModalOptionsOverrides,
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
    const { ref: _componentRef, component: _component } = modalWrapper.addComponent(component);

    // assign options refs
    _component.options = options = Object.assign({}, this.defaultSimpleModalOptions, options) as SimpleModalOptions;

    // set base classes for wrapper
    modalWrapper.modalClasses = options.wrapperDefaultClasses;

    // add to stack
    this.modals.push(_component);

    // wait a tick then setup the following while adding a modal
    this.wait().then(() => {
      this.toggleWrapperClass(modalWrapper.wrapper, options.wrapperClass);
      this.toggleBodyClass(options.bodyClass);
      if (options.draggable) {
        this.setDraggable(_componentRef, options);
      }
      this.wait(options.animationDuration).then(() => {
        this.autoFocusFirstElement(_component.wrapper, options.autoFocus);
        _component.markAsReady();
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
   * @returns {Promise<void>}
   * @param closingModal
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
  private toggleBodyClass(bodyClass: string): void {
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
   * @param modalWrapper
   */
  private configureCloseOnClickOutside(modalWrapper: SimpleModalWrapperComponent) {
    modalWrapper.onClickOutsideModalContent(() => {
      if (modalWrapper.content.options.closeOnClickOutside) {
        modalWrapper.content.close();
      }
    });
  }

  /**
   * Auto focus o the first element if autofocus is on
   * @param componentWrapper
   * @param autoFocus
   */
  private autoFocusFirstElement(componentWrapper: ElementRef, autoFocus: boolean) {
    if (autoFocus) {
      const focusable = componentWrapper.nativeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
   * @param modalWrapperEl
   * @param wrapperClass
   */
  private toggleWrapperClass(modalWrapperEl: ElementRef, wrapperClass: string): void {
    const wrapperClassList = modalWrapperEl.nativeElement.classList;
    const wrapperClassItems = wrapperClass.split(' ');
    if (wrapperClassList.toString().indexOf(wrapperClass) !== -1) {
      wrapperClassList.remove(...wrapperClassItems);
    } else {
      wrapperClassList.add(...wrapperClassItems);
    }
  }

  /**
   * Enables the drag option on the modal if the options have it enabled
   * @param component
   * @param options
   * @private
   */
  private setDraggable(component: ComponentRef<SimpleModalComponent<any, any>>, options: SimpleModalOptionsOverrides): void {
    const draggableDirective = new DraggableDirective(component.location, this.ngZone, this.renderer);
    draggableDirective.dragTarget = component.location.nativeElement;
    draggableDirective.dragHandle = component.instance.handle ? component.instance.handle.nativeElement : undefined;
    draggableDirective.ngAfterViewInit();
    component.location.nativeElement.classList.add(options.draggableClass);
  }

  /**
   * Helper function for a more readable timeout
   * @param ms
   */
  private wait(ms: number = 0): Promise<unknown> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }

  /**
   * Instructs the holder to remove the modal and
   * removes this component from the collection
   * @param {SimpleModalComponent} component
   */
  private removeModalFromArray(component): void {
    const index = this.modals.indexOf(component);
    if (index > -1) {
      this.viewContainer.remove(index);
      this.modals.splice(index, 1);
    }
  }
}
