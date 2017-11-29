# NGX Simple Modal

* In development - moving over from ngx-simple-modal *

It is a library to make usage modal easier in Angular2, has no dependencies, but plays well with bootstrap or other frameworks. 
Create clear and reusable modal components.
It makes managing dialogs painless and clearer. 
Extend the ModalComponent class and implement any content you want. 

## Installation
```npm
npm install ngx-simple-modal
```
TODO - add demo link
TODO - add css usage 

## Quickstart

### Step 0. add CSS  
You can add CSS from component

TODO show how to include the css file via the angular config file
```json

```

### Step 1. import '**SimpleModalModule**' module

app.module.ts:
```typescript
import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { NGXSimpleModalModule } from 'ngx-simple-modal';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NGXSimpleModalModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
By default, dialog placeholder will be added to AppComponent.
But you can select custom placeholder (i.e. document body):

```typescript
imports: [
    ...
    NGXSimpleModalModule.forRoot({container:document.body})
  ]
```

If you want a container that is not yet in the DOM during the intial load you can pass a promiseLike function instead to container e.g. 

```typescript
imports: [
    ...
    NGXSimpleModalModule.forRoot({container: elementPromisingFn()})
  ]
```

where `elementPromisingFn` is anything you want as long as its resolvement returns a nativeElement node from the DOM.

### Step 2. Create your modal component 
Your modal is expected to be extended from **SimpleModalComponent**.
**SimpleModalService** is generic class with two arguments:
1) input dialog data type (data to initialize component);
2) dialog result type;

Therefore **SimpleModalService** is supposed to be a constructor argument of **SimpleModalComponent**.

confirm.component.ts:
```typescript
import { Component } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`
})
export class ConfirmComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}
```

### Step 3. Register created component to module
Add component to **declarations** and **entryComponents** section, because the component
will be created dynamically.

app.module.ts:
```typescript
    import { NgModule} from '@angular/core';
    import { CommonModule } from "@angular/common";
    import { BrowserModule } from '@angular/platform-browser';
    import { NGXSimpleModalModule } from 'ngx-simple-modal';
    import { ConfirmComponent } from './confirm.component';
    import { AppComponent } from './app.component';
    @NgModule({
      declarations: [
        AppComponent,
        ConfirmComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        NGXSimpleModalModule
      ],
      //Don't forget to add the component to entryComponents section
      entryComponents: [
        ConfirmComponent
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
```

### Step 4. Usage

app.component.ts
```typescript
    import { Component } from '@angular/core';
    import { ConfirmComponent } from './confirm.component';
    import { SimpleModalService } from "ngx-simple-modal";
    
    @Component({
      selector: 'app',
      template: `
        <div class="container">
          <button class="btn btn-default" (click)=showConfirm()>Show confirm</button>
        </div>
      `
    })
    export class AppComponent {
        constructor(private simpleModalService:SimpleModalService) {}
        showConfirm() {
            let disposable = this.simpleModalService.addModal(ConfirmComponent, {
                  title: 'Confirm title', 
                  message: 'Confirm message'
                })
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
            //We can close dialog calling disposable.unsubscribe();
            //If dialog was not closed manually close it by timeout
            setTimeout(()=>{
                disposable.unsubscribe();
            },10000);
        }
    }
```

## Documentation

### SimpleModalComponent
Super class of all modal components.
#### Class Overview
```typescript
/**
* Dialog abstract class
* @template T1 - input dialog data
* @template T2 - dialog result
*/
abstract abstract class SimpleModalComponent<T1, T2> implements T1 {
    /**
    * Constructor
    * @param {SimpleModalService} simpleModalService - instance of SimpleModalService
    */
    constructor(simpleModalService: SimpleModalService)
    
    /**
    * Dialog result 
    * @type {T2}
    */
    protected result:T2
    
    /**
    * Closes dialog
    */
    public close:Function
}
```

### SimpleModalOptions 
```typescript
interface SimpleModalOptions {
  /**
  * Dialog index (optional) to set order of modals
  * @type {number}
  */
  index?: number;
 
  /**
  * Timestamp to close dialog automatically after timeout (in msec)
  * @type {number}
  */
  autoCloseTimeout?: number;
  
  /**
  * Flag to close dialog by click on backdrop (outside dialog)
  * @type {boolean}
  */
  closeByClickingOutside?: boolean;
}
```

### SimpleModalService 
Service to show and hide dialogs

### Class Overview
```typescript
class SimpleModalService {
    /**
    * Adds dialog
    * @param {Type<SimpleModalComponent<T1, T2>} component - Modal dialog component
    * @param {T1?} data - Initialization data for component (optional) to add to component instance and can be used in component code or template 
    * @param {SimpleModalOptions?} Dialog options
    * @return {Observable<T2>} - returns Observable to get dialog result
    */
    public addModal<T1, T2>(component:Type<SimpleModalComponent<T1, T2>>, data?:T1, options: SimpleModalOptions): Observable<T2> => {}
    
    /**
     * Remove a dialog externally 
     * @param [SimpleModalComponent} component
     */
    public removeModal(component: SimpleModalComponent<any, any>): void;
    
    /**
     * Removes all open dialogs in one go
     */
    public removeAll(): void {

}
```
