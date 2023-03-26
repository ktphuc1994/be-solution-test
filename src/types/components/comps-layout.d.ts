import { Dispatch, SetStateAction } from 'react';
import { InterfaceBaseProps } from '.';

export interface InterfaceSidebar extends InterfaceBaseProps {
  sideOpen: boolean;
  setSideOpen: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceHeader extends InterfaceSidebar {}

export interface InterfaceSidebarContent {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
