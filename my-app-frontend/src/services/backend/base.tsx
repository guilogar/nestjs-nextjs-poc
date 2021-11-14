import axios from 'axios';
import { AxiosRequestHeaders } from 'axios';
import { getSessionId, isSessionId } from './local-storage-utils';

export const getApi = (): any => {
  const headers: AxiosRequestHeaders = !isSessionId()
    ? {}
    : {
        authorization: `Bearer ${getSessionId()}`,
      };
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/v1`,
    headers: headers,
  });
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};
