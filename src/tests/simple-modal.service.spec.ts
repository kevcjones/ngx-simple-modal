'use strict';

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

import { Component } from '@angular/core';
import { SimpleModalServiceFactory } from '../simple-modal/simple-modal-service.factory';
import { SimpleModalService, SimpleModalServiceConfig } from '../simple-modal/simple-modal.service';
import { AlertComponent } from './mocks/basic-alert';
import { SimpleModalHolderComponentMock } from './mocks/simple-modal-holder.compoenent.mock';
import { SimpleModalHolderComponent } from '../simple-modal/simple-modal-holder.component';
import { DefaultSimpleModalOptionConfig, defaultSimpleModalOptions } from '../simple-modal/simple-modal-options';


const config: SimpleModalServiceConfig = {
  container: document.body
};

describe('SimpleModalService', () => {
  let modalService: SimpleModalService;
  let createSimpleModalHolderMock;
  let simpleModalHolderComponentMock;

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
        },
        {
          provide: DefaultSimpleModalOptionConfig,
          useValue: defaultSimpleModalOptions
        }
      ]
    });
  });

  beforeEach(inject([SimpleModalService], (simpleModalService: SimpleModalService) => {
    modalService = simpleModalService;

    // mock the createSimpleModalHolder which generates the holder
    simpleModalHolderComponentMock = SimpleModalHolderComponentMock();
    createSimpleModalHolderMock = jest.fn(() => simpleModalHolderComponentMock);
    modalService['createSimpleModalHolder'] = createSimpleModalHolderMock;
  }));


  /**
   * Sanity check - it can be created
   */
  it('should be injected successfully', () => {
    expect(modalService).toBeDefined();
  });

  /**
   * Sanity check - API is as expected
   */
  it('should have a method called addModal', () => {
    expect(typeof modalService.addModal).toBe('function');
  });

  it('should have a method called removeModal', () => {
    expect(typeof modalService.removeModal).toBe('function');
  });

  it('should have a method called removeAll', () => {
    expect(typeof modalService.removeAll).toBe('function');
  });

  it('attempts to generate a "holder" component [only] the first time you add a Modal', () => {
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.addModal(AlertComponent, {title: 'Alert2 title!'});

    expect(createSimpleModalHolderMock.mock.calls.length).toBe(1);
  });

  it('should try to remove modal if at least one was added', () => {
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.removeModal(<any>{});
    expect(simpleModalHolderComponentMock.addModal.mock.calls.length).toBe(1);
    expect(simpleModalHolderComponentMock.removeModal.mock.calls.length).toBe(1);
  });

  it('should not remove one if none was added', () => {
    modalService.removeModal(<any>{});
    expect(simpleModalHolderComponentMock.addModal.mock.calls.length).toBe(0);
    expect(simpleModalHolderComponentMock.removeModal.mock.calls.length).toBe(0);
  });

  it('should not trigger removals when removeAll is called', () => {
    modalService.removeAll();
    expect(simpleModalHolderComponentMock.removeModal.mock.calls.length).toBe(0);
  });


  it('should trigger removals when addModal is called at least once', () => {
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.removeAll();
    expect(simpleModalHolderComponentMock.removeAllModals.mock.calls.length).toBe(1);
  });



});
