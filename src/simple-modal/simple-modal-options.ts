import { Injectable, InjectionToken } from '@angular/core';

export let DefaultSimpleModalOptionConfig = new InjectionToken<SimpleModalOptions>('default-simple-modal.config');

export interface SimpleModalOptionsOverrides {
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  bodyClass?: string;
  wrapperClass?: string;
  animationDuration?: number;
}

export class SimpleModalOptions implements SimpleModalOptionsOverrides {
  closeOnEscape: boolean;
  closeOnClickOutside: boolean;
  bodyClass: string;
  wrapperClass: string;
  animationDuration: number;
}

export const defaultSimpleModalOptions: SimpleModalOptions = {
  closeOnEscape: false,
  closeOnClickOutside: false,
  bodyClass: 'modal-open',
  wrapperClass: 'in',
  animationDuration: 300
};

