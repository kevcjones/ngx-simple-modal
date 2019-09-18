// https://github.com/angular/angular/issues/14324#issuecomment-481898762
// needed for a raher shit Angular shortcoming around entry component and lazy loaded modules
import {
  Injectable,
  ComponentFactoryResolver,
  Type,
  ComponentFactory,
  Optional,
} from '@angular/core';

@Injectable()
export class CoalescingComponentFactoryResolver extends ComponentFactoryResolver {
  private rootResolve: (component: Type<any>) => ComponentFactory<any>;

  private inCall = false;

  private readonly resolvers = new Map<
    ComponentFactoryResolver,
    (component: Type<any>) => ComponentFactory<any>
  >();

  constructor(@Optional() private readonly rootResolver: ComponentFactoryResolver) {
    super();
  }

  init() {
    if (this.rootResolver) {
      this.rootResolve = this.rootResolver.resolveComponentFactory;
      this.rootResolver.resolveComponentFactory = this.resolveComponentFactory;
    }
  }

  registerResolver(resolver: ComponentFactoryResolver) {
    if (this.rootResolver) {
      const original = resolver.resolveComponentFactory;
      this.resolvers.set(resolver, original);
    }
  }

  resolveComponentFactory = <T>(component: Type<T>): ComponentFactory<T> => {
    // Prevents cyclic calls.
    if (this.inCall) {
      return null;
    }

    this.inCall = true;
    try {
      const result = this.resolveInternal(component);
      return result;
    } finally {
      this.inCall = false;
    }
  }

  private resolveInternal = <T>(component: Type<T>): ComponentFactory<T> => {
    for (const [resolver, fn] of Array.from(this.resolvers.entries())) {
      try {
        const factory = fn.call(resolver, component);
        if (factory) {
          return factory;
        }
      } catch {}
    }

    return this.rootResolve.call(this.rootResolver, component);
  }
}
