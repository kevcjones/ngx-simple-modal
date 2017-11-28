import { ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DialogWrapperComponent } from './dialog-wrapper.component';
import { DialogComponent } from './dialog.component';
import { DialogOptions } from './dialog.service';
export declare class DialogHolderComponent {
    private resolver;
    viewContainer: ViewContainerRef;
    dialogs: Array<DialogComponent<any, any>>;
    constructor(resolver: ComponentFactoryResolver);
    addDialog<T, T1>(component: Type<DialogComponent<T, T1>>, data?: T, options?: DialogOptions): Observable<T1>;
    removeDialog(component: DialogComponent<any, any>): void;
    removeAllDialogs(): void;
    addClickOutsideHandlersToWrapper(dialogWrapper: DialogWrapperComponent): void;
    private _removeElement(component);
}
