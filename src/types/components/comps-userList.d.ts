import { Dispatch, MutableRefObject, SetStateAction } from 'react';

// import types and interfaces
import { InterfaceBaseProps } from '.';
import { InterfaceFilterUser, InterfaceFilterValue, InterfaceUser } from '../models/user';

export interface InterfaceSearchBarComponent extends InterfaceBaseProps {
  setFilterUser: Dispatch<SetStateAction<InterfaceFilterUser>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface InterfaceUserTableComponents extends InterfaceBaseProps {
  filterValue: InterfaceFilterValue;
  selectedUserRef: MutableRefObject<InterfaceUser>;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface InterfaceUserFormComponents extends InterfaceBaseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userInfo: InterfaceUser;
}
