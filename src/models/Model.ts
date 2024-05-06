import { AttrEvent } from "./AttrEvent";
import { ApiSync } from "./ApiSync";
import { AxiosInstance } from "axios";
import { MainStateManager } from "./MainStateManager";
import { ObjectSchema } from "yup";
import {
  DeepMap,
  FieldError,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { Callback, ITriggerMessage } from "./Types";

export interface IResponse<D> {
  messageRoot: string | null;
  isSuccess: boolean;
  data: D;
}

export abstract class Model<IClass extends FieldValues, IClassResponse> {
  abstract onSubmit: (values: IClass) => void;
  abstract schema: ObjectSchema<object | undefined, object>;
  public loading: boolean = false;

  public mainStateManager: MainStateManager;
  public empty: () => IClass;
  public axiosInstance: AxiosInstance;
  private atrrEvent: AttrEvent<IClass>;
  public sync: ApiSync 

  
  public on: (eventName: ITriggerMessage, callBack: Callback) => void;
  public removeOn: (eventName: ITriggerMessage) => void;
  public trigger: (eventName: ITriggerMessage, ...args: any) => void;
  public onControl: (
    eventName: ITriggerMessage,
    propertyName: any,
    callBack: Callback
  ) => void;
  public removeOnControl: (
    eventName: ITriggerMessage,
    propertyName: any
  ) => void;
  public triggerControl: (
    eventName: ITriggerMessage,
    propertyName: any,
    ...args: any
  ) => void;
  public get: <K extends keyof IClass>(key: K) => IClass[K];
  public getAll: () => any;
  public set: (value: IClass) => void;
  public setKey: <K extends keyof IClass>(key: K, value: IClass[K]) => void;
  constructor(
    mainStateManager: MainStateManager,
    empty: () => IClass,
    axiosInstance: AxiosInstance
  ) {
    this.empty = empty;
    this.mainStateManager = mainStateManager;
    this.axiosInstance = axiosInstance;
    this.atrrEvent = new AttrEvent(this.empty());

    this.on = this.atrrEvent.on;
    this.removeOn = this.atrrEvent.removeOn;
    this.trigger = this.atrrEvent.trigger;

    this.onControl = this.atrrEvent.onControl;
    this.removeOnControl = this.atrrEvent.removeOnControl;
    this.triggerControl = this.atrrEvent.triggerControl;

    this.get = this.atrrEvent.get;
    this.getAll = this.atrrEvent.getAll;
    this.set = this.atrrEvent.set;
    this.setKey = this.atrrEvent.setKey;

    this.sync = new ApiSync(
      this.axiosInstance,
      this.mainStateManager
    );
  }

 

  onInvalid = <M extends Model<IClass, IClassResponse>>(
    error: DeepMap<M, FieldError>
  ) => {
    console.error(error);
    if (typeof error === "object") {
      for (const item in error) {
        this.trigger("info", `صحیح نمی باشد ${item.toString()} ساختار فیلد`);
      }
    }
    // this.trigger('info', error);
  };
 
  onValid = (values: SubmitHandler<IClass>) => {
    this.loading = true;
    this.onSubmit(values as any);
  };

  quit = (final: () => void, path?: string) => {
    final();
    setTimeout(() => {
      this.trigger("quit", path);
    }, 1000);
  };

  setLoading = (value: boolean) => {
    this.loading = value;
    this.trigger("change");
  };

  apiSyncPost = <D extends IClass, R extends IResponse<IClassResponse>>(
    path: string,
    data: D,
    searchParameter?: D
  ): Promise<R> => {
    return new Promise((resolve, reject) => {
      this.sync
        .post<D, R>(path, data, searchParameter)
        .then((res) => {
          if (res.data.isSuccess) {
            resolve(res.data);
          } else {
            if (
              res.data.messageRoot &&
              typeof res.data.messageRoot === "string"
            ) {
              this.trigger("error", res.data.messageRoot);
            } else {
              reject(res.data);
            }
          }
        })
        .catch((err) => {
          if (typeof err === "string") {
            this.trigger("warning", err);
          } else {
            this.trigger(
              "warning",
              "خطا در برقراری ارتباط با سرور . لطفا با بخش پشتیبانی تماس گیرید ."
            );
          }
        });
    });
  };

  apiSyncGet = <D extends IClass, R extends IResponse<IClassResponse>>(
    path: string,
    data?: D
  ): Promise<R> => {
    return new Promise((resolve, reject) => {
      this.sync
        .get<D, R>(path, data)
        .then((res) => {
          if (res.data.isSuccess) {
            resolve(res.data);
          } else {
            if (
              res.data.messageRoot &&
              typeof res.data.messageRoot === "string"
            ) {
              this.trigger("error", res.data.messageRoot);
            } else {
              reject(res.data);
            }
          }
        })
        .catch((err) => {
          if (typeof err === "string") {
            this.trigger("warning", err);
          } else {
            this.trigger("warning", "خطا در برقراری ارتباط با سرور");
          }
        });
    });
  };
}
