import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';

import { SimpleModalService, SimpleModalServiceConfig } from './simple-modal.service';

/**
 * Dialog service factory. Creates dialog service with options
 * @param { ComponentFactoryResolver } resolver
 * @param { ApplicationRef } applicationRef
 * @param { Injector } injector
 * @param { SimpleModalServiceConfig } options
 * @return { SimpleModalService }
 */
export function SimpleModalServiceFactory(resolver: ComponentFactoryResolver,
                                          applicationRef: ApplicationRef,
                                          injector: Injector,
                                          options: SimpleModalServiceConfig) {
    return new SimpleModalService(resolver, applicationRef, injector, options);
}
