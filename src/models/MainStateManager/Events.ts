type Callback = (...args: any) => void;

export type EventType =
  | 'change'
  | 'loadedData'
  | 'redirectToLogin'
  | 'factoryChange'
  ;

export interface IEvents {
  eventName: string;
  callback: Callback[];
}

export class Events {
  events: IEvents[] = [];

  on = (eventName: EventType, callBack: Callback): void => {
    const handlers = this.events.find(
      (i) => i.eventName === eventName
    );
    if (handlers) {
      handlers.callback.push(callBack);
    } else {
      const newHandler: IEvents = {
        eventName: eventName,
        callback: [],
      };
      newHandler.callback.push(callBack);
      this.events.push(newHandler);
    }
  };

  remove = (eventName: EventType): void => {
    this.events = this.events.filter(
      (i) => !(i.eventName === eventName)
    );
  };

  trigger = (eventName: EventType, ...args: any): void => {
    const handlers = this.events.filter((i) => i.eventName === eventName);

    if (handlers && handlers.length > 0) {
      handlers.forEach((handler) => {
        if (handler && handler.callback && handler.callback.length > 0) {
          handler.callback.forEach((callback) => {
            callback.apply(null, args);
          });
        }
      });
    }
  };
}
