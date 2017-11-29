import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Optional, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SimpleModalHolderComponent } from './simple-modal-holder.component';
import { SimpleModalComponent } from './simple-modal.component';
import { SimpleModalOptions } from './simple-modal-options';


export class SimpleModalServiceConfig {
  container: HTMLElement | PromiseLike<HTMLElement> = null;
}

@Injectable()
export class SimpleModalService {

  /**
   * Placeholder of modal dialogs
   * @type {SimpleModalHolderComponent}
   */
  private modalHolderComponent: SimpleModalHolderComponent;

  /**
   * HTML container for dialogs
   * type {HTMLElement}
   */
  private container: HTMLElement;

  /**
   * @param {ComponentFactoryResolver} resolver
   * @param {ApplicationRef} applicationRef
   * @param {Injector} injector
   * @param {SimpleModalServiceConfig} config
   */
  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Optional() config: SimpleModalServiceConfig) {
      Promise.resolve(config && config.container).then(container => {
        this.container = container;
      });
  }

  /**
   * Adds dialog
   * @param {Type<SimpleModalComponent<T, T1>>} component
   * @param {T?} data
   * @param {SimpleModalOptions?} options
   * @return {Observable<T1>}
   */
  addModal<T, T1>(component: Type<SimpleModalComponent<T, T1>>, data?: T, options?: SimpleModalOptions): Observable<T1> {
    if (!this.modalHolderComponent) {
      this.modalHolderComponent = this.createSimpleModalHolder();
    }
    return this.modalHolderComponent.addModal<T, T1>(component, data, options);
  }

  /**
   * Hides and removes dialog from DOM
   * @param {SimpleModalComponent} component
   */
  removeModal(component: SimpleModalComponent<any, any>): void {
    if (!this.modalHolderComponent) {
      return;
    }
    this.modalHolderComponent.removeModal(component);
  }

  /**
   * Closes all dialogs
   */
  removeAll(): void {
    if (!this.modalHolderComponent) {
      return;
    }
    this.modalHolderComponent.removeAllModals();
  }

  /**
   * Creates and add to DOM dialog holder component
   * @return {SimpleModalHolderComponent}
   */
  private createSimpleModalHolder(): SimpleModalHolderComponent {

    const componentFactory = this.resolver.resolveComponentFactory(SimpleModalHolderComponent);

    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if (!this.container) {
      const componentRootViewContainer = this.applicationRef['components'][0];
      this.container = (componentRootViewContainer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });
    this.container.appendChild(componentRootNode);

    return componentRef.instance;
  }

}
