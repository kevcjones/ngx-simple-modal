export interface SimpleModalOptions {
  index?: number;
  keyboard?: boolean;
  hideOthers?: boolean;
  autoCloseTimeout?: number;
  closeByClickingOutside?: boolean;
  bodyClass?: string;
  wrapperClass?: string;
  animationDuration?: number;
}

export const defaultModalOptions: SimpleModalOptions = {
  keyboard: false,
  hideOthers: false,
  autoCloseTimeout: -1,
  closeByClickingOutside: false,
  bodyClass: 'modal-open',
  wrapperClass: 'in',
  animationDuration: 300
};
