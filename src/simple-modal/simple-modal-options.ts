export interface SimpleModalOptions {
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  bodyClass?: string;
  wrapperClass?: string;
  animationDuration?: number;
}

export const defaultModalOptions: SimpleModalOptions = {
  closeOnEscape: false,
  closeOnClickOutside: false,
  bodyClass: 'modal-open',
  wrapperClass: 'in',
  animationDuration: 300
};
