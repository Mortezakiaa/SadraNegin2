import { Model } from '../Model';
import { apiAxios } from '../apiAxios';
import { MainStateManager} from '../MainStateManager';
import * as yup from 'yup';
import { convertDate } from 'models/Order';





export interface ICashResponse {
    num1: number,
    karbar: number,
    dateForm: string,
    shobe:string,
    sharhForm: string,
    cashTypeCode: number,
    cashTypeName: string,
    numChechFish: string,
    amount: number,
    babat:string,
    sharhLine: string,
    codeMoshtari: string,
    nameMoshtari: string,
    dateCheck: string
}

export interface CashSearchFilter {
    filter: string;
    dateFrom: Date | null;
    dateTo: Date | null;
    itemsPerPage: number;
    currentPage: number;
}

export interface ICashSearch {
}


export class CashSearch extends Model<ICashSearch, ICashResponse[]> {
    
    private emptyFilter: CashSearchFilter = {
        filter: '',
        dateFrom: null,
        dateTo: null,
        itemsPerPage: 20,
        currentPage: 1
    }

    CashList: ICashResponse[] = [];
    setCashList = (list: ICashResponse[]) => {
        this.CashList = list;
        this.trigger('wasLoaded');
    }


    getList = (filter?: CashSearchFilter) => {
        this.trigger('waitLoading');
        this.sync.post('Search', filter ? {
            ...filter,
            dateFrom: filter.dateFrom ? convertDate(filter.dateFrom) : '',
            dateTo: filter.dateTo ? convertDate(filter.dateTo) : ''
        } : this.emptyFilter)
        .then(res => {
            this.setCashList(res.data as any)
        })
        .catch(err => {
            this.trigger('error', err);
        })
    };



    static empty(): CashSearchFilter {
        return {
            filter: '',
            dateFrom: null,
            dateTo: null,
            itemsPerPage: 20,
            currentPage: 1,
        };
    }

    static buildNew(mainStateManager: MainStateManager): CashSearch {
        return new CashSearch(mainStateManager, CashSearch.empty, apiAxios('Cash'));
    }

    onSubmit = (user: ICashSearch) => { };
    schema = yup.object().shape({});
}