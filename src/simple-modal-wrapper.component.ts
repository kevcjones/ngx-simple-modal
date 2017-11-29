import { Component, ComponentFactoryResolver, OnDestroy, ReflectiveInjector, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { SimpleModalComponent } from './simple-modal.component';

/**
 * The modal backdrop wrapping wrapper to the modal
 */
@Component({
  selector: 'simple-modal-wrapper',
  template: `
    <div #wrapper class="modal fade" style="display:block !important;" role="dialog">
        <ng-template #viewContainer></ng-template>
    </div>
`
})
export class SimpleModalWrapperComponent implements OnDestroy {

  /**
   * Target viewContainer to insert modal content component
   */
  @ViewChild('viewContainer', {read: ViewContainerRef}) public viewContainer: ViewContainerRef;

  /**
   * Link wrapper DOM element
   */
  @ViewChild('wrapper') public wrapper;

  /**
   * Dialog content componet
   * @type {SimpleModalComponent}
   */
  content: SimpleModalComponent<any, any>;

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
   * Adds content modal component to wrapper
   * @param {Type<SimpleModalComponent>} component
   * @return {SimpleModalComponent}
   */
  addComponent<T, T1>(component: Type<SimpleModalComponent<T, T1>>) {
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
    const componentRef = factory.create(injector);
    this.viewContainer.insert(componentRef.hostView);
    this.content =  <SimpleModalComponent<T, T1>> componentRef.instance;
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


