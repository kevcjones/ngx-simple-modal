export interface SimpleModalOptions {
  closeOnEscape?: boolean;
  closeOnClickOutside?: string | boolean;
  bodyClass?: string;
  wrapperClass?: string;
  animationDuration?: number;
}

export const defaultModalOptions: SimpleModalOptions = {
  closeOnEscape: false,
  closeOnClickOutside: 'modal-content',
  bodyClass: 'modal-open',
  wrapperClass: 'in',
  animationDuration: 300
};
