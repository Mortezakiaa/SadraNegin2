import { StoreSearch35, StoreSearch7 } from './../Store/Search';
import { MainStateManager } from '.';
import { Customer } from '../Customer';
import { Login } from '../Login';
import { Rule } from '../Rule';
import { Order } from '../Order';
import { Cash } from '../Cash';
import { News } from '../News';
import { Repository } from '../Repository'
import { HeadOfProductsFactory } from '../HeadOfProductsFactory'
import { NotificationFactory } from '../Notification'
import { Store } from '../../models/Store';
import { Depot } from 'models/Depot';
import { OrderSearch } from 'models';
import { HomeFactory } from 'models/Home'


export interface IUser {
  accessToken: string;
  userName: string;
  userCode: number;
}

export class User implements IUser {
  accessToken = '';
  userName = '';
  userCode = 0;
  letter = { id: 0, date: '', sharh: '', tozihat: '', lines: [] };

  constructor(
    public mainStateManager: MainStateManager,
  ) { }
  //@ts-ignore
  public Rule = Rule.buildNew(this.mainStateManager);
  //@ts-ignore
  public Login = Login.buildNew(this.mainStateManager);
  //@ts-ignore
  public Order = Order.buildNew(this.mainStateManager);
  //@ts-ignore
  public OrderList = OrderSearch.buildNew(this.mainStateManager);
  //@ts-ignore
  public Cash = Cash.buildNew(this.mainStateManager);
  //@ts-ignore
  public Customer = Customer.buildNew(this.mainStateManager);
  //@ts-ignore
  public News = News.buildNew(this.mainStateManager);
  //@ts-ignore
  public Repository = Repository.buildNew(this.mainStateManager);
  //@ts-ignore
  public HeadOfProductsFactory = HeadOfProductsFactory.buildNew(this.mainStateManager);
  //@ts-ignore
  public NotificationFactory = NotificationFactory.buildNew(this.mainStateManager);
  //@ts-ignore
  public Home = HomeFactory.buildNew(this.mainStateManager);
  //@ts-ignore
  public Store = Store.buildNew(this.mainStateManager);
  //@ts-ignore
  public StoreSearch7 = StoreSearch7.buildNew(this.mainStateManager);
  //@ts-ignore
  public StoreSearch35 = StoreSearch35.buildNew(this.mainStateManager);
  //@ts-ignore
  public Depot = Depot.buildNew(this.mainStateManager);




  private datasLoaded: boolean = true;
  public get dataLoded(): boolean {
    return this.datasLoaded;
  }
  public set dataLoded(state: boolean) {
    this.datasLoaded = state;
    this.mainStateManager.Eventing.trigger('loadedData');
  }

  public get isAthentication(): boolean {
    return this.accessToken !== '' && this.userName !== '';
  }

  isAdmin = () => this.userCode === 15 || this.userCode === 14;
 
  
  logOut = () => {
    this.accessToken = '';
    this.userName = '';
    this.userCode = 0;
    // localStorage.removeItem('Dorino');
    this.goToLogin();
  }

  signIn = (user: IUser, remember: boolean) => {
    // if (remember) {
    //   const token = JSON.stringify({ token: user.accessToken });
    //   localStorage.setItem('Dorino', token);
    // }
    this.accessToken = user.accessToken;
    this.userName = user.userName;
    this.userCode = user.userCode;
    this.dataLoded = true;
  }

  goToLogin = () => {
    this.mainStateManager.Eventing.trigger('redirectToLogin');
  }

  static empty(): IUser {
    return {
      accessToken: '',
      userCode: Number.NaN,
      userName: '',

    }
  }
}
