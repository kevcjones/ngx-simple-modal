import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

import { Component } from '@angular/core';
import { SimpleModalComponent } from '../simple-modal/simple-modal.component';
import { SimpleModalServiceFactory } from '../simple-modal/simple-modal-service.factory';
import { SimpleModalService, SimpleModalServiceConfig } from '../simple-modal/simple-modal.service';

interface AlertModel {
  title: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">{{title}}</div>`
})
class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  constructor() {
    super();
  }
}

const config: SimpleModalServiceConfig = {
  container: document.body
};

describe('SimpleModalService', () => {

  let modalService: SimpleModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SimpleModalServiceConfig,
          useValue: config
        },
        {
          provide: SimpleModalService,
          useFactory: SimpleModalServiceFactory,
          deps: [ComponentFactoryResolver, ApplicationRef, Injector, SimpleModalServiceConfig]
        }
      ]
    });
  });

  beforeEach(inject([SimpleModalService], (simpleModalService: SimpleModalService) => {
    modalService = simpleModalService;
  }));

  it('should be injected successfully', () => {
    expect(modalService).toBeDefined();
  });

  it('should have a method called addModal', () => {
    expect(typeof modalService.addModal).toBe('function');
  });

  it('create a "holder" component the first time you add a Modal', () => {
    const createSimpleModalHolderMock = jest.fn().mockImplementation(() => ({addModal: () => {}}));
    modalService['createSimpleModalHolder'] = createSimpleModalHolderMock;
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.addModal(AlertComponent, {title: 'Alert2 title!'});
    expect(createSimpleModalHolderMock.mock.calls.length).toBe(1);
  });

  it('should have a method called removeModal', () => {
    expect(typeof modalService.removeModal).toBe('function');
  });

  // it('should not try to remove modal if non added', () => {
  //   const removeSimpleModalHolderMock = jest.fn().mockImplementation(() => Promise.resolve{});
  //   modalService['createSimpleModalHolder'] = createSimpleModalHolderMock;
  //   console.log(typeof modalService);
  //   modalService.addModal(AlertComponent, {title: 'Alert title!'});
  //   modalService.addModal(AlertComponent, {title: 'Alert2 title!'});
  //   expect(createSimpleModalHolderMock.mock.calls.length).toBe(1);
  // });



});
