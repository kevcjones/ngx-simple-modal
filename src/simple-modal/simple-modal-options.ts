import { InjectionToken } from '@angular/core';

export const DefaultSimpleModalOptionConfig = new InjectionToken<SimpleModalOptions>('default-simple-modal.config');

export interface SimpleModalOptions {
  closeOnEscape: boolean;
  closeOnClickOutside: boolean;
  bodyClass: string;
  wrapperDefaultClasses: string;
  wrapperClass: string;
  animationDuration: number;
  autoFocus: boolean;
}

export type SimpleModalOptionsOverrides = Partial<SimpleModalOptions>;

export const defaultSimpleModalOptions: SimpleModalOptions = {
  closeOnEscape: false,
  closeOnClickOutside: false,
  bodyClass: 'modal-open',
  wrapperDefaultClasses: 'modal fade-anim',
  wrapperClass: 'in',
  animationDuration: 300,
  autoFocus: false
};
