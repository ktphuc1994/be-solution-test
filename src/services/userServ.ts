import { InterfaceLoginInfo } from '../types/models/user';
import localServ from './localServ';

const userServ = {
  login: (loginInfo: InterfaceLoginInfo) => {
    const data = new Promise<string>((resolve) => {
      resolve(JSON.stringify(loginInfo));
    });
    return data;
  },
  getUserInfo: async () => {
    const data = new Promise<InterfaceLoginInfo>((resolve, reject) => {
      const token = localServ.getToken();
      if (token) {
        resolve(JSON.parse(token));
      }
      reject('Unauthorized. Please login to continue');
    });
    return data;
  }
};

export default userServ;
