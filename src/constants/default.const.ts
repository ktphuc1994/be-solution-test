import { InterfaceAgeRange, InterfaceFilterUser, InterfaceUser } from '../types/models/user';

export const defaultFilterUser: InterfaceFilterUser = {
  id: '',
  fullName: '',
  age: ''
};

export const defaultUser: InterfaceUser = {
  id: '',
  fullName: '',
  age: 0
};

export const ageRange: InterfaceAgeRange = {
  range1: { min: 0, max: 10 },
  range2: { min: 11, max: 20 },
  range3: { min: 21, max: 40 },
  range4: { min: 41, max: 60 },
  range5: { min: 61, max: 80 },
  range6: { min: 81, max: 100 },
  range7: { min: 101, max: Infinity }
};

export const validateRegEx = {
  email: {
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Please use a valid email address.'
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
  }
};
