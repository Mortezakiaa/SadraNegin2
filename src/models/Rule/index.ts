import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import { IItemProps } from "models/Good";

export interface IRule {
  codeKarbar: IItemProps | null;
  sefareshat_Delete: IItemProps | null;
}

interface IGetRule {
  codeKarbar: number;
  sefareshat_Delete: number;
}

export interface IUserRuleProps {
  CodeKarbar: number;
  NameKarbar: string;
}

interface IRuleResponse {
}

export class Rule extends Model<IRule, IRuleResponse> {
  UserList: IUserRuleProps[] = [];
  setUserList = (list: IUserRuleProps[]) => {
    this.UserList = list;
    this.trigger('wasLoaded');
  }

  onSubmit = (user: IRule) => {
    this.apiSyncPost('InsertRole', {
      codeKarbar: +user.codeKarbar!.code as any,
      sefareshat_Delete: +user.sefareshat_Delete!.code as any
    })
      .then(res => {
        if (res.isSuccess) {
          this.trigger('success', 'دسترسی کاربر با موفقیت ثبت گردید');
        //   this.quit(() => {
        //     this.mainStateManager.Usering.Rule = Rule.buildNew(this.mainStateManager);
        //     this.mainStateManager.Eventing.trigger('factoryChange');
        // }, '/');
        }
      })
  }

  getRule = async (item: IItemProps | null, setValue: any) => {
    if (item) {
      this.trigger('waitLoading');
      const newItem = await this.sync.post<any, IGetRule>('GetRole', null, {
        karbar: +item.code
      })
      const newValue = userAccessTypes.find(item => +item.code === newItem.data.sefareshat_Delete);
      if (newValue) {
        setValue('sefareshat_Delete', newValue);
      }
      this.trigger('wasLoaded');
    }
  }

  // getList = () => {
  //   this.trigger('waitLoading');
  //   this.apiSyncGet('GetAll')
  //     .then(res => {
  //       this.setUserList(res.data as any);
  //     })
  //     .catch(err => {
  //       this.trigger('error', err);
  //     })
  // };

  static empty(): IRule {
    return {
      codeKarbar: null,
      sefareshat_Delete: null
    };
  }

  static buildNew(mainStateManager: MainStateManager): Rule {
    return new Rule(mainStateManager, Rule.empty, apiAxios('Login'));
  }

  schema = yup.object().shape({
    codeKarbar: yup.object().required(),
    sefareshat_Delete: yup.object().required()
  });
}

export const userAccessTypes: IItemProps[] = [
  { code: '0', name: 'اجازه حذف ندارد' },
  { code: '1', name: 'حذف سفارشات خود' },
  { code: '2', name: 'حذف تمامی سفارشات' }
]