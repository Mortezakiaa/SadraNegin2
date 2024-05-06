export type Callback = (...args: any) => void;

export type ITriggerType = (e: ITriggerMessage, ...args: any) => void;

export type ITriggerMessage =
  | 'change'
  | 'waitLoading'
  | 'wasLoaded'
  | 'quit'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'confirm';