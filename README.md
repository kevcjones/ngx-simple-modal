# NGX Simple Modal [![Build Status](https://travis-ci.org/KevCJones/ngx-simple-modal.svg?branch=master)](https://travis-ci.org/KevCJones/ngx-simple-modal)

It is a library to makes modals easier in Angular (2+), has no dependencies, but plays well with bootstrap or other frameworks.
- Create clear and reusable modal components.
- It makes managing modals painless and clearer.
- Extend the ModalComponent class and implement any content you want.

## Worked on

- Amgular 9 with new ng-packagr updates supplied by the Angular tooling team themselves :bowtie:
- Angular v8 also compatible with Angular Elements (December 2019)
- Angular v4-7

## Demo

You can see the demo in action here - [https://ngx-simple-modal-demo.stackblitz.io](https://ngx-simple-modal-demo.stackblitz.io)
You can have a play with this demo code here - [https://stackblitz.com/edit/ngx-simple-modal-demo?embed=1&file=styles.css](https://stackblitz.com/edit/ngx-simple-modal-demo?embed=1&file=styles.css)

## Installation
```npm
npm install ngx-simple-modal
```

## Quickstart

### Step 0. assuming you want to use our built in styles

To create a custom modal box, you can start with the following example, wich is going to create a modal with a header, body and footer. The css already provide a transparency overlay, opacity and slide animation.

Inside your angular-cli.json update your styles sections to include our CSS
```
"styles": [
  "styles.css",
  "../node_modules/ngx-simple-modal/styles/simple-modal.css"
],
```

#### But i use SASS/SCSS?

We got you covered, you can `@import '../node_modules/ngx-simple-modal/styles/simple-modal.scss'` into what ever root based scss global style you want. Update the relative path depending on where you want to pull it in.

#### Assumed HTML template if you want our base styles

```html
<div class="modal-content">
    <div class="modal-header">
      <!-- Your Title -->
    </div>
    <div class="modal-body">
      <!-- Modal custom content -->
    </div>
    <div class="modal-footer">
      <!--
        Footer to add button control
        ex.: <button (click)="close()">Cancel</button>
      -->
    </div>
</div>
```


### Step 1. Import the '**SimpleModalModule**' module

app.module.ts:
```typescript
import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { SimpleModalModule } from 'ngx-simple-modal';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SimpleModalModule
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
    SimpleModalModule.forRoot({container:document.body})
  ]
```

If you want a container that is not yet in the DOM during the intial load you can pass a promiseLike function instead to container e.g.

```typescript
imports: [
    ...
    SimpleModalModule.forRoot({container: elementPromisingFn()})
  ]
```

where `elementPromisingFn` is anything you want as long as its resolvement returns a nativeElement node from the DOM.

#### Setting up modal defaults globally

An optional second parameter takes a global object of type SimpleModalOptions (all fields required).. you can spread
these with the defaultSimpleModalOptions if you like.

```typescript
imports: [
    ...
    SimpleModalModule.forRoot({container: 'modal-container'}, {...defaultSimpleModalOptions, ...{
      closeOnEscape: true,
      closeOnClickOutside: true,
      wrapperDefaultClasses: 'o-modal o-modal--fade',
      wrapperClass: 'o-modal--fade-in',
      animationDuration: 300,
      autoFocus: true
    }})

  ]
```

OR, if you need to control behaviour more granularly, you can provide the configuration in modules or locally like so

```typescript
provide:[
  {
    provide: DefaultSimpleModalOptionConfig,
    useValue: {...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true }}
  }
]
```


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
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{title || 'Confirm'}}</h4>
        </div>
        <div class="modal-body">
          <p>{{message || 'Are you sure?'}}</p>
        </div>
        <div class="modal-footer">
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
    import { SimpleModalModule } from 'ngx-simple-modal';
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
        SimpleModalModule
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
        <div class="modal-content">
          <div class="modal-header">
            <h4>Confirm</h4>
          </div>
          <div class="modal-body">
            <p>Are you sure?</p>
          </div>
          <div class="modal-footer">
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

## What if i want to use Bootstrap 3 or 4?

We got you! An example boostrap alert modal component.

```typescript
import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Alert!'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'TADAA-AM!'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="close()">OK</button>
                   </div>
                </div>
             </div>`
})
export class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
}
```

As you can see, the implementation is completely in your control. We're just here to help you create, configure, add, track inputs, and remove.

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
abstract abstract class SimpleModalComponent<T1, T2> implements T1, OnDestroy {
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

    /**
    * OnDestroy handler
    * Sends modal result to observer
    */
    public ngOnDestroy:Function
}
```

### SimpleModalOptions
```typescript
interface SimpleModalOptions {

  /**
  * clicking outside your content will be close the modal.
  * @default false
  * @type {boolean}
  */
  closeOnClickOutside?: boolean;

  /**
  * Flag to close modal by click on backdrop (outside modal)
  * @default false
  * @type {boolean}
  */
  closeOnEscape: boolean;

  /**
  * Class to put in document body while modal is open
  * @default 'modal-open'
  * @type {string}
  */
  bodyClass: string;


  /**
  * Default classes which live in modal wrapper. Change if you need to for your own css requirements
  * @default 'modal fade'
  * @type {string}
  */
  wrapperDefaultClasses: string,

  /**
  * Class we add and remove from modal when we add it/ remove it
  * @default 'in'
  * @type {string}
  */
  wrapperClass: string,
  /**
  * Time we wait while adding and removing to let animation play
  * @type {string}
  * @default 300
  */
  animationDuration: number;

  /**
  * FInds teh first focusable element in the page and applies focus on open  after closing restores focus back to previous
  * @type {boolean}
  * @default false
  */
  autoFocus: number;
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

## Credits

This project was seeded by [https://github.com/ankosoftware/ng2-bootstrap-modal](https://github.com/ankosoftware/ng2-bootstrap-modal) because the author was not responding to pull requests so decided to take what they had started and update and run with it. Along the way we put some of our own opinions on it and added some tests, enough changes that it stopped being a viable PR for the original without serious breaking changes.
