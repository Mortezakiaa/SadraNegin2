import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import moment, { Moment } from "moment";


export interface IItemStoreProps {
  code: string,
  name: string,
  noe: string,
  dahane: string,
  color: string,
  tedadSefaresh: number,
  kardexAnbar12_:number
  kardexAnbar3: number,
  kardexAnbar4: number,
  kardexAnbar7: number,
  kardexAnbar5: number;
  kardexAnbar11:number
  tedadHavaleShode: number;
  mande: number;
}

export class Store extends Model<any, any> {

  counter: number = 0;
  onSubmit = () => {
  }

  static empty() {
  }

  static buildNew(mainStateManager: MainStateManager): Store {
    return new Store(mainStateManager, Store.empty, apiAxios('Good'));
  }

  schema = yup.object().shape({});
}


export const momentToDate = (date: Moment | null): Date | null => {
  if (date) {
    return date.toDate();
  }
  return null;
}

export const convertDate = (date: Date): string => {
  const newDate = moment(date.toLocaleDateString('fa')).toISOString();
  return `${newDate.slice(0, 4)}/${newDate.slice(5, 7)}/${+newDate.slice(8, 10) + 1}`;
}




