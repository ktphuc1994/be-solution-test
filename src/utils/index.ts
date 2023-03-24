import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const axiosErrorHandling = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.message);
  }
  toast.error('Unknown Error. Please try again later');
  console.log(error);
};
