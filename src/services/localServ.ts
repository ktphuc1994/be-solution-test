import localConst from '../constants/localConst';

const localServ = {
  getToken: () => {
    const token = localStorage.getItem(localConst.AUTH_TOKEN);
    if (!token) return null;
    return token;
  },
  setToken: (token: string) => {
    localStorage.setItem(localConst.AUTH_TOKEN, token);
  },
  removeToken: () => {
    localStorage.removeItem(localConst.AUTH_TOKEN);
  }
};

export default localServ;
