import { Events } from './Events';
import { User } from './User';
import { IRowDetailsLinesProps } from 'models/Order/Search';

export interface PrintableProps {
  codeFaktorType: number;
  nameFaktorType: string;
  codeAnbar: number;
  num1: number;
  num2: number;
  date1: string;
  date2: string;
  sharh: string;
  tozihat: string;
  amount: number;
  discount: number;
  finalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  customerCode: string;
  customerName: string;
  customerAddress1: string;
  customerTel1: string;
  customerMobile1: string;
  lines: IRowDetailsLinesProps[];
}

const initialPrintable: PrintableProps = {
  codeFaktorType: 0,
  nameFaktorType: '',
  codeAnbar: 0,
  num1: 0,
  num2: 0,
  date1: '',
  date2: '',
  sharh: '',
  tozihat: '',
  amount: 0,
  discount: 0,
  finalAmount: 0,
  paidAmount: 0,
  remainingAmount: 0,
  customerCode: '',
  customerName: '',
  customerAddress1: '',
  customerTel1: '',
  customerMobile1: '',
  lines: []
}

export class MainStateManager {
  public Eventing = new Events();
  public Usering = new User(this);

  public printable: PrintableProps = initialPrintable;
  public resetPrintable = () => {
    this.printable = initialPrintable;
  }

  loadDatas = () => {
    // this.knowUser()
    // .then((user) => {
    //   // TOKEN VALIDATION
    //   // LOGIN USER
    // })
    // setTimeout(() => {
    //   this.Usering.dataLoded = true;
    // }, 500);
  }

  // knowUser = (): Promise<any> => {
  //   const localStorageUser = localStorage.getItem('Dorino');
  //   return new Promise((resolve, reject) => {
  //     if (localStorageUser && typeof localStorageUser === 'string') {
  //       const user = JSON.parse(localStorageUser);
  //       resolve(user);
  //     }
  //     reject();
  //   })
  // }
}