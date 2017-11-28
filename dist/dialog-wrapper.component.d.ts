import { ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';
export declare class DialogWrapperComponent {
    private resolver;
    viewContainer: ViewContainerRef;
    wrapper: any;
    content: DialogComponent<any, any>;
    constructor(resolver: ComponentFactoryResolver);
    addComponent<T, T1>(component: Type<DialogComponent<T, T1>>): DialogComponent<any, any>;
}
