import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import { IItemProps } from "../Good";

export interface ICustomer {
    name: string;
    address: string;
    tell: string;
    mobile: string;
}

interface ICustomerResponse {
}

export class Customer extends Model<ICustomer, ICustomerResponse> {
    onSubmit = (user: ICustomer) => {
        this.apiSyncPost('Markaz1Insert', {
            ...user,
            mobile: `0${user.mobile}`
        })
            .then((res) => {
                if (res.isSuccess) {
                    this.trigger('success', 'عملیات با موفقیت انجام گردید');
                    setTimeout(() => {
                        this.mainStateManager.Usering.Customer = Customer.buildNew(this.mainStateManager);
                        this.mainStateManager.Usering.Order.setCustomerShortCutOpen(false);
                    }, 5000)
                } else {
                    this.trigger('error', 'خطا در برقراری ارتباط . لطفا دوباره سعی کنید');
                }
            })
    };

    static empty(): ICustomer {
        return {
            name: '',
            address: '',
            tell: '',
            mobile: ''
        };
    }

    static buildNew(mainStateManager: MainStateManager): Customer {
        return new Customer(mainStateManager, Customer.empty, apiAxios('Customer'));
    }

    schema = yup.object().shape({
        name: yup.string().required(),
        address: yup.string(),
        tell: yup.string(),
        mobile: yup.string().required()
    });
}

export const codeShobe: IItemProps[] = [
    {
        code: '0101',
        name: 'شعبه تیراژه'
    },
    {
        code: '0102',
        name: 'شعبه یافت آباد'
    },
    {
        code: '0103',
        name: 'شعبه دلاوران'
    },
    {
        code: '0104',
        name: 'مشتریان دفتر مرکزی (عاملین فروش)'
    },
    {
        code: '0105',
        name: 'مشتریان سایت (فروش اینترنتی)'
    },
    {
        code: '0106',
        name: 'پروژه ها'
    },
    {
        code: '0301',
        name: 'کارکنان'
    }
];