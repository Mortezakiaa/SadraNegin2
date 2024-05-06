import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import {CashSearch} from "./Search";
import { IItemProps } from "models/Good";
import { codeShobe } from "models/Customer";
import { convertDate } from "models/Order";

export interface ICash {
    orderId: IItemProps | null;
    orderNum: number;
    dateForm: Date;
    // shobe: string;
    sharhForm: string;
    cashType: IItemProps | null;
    numChechFish: string;
    codeBank: IItemProps | null;
    amount: number;
    babat: string;
    sharhLine: string;
    codeMoshtari: IItemProps | null;
    dateCheck: Date;
}

interface ICashResponse {

}

export class Cash extends Model<ICash, ICashResponse> {
    public customerShortCutOpen: boolean = false;
    public orderListShortCutOpen: boolean = false;
    public disabled: boolean = false;

    setCustomerShortCutOpen = (value: boolean) => {
        this.customerShortCutOpen = value;
        this.trigger('change');
    }
    setOrderListShortCutOpen = (value: boolean) => {
        this.orderListShortCutOpen = value;
        this.trigger('change');
    }

    disabledFormHandler = (value: boolean) => {
        this.disabled = value;
        this.trigger('change');
    }

    fillPrintable = (user: ICash) => {
        this.mainStateManager.printable = {
            ...this.mainStateManager.printable,
            date1: convertDate(user.dateForm),
            customerName: user.codeMoshtari!.name,
            paidAmount: user.amount,
        }
    }

    onSubmit = (user: ICash) => {
        this.fillPrintable(user);
        this.apiSyncPost('Insert', {
            ...user,
            orderId: user.orderId ? +user.orderId.code : null as any,
            dateForm: convertDate(user.dateForm) as any,
            dateCheck: user.dateCheck ? convertDate(user.dateCheck) as any : null,
            cashType: +user.cashType!.code as any,
            codeBank: +user.codeBank!.code as any,
            codeMoshtari: user.codeMoshtari!.code as any,
        })
            .then(res => {
                if (res.isSuccess) {
                    this.trigger('success', 'عملیات با موفقیت انجام گردید');
                    this.mainStateManager.Usering.Order.Search.printRow(+user.orderId!.code)
                    this.quit(() => {
                        this.mainStateManager.Usering.Cash = Cash.buildNew(this.mainStateManager);
                        this.mainStateManager.Eventing.trigger('factoryChange');
                    }, '/');
                } else {
                    this.trigger('error', 'خطا در برقراری ارتباط . لطفا دوباره سعی کنید');
                }
            })
    };
    customerCode = codeShobe;

    Search = CashSearch.buildNew(this.mainStateManager);
    static empty(): ICash {
        return {
            orderId: null,
            orderNum: 0,
            dateForm: new Date(),
            // shobe: '',
            sharhForm: '',
            cashType: null,
            numChechFish: '',
            codeBank: null,
            amount: 0,
            babat: '',
            sharhLine: '',
            codeMoshtari: null,
            dateCheck: new Date(),
        };
    }

    static buildNew(mainStateManager: MainStateManager): Cash {
        return new Cash(mainStateManager, Cash.empty, apiAxios('Cash'));
    }

    static buildNewByValues(mainStateManager: MainStateManager, values: () => ICash): Cash {
        return new Cash(mainStateManager, values, apiAxios('Cash'));
    }

    schema = yup.object().shape({
        orderId: yup.object().nullable().notRequired(),
        dateForm: yup.date().required(),
        // shobe: yup.string().required(),
        sharhForm: yup.string().required(),
        cashType: yup.object().required(),
        numChechFish: yup.string().required(),
        codeBank: yup.object().required(),
        amount: yup.number().required(),
        babat: yup.string().required(),
        sharhLine: yup.string().required(),
        codeMoshtari: yup.object().required(),
        dateCheck: yup.date(),
    });

    cashType: IItemProps[] = [
        {
            code: '1',
            name: 'دریافت وجه نقد فروشگاه یافت آباد'
        },
        {
            code: '2',
            name: 'دریافت وجه نقد فروشگاه دلاوران'
        },
        {
            code: '3',
            name: 'دریافت وجه نقد کارخانه'
        },
        {
            code: '6',
            name: 'کارت خوان بانک انصار'
        },
        {
            code: '7',
            name: 'کارت خوان بانک کشاورزی'
        },
        {
            code: '8',
            name: 'کارت خوان بانک پارسیان(کارخانه)'
        },
        {
            code: '9',
            name: 'کارت خوان بانک پاسارگاد'
        },
        {
            code: '10',
            name: '(فروشگاه اینترنتی) بانک پارسیان'
        },
        {
            code: '11',
            name: 'تسویه فاکتور با پرداخت'
        },
        {
            code: '12',
            name: 'دریافت چک'
        },
        {
            code: '13',
            name: 'بانک صادرات (مجید احدی)'
        },
        {
            code: '14',
            name: 'کارت خوان بانک دی'
        },
        {
            code: '15',
            name: 'بانک کوثر'
        },
        {
            code: '16',
            name: 'بانک دی (شعبه ولنجک)'
        },
    ];

    codeBank: IItemProps[] = [
        {
            code: '1',
            name: 'صادرات'
        },
        {
            code: '2',
            name: 'بانک ملت'
        },
        {
            code: '3',
            name: 'سپه'
        },
        {
            code: '4',
            name: 'کشاورزی'
        },
        {
            code: '5',
            name: 'پاسارگاد'
        },
        {
            code: '6',
            name: 'بانک سینا'
        },
        {
            code: '7',
            name: 'اینده'
        },
        {
            code: '8',
            name: 'ملی'
        },
        {
            code: '9',
            name: 'توسعه تعاون'
        },
        {
            code: '10',
            name: 'سرمایه'
        },
        {
            code: '11',
            name: 'بانک دی'
        },
        {
            code: '12',
            name: 'انصار'
        },
        {
            code: '13',
            name: 'تجارت'
        },
        {
            code: '14',
            name: 'بانک کوثر'
        },
        {
            code: '15',
            name: 'بانک گردشگری'
        },
        {
            code: '16',
            name: 'بانک سامان'
        },
        {
            code: '17',
            name: 'بانک مسکن'
        },
        {
            code: '18',
            name: 'بانک کارآفرین'
        },
        {
            code: '19',
            name: 'بانک پارسیان'
        },
        {
            code: '20',
            name: 'بانک شهر'
        },
        {
            code: '21',
            name: 'بانک مهر ایران'
        },
    ]
}
