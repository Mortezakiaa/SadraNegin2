import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import { INotifItem } from 'containers/NotifViewTable/Details/row'
import * as yup from 'yup';
import { AxiosRequestConfig } from "axios";
import { UtilityFile } from "utilities/fileSaver";





export interface INotifSearch {
}

export interface INotifResponse {
    id: number,
    date: Date | null,
    sharh: string,
    tozihat: string

}
export interface NotifSearchFilter {
    dateFrom: Date | null,
    dateTo: Date | null,
    sharh: string,
    tozihat: string
}
export class NotifSearch extends Model<INotifSearch, INotifResponse> {

    private GoodInstance = apiAxios('Letter');

    NotifList: INotifResponse[] = [];
    setNotifList = (list: INotifResponse[]) => {
        this.NotifList = list;
        this.trigger('change');
    }


    getList = () => {
        this.GoodInstance.post('Search', {})
            .then(res => {
                this.setNotifList(res.data as any)
            })
            .catch(err => {
                this.trigger('error', err);
            })
    };

    rowDetails: INotifItem | null = null;
    showRowDetails: boolean = false;
    setShowRowDetails = (value: boolean) => {
        this.showRowDetails = value;
        this.trigger('wasLoaded');
    }
    getRowDetails = (id: number) => {
        this.trigger('waitLoading');
        this.GoodInstance.post(`GetById?letterId=${id}`)
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

    downLoadFile = (id: number, type :string) => {
   
        this.trigger('waitLoading');
        const header: AxiosRequestConfig = { responseType: 'arraybuffer', headers: { "Content-Type": "application/json", Authorization: `bearer ${window.localStorage["Access_Token"]}` } };
        this.GoodInstance.post(`DownloadFile?letterLineId=${id}`, header)
            .then(res => {
                if (res.status === 200) {
                    switch (type) {
                        case 'pdf':
                          UtilityFile.blobPdf(res.data);
                          break;
                        case 'txt':
                          UtilityFile.blobTxt(res.data);
                          break;
                        case 'xlsx':
                          UtilityFile.blobExcel(res.data);
                          break;}
                } else {
                    this.trigger('warning', 'خطا در برقراری ارتباط با سرور');
                }
            })
            .catch(err => {
                this.trigger('error', err);
            })
    }

    onSubmit = () => {

    }
    static empty(): NotifSearchFilter {
        return {
            dateFrom: null,
            dateTo: null,
            sharh: '',
            tozihat: ''
        };
    }

    static buildNew(mainStateManager: MainStateManager): NotifSearch {
        return new NotifSearch(mainStateManager, NotifSearch.empty, apiAxios('Letter'));
    }

    schema = yup.object().shape({
       
    });

}