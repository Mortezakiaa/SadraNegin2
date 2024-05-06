import { apiAxios } from "models/apiAxios";
import { MainStateManager } from "models/MainStateManager";
import { Model } from "models/Model";
import * as yup from "yup";

export interface INews {

}

interface INewsResponse {

}

export class News extends Model<INews, INewsResponse> {
    onSubmit = (values: INews) => {};

    static empty(): INews {
        return {}
    }

    static buildNew(mainStateManager: MainStateManager): News {
        return new News(mainStateManager, News.empty, apiAxios('News'))
    }

    schema = yup.object().shape({

    });
}