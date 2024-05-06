import { IResponse, Model } from '../Model';
import { apiAxios } from '../apiAxios';
import { MainStateManager, PrintableProps } from '../MainStateManager';
import * as yup from 'yup';
import { afterSuccessPrint } from 'models/Cash/Print';

export interface IOrderSearchResponse {
    id: number;
    codeFaktorType: string;
    nameFaktorType: string;
    codeAnbar: string;
    nameAnbar: string;
    num1: number;
    num2: number;
    date: string;
    date2: string;
    sharh: string;
    tozihat: string;
    customerCode: string;
    customerName: string;
    eTedad?: number;
}

export interface IResult {
    orderId: number,
    codeAnbar: string,
    codeHavale: string
    lines:
    {
        orderLineId: number | undefined,
        tedad1: number | null
    }[]

}

interface IItem {
    id: number,
    codeKala: string,
    tozihat: string,
    nameKala: string,
    count: number,
    fee: number,
    amount: number,
    discountPercent: number,
    discount: number,
    finalAmount: number,
    eTedad: number,
    tedadHavaleShode: number
}
export type IRowDetailsLinesProps = IItem & {
    nameKala: string;
}
type IRowDetailsProps = IOrderSearchResponse & {
    lines: IRowDetailsLinesProps[];
} | null;

export interface IOrderSearchFilter {
    itemsPerPage: number;
    currentPage: number;
    name: string;
    dateFrom: string;
    dateTo: string;
    nameMoshtari: string;
}

export interface IOrderSearch {
}

export class OrderSearch extends Model<IOrderSearch, IOrderSearchResponse[]> {
    orderId: number = 0;
    tedad1: number | null = null;
    codeAnbar: number | undefined = undefined;
    codeHavaleType: number | undefined = undefined;
    orderLineId: number | undefined = 0;
    values: IResult = { orderId: 0, codeAnbar: '', codeHavale: '', lines: [] }
    private printOrderInstance = apiAxios('PrintOrder');
    private OrderInstance = apiAxios('Order');
    private emptyFilter: IOrderSearchFilter = {
        itemsPerPage: 20,
        currentPage: 1,
        name: '',
        dateFrom: '',
        dateTo: '',
        nameMoshtari: ''
    }
    showRowDetails: boolean = false;

    public get admin() {
        return this.mainStateManager.Usering.isAdmin();
    }

    public setFilter = (filter: IOrderSearchFilter) => {
        this.filter = filter;
        this.getList();
    };
    public filter = this.emptyFilter;


    setShowRowDetails = (value: boolean) => {
        this.showRowDetails = value;
        this.trigger('wasLoaded');
    }
    setCodeAnbar = (value: number | undefined) => {
        this.codeAnbar = value;
        this.trigger('change')
    }
    setCodeHavaleType = (value: number | undefined) => {
        this.codeHavaleType = value;
        this.trigger('change')
    }

    // rowDetails: IRowDetailsProps = null;
    #rowDetails: IRowDetailsProps = null;
    rowDetailsLines?: IRowDetailsLinesProps[];
    public get rowDetails(): IRowDetailsProps {
        return this.#rowDetails;
    }
    public set rowDetails(value: IRowDetailsProps) {
        this.#rowDetails = value;
        this.rowDetailsLines = value?.lines;
    }

    OrderList: IOrderSearchResponse[] = [];
    setOrderList = (list: IOrderSearchResponse[]) => {
        this.OrderList = list;
        this.trigger('wasLoaded');
    }

    getList = () => {
        this.trigger('waitLoading');
        this.sync.post('Search', this.filter)
            .then(res => {
                this.setOrderList(res.data as any);
            })
            .catch(err => {
                this.trigger('error', err);
            })
    };

    getRowDetails = (id: number) => {
        this.trigger('waitLoading');
        this.sync.get<any, IRowDetailsProps>('GetById', {
            id: id
        })
            .then(res => {
                if (res.status === 200) {
                    this.rowDetails = res.data;
                    this.setShowRowDetails(true);
                } else {
                    this.trigger('warning', 'خطا در برقراری ارتباط با سرور');
                }
            })
            .catch(err => {
                this.trigger('error', err);
            })
    }



    updateList = () => {
        const lines = this.rowDetailsLines?.map(i => {
            if (i.eTedad !== 0 && i.eTedad !== undefined) {
                return { orderLineId: i.id, tedad1: i.eTedad }
            }
            return null;
        });
        let filtered = lines?.filter(function (x) {
            return x !== undefined;
        });


        const result = { orderId: this.orderId, codeAnbar: this.codeAnbar, codeHavle: this.codeHavaleType, lines: filtered }
        console.log("🚀 ~ file: Search.ts ~ line 176 ~ OrderSearch ~ result", result)
        if (result.lines?.length !== 0) {
            this.OrderInstance.post(`Havale`, result)
                .then((res) => {
                    const message = Object.values(res.data)[1]
                    if (message === true && this.codeAnbar !== undefined && this.codeHavaleType) {
                        this.trigger('success', 'حواله با موفقیت ثبت شد')
                    } else {
                        this.trigger('error', ' تعداد وارد شده غیر مجاز است');
                    }
                })
                .catch((error) => {
                    this.trigger('error', error);
                })

        } else {
            this.trigger('error');
        }





    }
    updateHavaleShode = () => {
        const lines = this.rowDetailsLines?.map(i => { return { orderLineId: i.id, tedad1: i.tedadHavaleShode } });
        const result = { orderId: this.orderId, lines }
        this.OrderInstance.post(`Havale`, result)
    }


    printRow = async (id: number) => {
        this.trigger('waitLoading');
        this.mainStateManager.resetPrintable();
        await this.printOrderInstance.get<any, IResponse<PrintableProps>>('Print', {
            params: {
                orderId: id
            }
        })
            .then(res => {
                this.mainStateManager.printable = res.data;
            })
        afterSuccessPrint(this.mainStateManager);
        this.trigger('wasLoaded');
    }

    deleteRow = (id: number) => {
        this.trigger('waitLoading');
        this.sync.get<any, IResponse<{}>>('Delete', {
            id: id
        })
            .then(res => {
                if (res.data.isSuccess) {
                    this.getList();
                    this.trigger('success', 'سفارش مورد نظر با موفقیت حذف گردید');
                } else {
                    this.trigger('warning', res.data.messageRoot);
                }
            })
            .catch(err => {
                this.trigger('error', err);
            })
    }


    static empty(): IOrderSearchFilter {
        return {
            itemsPerPage: 20,
            currentPage: 1,
            name: '',
            dateFrom: '',
            dateTo: '',
            nameMoshtari: '',
        };
    }

    static buildNew(mainStateManager: MainStateManager): OrderSearch {
        return new OrderSearch(mainStateManager, OrderSearch.empty, apiAxios('Order'));
    }

    onSubmit = (user: IOrderSearch) => {

    };
    schema = yup.object().shape({});
}