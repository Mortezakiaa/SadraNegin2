import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';

export interface ILogin {
  code: number | null;
  password: string;
  // rememberMe: boolean;
}

interface ILoginResponse {
  codeKarbar: number;
  nameKarbar: string;
  accessToken: string;
}

export class Login extends Model<ILogin, ILoginResponse> {
  onSubmit = (user: ILogin) => {
    this.apiSyncPost('Login', user)
      .then((res) => {
        this.loading = false;
        this.mainStateManager.Usering.signIn({
          accessToken: res.data.accessToken,
          userCode: res.data.codeKarbar,
          userName: res.data.nameKarbar
        }, false);
      })
  }

  static empty(): ILogin {
    return {
      code: null,
      password: '',
      // rememberMe: false
    };
  }

  static buildNew(mainStateManager: MainStateManager): Login {
    return new Login(mainStateManager, Login.empty, apiAxios('Login'));
  }

  schema = yup.object().shape<ILogin>({
    code: yup.number().required(),
    password: yup.string().required()
  });
}
