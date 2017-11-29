import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';

import { DialogService, DialogServiceConfig } from './dialog.service';

/**
 * Dialog service factory. Creates dialog service with options
 * @param { ComponentFactoryResolver } resolver
 * @param { ApplicationRef } applicationRef
 * @param { Injector } injector
 * @param { DialogServiceConfig } options
 * @return { DialogService }
 */
export function dialogServiceFactory(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, options: DialogServiceConfig) {
    return new DialogService(resolver, applicationRef, injector, options);
}
