import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import { IHeadOfProducts } from "models/HeadOfProductsFactory";

export interface IItemProps {
    code: string;
    name: string;
}

export interface IItemByPictureProps {
    code: string;
    name: string;
    hasChild: boolean;
    picture: string;
    children :IHeadOfProducts[] |null ;
}

export interface IGood {
    CodeKala: string;
    CodeFaktorType: number;
}

interface IGoodResponse {
    fee: number;
}

export class Good extends Model<IGood, IGoodResponse> {
    onSubmit = (user: IGood) => { };

    getFee = async (CodeKala: string, CodeFaktorType: number): Promise<number> => {
        let fee = await this.apiSyncPost('GetFee', { CodeKala, CodeFaktorType })
            .then((res) => {
                return Promise.resolve(res.data.fee);
            })
            .catch((err) => {
                return Promise.reject(0);
            });

        return fee;
    }

    // getFee = (codeKala: string): number => {
    //     let fee: number = Number.NaN;
    //     (async () => {
    //         await this.apiSyncPost('GetFee', { codeKala })
    //             .then((res) => {
    //                 fee = res.data.fee
    //             })
    //             .catch((err) => {
    //                 fee = 0;
    //             })
    //     })()
    //     return fee;
    // }

    // getAll = (): IItemProps[] => {
    //     let items: IItemProps[] = [];
    //     this.axiosInstance.post('GetAll')
    //         .then((res) => {
    //             items = [res.data];
    //         })
    //         .catch((err) => this.trigger('error', err))

    //     return items;
    // }

    static empty(): IGood {
        return {
            CodeKala: '',
            CodeFaktorType: Number.NaN
        };
    }

    static buildNew(mainStateManager: MainStateManager): Good {
        return new Good(mainStateManager, Good.empty, apiAxios('Good'));
    }

    schema = yup.object().shape({});
}
