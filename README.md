# NGX Simple Modal [![Build Status](https://travis-ci.org/KevCJones/ngx-simple-modal.svg?branch=master)](https://travis-ci.org/KevCJones/ngx-simple-modal)

* In development - we are moving over from angularx-bootstrap-modal *

It is a library to make usage modal easier in Angular2, has no dependencies, but plays well with bootstrap or other frameworks. 
Create clear and reusable modal components.
It makes managing modals painless and clearer. 
Extend the ModalComponent class and implement any content you want. 

## Installation
```npm
npm install ngx-simple-modal
```
TODO - add demo link

## Quickstart

### Step 0. add CSS

To create a custom modal box, you can start with the following example, wich is going to create a modal with a header, body and footer. The css already provide a transparency overlay, opacity and slide animation.

You can customize it according to your needs.

**html template**

```html
<div class="modal_box">
    <div class="modal_head">
      <!-- Your Title -->
    </div>
    <div class="modal_body">
      <!-- Modal custom content -->
    </div>
    <div class="modal_foot">
      <!-- 
        Footer to add button control
        ex.: <button (click)="close()">Cancel</button>
      -->
    </div>
</div>
```

```css
.modal {
  background-color: rgba(0,0,0,.4);
  bottom: 0;
  height: 100%;
  left: 0;
  overflow: hidden;
  padding: 0 16px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10; /* Adjust according to your needs */
}

.modal.fade {
  transition: opacity 400ms ease-in-out;
  will-change: opacity;
  opacity: 0;
}

.modal.fade.in {
  opacity: 1;
}

.modal_box {
  background-color: #ffffff;
  border-radius: 4px;
  margin: 16px auto;
  max-width: 580px;
  position: relative;
  transition: opacity 400ms ease-in-out;
  width: 100%;
  will-change: opacity;
}

/** 
 * You can use these classes to control modal size.
 * ex.: <div class="modal_box modal_box-size-l">...</div>
 */
.modal_box-size-m {
  max-width: 992px;
}

.modal_box-size-l {
  max-width: 1200px;
}

.modal_foot,
.modal_head {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 56px;
  padding: 0 16px;
}

.modal_head {
  border-bottom: 1px solid #cecece;
}

.modal_body {
  padding: 16px;
}

.modal_foot {
  border-top: 1px solid #cecece;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end
}

.modal_foot button{
  margin: 0 16px 0 0;
}
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
By default, modal placeholder will be added to AppComponent.
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
1) input modal data type (data to initialize component);
2) modal result type;

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
    template: `
      <div class="modal_box">
        <div class="modal_head">
          <h4>{{title || 'Confirm'}}</h4>
        </div>
        <div class="modal_body">
          <p>{{message || 'Are you sure?'}}</p>
        </div>
        <div class="modal_foot">
          <button type="button" class="btn btn-outline-danger" (click)="close()" >Cancel</button>
          <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
        </div>
      </div>
    `
})
export class ConfirmComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    // we set modal result as true on click on confirm button, 
    // then we can get modal result from caller code 
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
        <div class="modal_box">
          <div class="modal_head">
            <h4>Confirm</h4>
          </div>
          <div class="modal_body">
            <p>Are you sure?</p>
          </div>
          <div class="modal_foot">
            <button type="button" class="btn btn-primary" (click)="showConfirm()">Show confirm</button>
          </div>
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
                    //We get modal result
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
            //We can close modal calling disposable.unsubscribe();
            //If modal was not closed manually close it by timeout
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
* @template T1 - input modal data
* @template T2 - modal result
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
    * Closes modal
    */
    public close:Function
}
```

### SimpleModalOptions 
```typescript
interface SimpleModalOptions {
  
  /**
  * Flag to close modal by click on backdrop (outside modal)
  * @type {boolean}
  */
  closeOnClickOutside?: boolean;

   /**
  * Flag to close modal by click on backdrop (outside modal)
  * @type {boolean}
  */
  closeOnEscape: boolean;
  
  /**
  * Class to put in document body while modal is open
  * @type {string}
  */
  bodyClass: string;

  /**
  * Class we add and remove from modal when we add it/ remove it
  * @type {string}
  */
  wrapperClass: string,
  /**
  * Time we wait while adding and removing to let animation play
  * @type {string}
  */
  animationDuration: number;
}
```

### SimpleModalService 
Service to show and hide modals

### Class Overview
```typescript
class SimpleModalService {
    /**
    * Adds modal
    * @param {Type<SimpleModalComponent<T1, T2>} component - modal component
    * @param {T1?} data - Initialization data for component (optional) to add to component instance and can be used in component code or template 
    * @param {SimpleModalOptions?} Dialog options
    * @return {Observable<T2>} - returns Observable to get modal result
    */
    public addModal<T1, T2>(component:Type<SimpleModalComponent<T1, T2>>, data?:T1, options: SimpleModalOptions): Observable<T2> => {}
    
    /**
     * Remove a modal externally 
     * @param [SimpleModalComponent} component
     */
    public removeModal(component: SimpleModalComponent<any, any>): void;
    
    /**
     * Removes all open modals in one go
     */
    public removeAll(): void {

}
```
