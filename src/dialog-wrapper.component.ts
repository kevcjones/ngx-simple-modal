import { Component, ComponentFactoryResolver, OnDestroy, ReflectiveInjector, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { DialogComponent } from './dialog.component';

/**
 * The modal backdrop wrapping wrapper to the modal
 */
@Component({
  selector: 'dialog-wrapper',
  template: `
    <div #wrapper class="modal fade" style="display:block !important;" role="dialog">
        <ng-template #viewContainer></ng-template>
    </div>
`
})
export class DialogWrapperComponent implements OnDestroy {

  /**
   * Target viewContainer to insert dialog content component
   */
  @ViewChild('viewContainer', {read: ViewContainerRef}) public viewContainer: ViewContainerRef;

  /**
   * Link wrapper DOM element
   */
  @ViewChild('wrapper') public wrapper;

  /**
   * Dialog content componet
   * @type {DialogComponent}
   */
  content: DialogComponent<any, any>;

  /**
   * Click outside callback
   */
  clickOutsideCallback: () => void;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds content dialog component to wrapper
   * @param {Type<DialogComponent>} component
   * @return {DialogComponent}
   */
  addComponent<T, T1>(component: Type<DialogComponent<T, T1>>) {
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
    const componentRef = factory.create(injector);
    this.viewContainer.insert(componentRef.hostView);
    this.content =  <DialogComponent<T, T1>> componentRef.instance;
    this.content.wrapper = this.wrapper;
    return this.content;
  }

  onClickOutsideModalContent( callback: () => void) {
    this.clickOutsideCallback = callback;
    const containerEl = this.wrapper.nativeElement;
    containerEl.querySelector(':first-child').addEventListener('click', this.stopEventPropagation);
    containerEl.addEventListener('click', this.clickOutsideCallback, false);
  }

  private stopEventPropagation(event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    if (this.clickOutsideCallback) {
      const containerEl = this.wrapper.nativeElement;
      containerEl.querySelector(':first-child').removeEventListener('click', this.stopEventPropagation);
      containerEl.removeEventListener('click', this.clickOutsideCallback, false);
      this.clickOutsideCallback = null;
    }
  }
}


