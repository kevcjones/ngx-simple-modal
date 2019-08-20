import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy,
  ReflectiveInjector,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SimpleModalComponent } from './simple-modal.component';

/**
 * The modal backdrop wrapping wrapper to the modal
 */
@Component({
  selector: 'simple-modal-wrapper',
  template: `
    <div #wrapper [ngClass]="modalClasses" [ngStyle]="{ display: 'block' }" role="dialog">
      <ng-template #viewContainer></ng-template>
    </div>
  `,
})
export class SimpleModalWrapperComponent implements OnDestroy {
  /**
   * Target viewContainer to insert modal content component
   */
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true }) viewContainer;

  /**
   * Link wrapper DOM element
   */
  @ViewChild('wrapper', { read: ElementRef, static: true })
  wrapper: ElementRef;

  /**
   * Wrapper modal and fade classes
   */
  modalClasses = 'modal fade-anim';

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
    this.content = <SimpleModalComponent<T, T1>>componentRef.instance;
    this.content.wrapper = this.wrapper;
    return this.content;
  }

  /**
   * Configures the function to call when you click on background of a modal but not the contents
   * @param callback
   */
  onClickOutsideModalContent(contentClass: boolean, callback: () => void) {
    this.clickOutsideCallback = callback;
    const containerEl = this.wrapper.nativeElement;
    const contentEl = containerEl.querySelector(':first-child');
    contentEl.addEventListener('click', this.stopEventPropagation);
    containerEl.addEventListener('click', this.clickOutsideCallback, false);
  }

  ngOnDestroy() {
    if (this.clickOutsideCallback) {
      const containerEl = this.wrapper.nativeElement;
      containerEl
        .querySelector(':first-child')
        .removeEventListener('click', this.stopEventPropagation);
      containerEl.removeEventListener('click', this.clickOutsideCallback, false);
      this.clickOutsideCallback = null;
    }
  }

  /**
   * Helper function to stop event propagation, as a function so easily unlistened to
   * @param event
   */
  private stopEventPropagation(event) {
    event.stopPropagation();
  }
}
