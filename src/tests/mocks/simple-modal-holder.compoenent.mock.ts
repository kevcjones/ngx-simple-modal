import { Observable } from "rxjs";

export const SimpleModalHolderComponentMock = () => ({
    addModal: jest.fn(),
    removeModal: jest.fn(),
    removeAllModals: jest.fn()
  });
