import { AXIOS_GENERATOR } from '../config/axiosConfig';
import urlConst from '../constants/urlConst';
import { InterfaceLoginInfo, InterfaceUserInfo, InterfaceUser } from '../types/models/user';
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
  },
  getUserList: async (): Promise<InterfaceUser[]> => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).get('/');
    return data;
  },
  createUser: async (userInfo: InterfaceUserInfo) => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).post('/', userInfo);
    return data;
  },
  updateUser: async (updateInfo: InterfaceUser) => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).put('/' + updateInfo.id, updateInfo);
    return data;
  },
  deleteUser: async (id: string) => {
    const { data } = await AXIOS_GENERATOR(urlConst.user).delete('/' + id);
    return data;
  }
};

export default userServ;
