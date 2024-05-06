import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import moment, { Moment } from "moment";


export interface IItemDepotProps {
  type : number,
  color :string,
  num : number,
  name ?: string,

} 

export class Depot extends Model<any, any> {
  
  onSubmit = () => {
  }

  static empty() {
  }

  static buildNew(mainStateManager: MainStateManager): Depot {
    return new Depot(mainStateManager, Depot.empty, apiAxios('Good'));
  }

  schema=yup.object().shape({});
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


