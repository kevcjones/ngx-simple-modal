import { CommonModule } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Injector, ModuleWithProviders, NgModule } from '@angular/core';

import { DialogHolderComponent } from './dialog-holder.component';
import { DialogWrapperComponent } from './dialog-wrapper.component';
import { DialogService, DialogServiceConfig } from './dialog.service';
import { dialogServiceFactory } from './dialog-service.factory';

@NgModule({
    declarations: [
        DialogHolderComponent,
        DialogWrapperComponent
    ],
    providers: [
        DialogService
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        DialogHolderComponent,
        DialogWrapperComponent
    ]
})
export class DialogModalModule {
    static forRoot(config: DialogServiceConfig): ModuleWithProviders {
        return {
            ngModule: DialogModalModule,
            providers: [
                {provide: DialogServiceConfig, useValue: config},
                {
                    provide: DialogService,
                    useFactory: dialogServiceFactory,
                    deps: [ComponentFactoryResolver, ApplicationRef, Injector, DialogServiceConfig]
                }
            ]
        };
    }
}


