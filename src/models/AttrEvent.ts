import { Callback, ITriggerMessage } from "./Types";

export class AttrEvent<T> {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set = (value: T) => {
    // Object.assign(this.data, value);
    this.data = value;
  };
  setKey = <K extends keyof T>(key: K, value: T[K]) => {
    this.data[key] = value;
  };

  getAll = (): T => {
    return this.data;
  };

  on = (eventName: ITriggerMessage, callBack: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callBack);
    this.events[eventName] = handlers;
  };
  removeOn = (eventName: ITriggerMessage): void => {
    this.events[eventName] = [];
  };

  trigger = (eventName: ITriggerMessage, ...args: any): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback.apply(null, args);
    });
  };

  onControl = (
    eventName: ITriggerMessage,
    propertyName: any,
    callBack: Callback
  ) => {
    this.on((eventName + propertyName) as any, callBack);
  };
  triggerControl = (
    eventName: ITriggerMessage,
    propertyName: any,
    ...args: any
  ) => {
    this.trigger((eventName + propertyName) as any, args);
  };
  removeOnControl = (eventName: ITriggerMessage, propertyName: any) => {
    this.removeOn((eventName + propertyName) as any);
  };
}
