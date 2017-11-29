import { CommonModule } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Injector, ModuleWithProviders, NgModule } from '@angular/core';

import { SimpleModalHolderComponent } from './simple-modal-holder.component';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalService, SimpleModalServiceConfig } from './simple-modal.service';
import { SimpleModalServiceFactory } from './simple-modal-service.factory';

@NgModule({
    declarations: [
        SimpleModalHolderComponent,
        SimpleModalWrapperComponent
    ],
    providers: [
        SimpleModalService
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        SimpleModalHolderComponent,
        SimpleModalWrapperComponent
    ]
})
export class SimpleModalModule {
    static forRoot(config: SimpleModalServiceConfig): ModuleWithProviders {
        return {
            ngModule: SimpleModalModule,
            providers: [
                {provide: SimpleModalServiceConfig, useValue: config},
                {
                    provide: SimpleModalService,
                    useFactory: SimpleModalServiceFactory,
                    deps: [ComponentFactoryResolver, ApplicationRef, Injector, SimpleModalServiceConfig]
                }
            ]
        };
    }
}


