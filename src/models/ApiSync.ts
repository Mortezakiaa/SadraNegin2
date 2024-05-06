import { AxiosInstance, AxiosPromise } from 'axios';
import { MainStateManager } from './MainStateManager';

export class ApiSync {
  constructor(public axiosInstance: AxiosInstance, private mainStateManager: MainStateManager) {}

  get headers() {
    if (this.mainStateManager.Usering) {
      return {
        Authorization: `bearer ${this.mainStateManager.Usering.accessToken}`,
      };
    } else {
      return undefined;
    }
  }

  delete = (path: string): AxiosPromise => {
    return this.axiosInstance.delete(path, {
      headers: this.headers
    });
  };

  get = <T, R>(path: string, searchParameter?: T): AxiosPromise<R> => {
    return this.axiosInstance.get(path, {
      params: searchParameter,
      headers: this.headers
    });
  };

  post = <T, R>(path: string, data: T, searchParameter?: T): AxiosPromise<R> => {
    return this.axiosInstance.post(path, data, {
      params: searchParameter,
      headers: this.headers,
    });
  };
}
