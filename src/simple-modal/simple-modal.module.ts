import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';

import { SimpleModalHolderComponent } from './simple-modal-holder.component';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalService, SimpleModalServiceConfig } from './simple-modal.service';
import { SimpleModalServiceFactory } from './simple-modal-service.factory';
import {
  defaultSimpleModalOptions,
  DefaultSimpleModalOptionConfig,
  SimpleModalOptions,
} from './simple-modal-options';

@NgModule({
  declarations: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
  providers: [
    SimpleModalService,
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: defaultSimpleModalOptions,
    },
  ],
  imports: [CommonModule],
  entryComponents: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
})
export class SimpleModalModule {
  static forRoot(
    config: SimpleModalServiceConfig,
    defaultModalOptions?: SimpleModalOptions
  ): ModuleWithProviders {
    return {
      ngModule: SimpleModalModule,
      providers: [
        { provide: SimpleModalServiceConfig, useValue: config },
        {
          provide: SimpleModalService,
          useFactory: SimpleModalServiceFactory,
          deps: [ComponentFactoryResolver, ApplicationRef, Injector, SimpleModalServiceConfig],
        },
        {
          provide: DefaultSimpleModalOptionConfig,
          useValue: defaultModalOptions || defaultSimpleModalOptions,
        },
      ],
    };
  }

  constructor() {}
}
