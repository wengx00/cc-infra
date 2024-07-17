import axios from 'axios';

const config = {
  token: '',
  openApi: '',
};

export function setConfig(v: typeof config) {
  Object.entries(v).forEach(([key, value]) => {
    config[key as keyof typeof config] = value;
  });
}

export function invoke<T = any>(action: string, data: Record<string, any>) {
  const { openApi, token } = config;
  if (!openApi || !token) {
    throw new Error('Third-party error: Coding config not set');
  }
  return axios
    .request({
      method: 'post',
      url: `${openApi}`,
      data,
      params: {
        action,
      },
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      const { Response } = res.data;
      if (Response.Error) {
        throw new Error(Response.Error.Message);
      }
      return (Response.Data || Response) as T;
    });
}

export default {
  setConfig,
  invoke,
};
