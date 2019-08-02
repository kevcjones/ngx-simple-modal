import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Optional,
  Type,
} from '@angular/core';
import { Observable } from 'rxjs';

import { SimpleModalHolderComponent } from './simple-modal-holder.component';
import { SimpleModalComponent } from './simple-modal.component';
import { SimpleModalOptionsOverrides } from './simple-modal-options';

export class SimpleModalServiceConfig {
  container: HTMLElement | string = null;
}

@Injectable()
export class SimpleModalService {
  /**
   * Placeholder of modals
   * @type {SimpleModalHolderComponent}
   */
  private modalHolderComponent: SimpleModalHolderComponent;

  /**
   * HTML container for modals
   * type {HTMLElement | string}
   */
  private _container;

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
    @Optional() config: SimpleModalServiceConfig
  ) {
    if (config) {
      this.container = config.container as any;
    }
  }

  /**
   * Adds modal
   * @param {Type<SimpleModalComponent<T, T1>>} component
   * @param {T?} data
   * @param {SimpleModalOptionsOverrides?} options
   * @return {Observable<T1>}
   */
  addModal<T, T1>(
    component: Type<SimpleModalComponent<T, T1>>,
    data?: T,
    options?: SimpleModalOptionsOverrides
  ): Observable<T1> {
    if (!this.modalHolderComponent) {
      this.modalHolderComponent = this.createSimpleModalHolder();
    }
    return this.modalHolderComponent.addModal<T, T1>(component, data, options);
  }

  /**
   * Hides and removes modal from DOM, resolves promise when fully removed
   * @param {SimpleModalComponent} component
   * @return {Promise<{}>}

   */
  removeModal(component: SimpleModalComponent<any, any>): Promise<{}> {
    if (!this.modalHolderComponent) {
      return Promise.resolve({});
    }
    return this.modalHolderComponent.removeModal(component);
  }

  /**
   * Closes all modals, resolves promise when they're fully removed
   * @return {Promise<{}>}
   */
  removeAll(): Promise<{}> {
    if (!this.modalHolderComponent) {
      return Promise.resolve({});
    }
    return this.modalHolderComponent.removeAllModals();
  }

  /**
   * Accessor for contain - will auto generate from string
   * if needed or default to the root element if nothing was set
   */

  private set container(c) {
    this._container = c;
  }

  private get container(): HTMLElement {
    if (typeof this._container === 'string') {
      this._container = document.getElementById(this._container);
    }

    if (!this._container && this.applicationRef['components'].length) {
      const componentRootViewContainer = this.applicationRef['components'][0];
      this.container = (componentRootViewContainer.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
    }

    // fallback
    if (!this._container || typeof this._container === 'string') {
      this._container = document.getElementsByTagName('body')[0];
    }

    return this._container;
  }

  /**
   * Creates and add to DOM modal holder component
   * @return {SimpleModalHolderComponent}
   */
  private createSimpleModalHolder(): SimpleModalHolderComponent {
    const componentFactory = this.resolver.resolveComponentFactory(SimpleModalHolderComponent);

    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    this.container.appendChild(componentRootNode);

    return componentRef.instance;
  }
}
