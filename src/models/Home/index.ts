import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';


export interface IItemDepotProps {
  type : number,
  color :string,
  num : number,
  name ?: string,

} 

export class HomeFactory extends Model<any, any> {
  
  onSubmit = () => {
  }

  static empty() {
  }

  static buildNew(mainStateManager: MainStateManager): HomeFactory {
    return new HomeFactory(mainStateManager, HomeFactory.empty, apiAxios('Good'));
  }

  schema=yup.object().shape({});
}


