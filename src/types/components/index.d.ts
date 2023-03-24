import { ReactNode } from 'react';

export interface InterfaceBaseProps {
  className?: string;
  children?: ReactNode;
}

export interface InterfaceComfirmModalComponent extends InterfaceBaseProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title?: string;
  confirmContent: ReactNode;
}
