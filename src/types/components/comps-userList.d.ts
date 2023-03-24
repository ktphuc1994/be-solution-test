import { Dispatch, SetStateAction } from 'react';
import { InterfaceBaseProps } from '.';
import { InterfaceFilterUser, InterfaceFilterValue } from '../models/user';

export interface InterfaceSearchBarComponent extends InterfaceBaseProps {
  setFilterUser: Dispatch<SetStateAction<InterfaceFilterUser>>;
}

export interface InterfaceUserTableComponents extends InterfaceBaseProps {
  filterValue: InterfaceFilterValue;
}
