import { IResponse, Model } from "../Model";
import { apiAxios } from "../apiAxios";
import { MainStateManager, PrintableProps } from "../MainStateManager";
import * as yup from "yup";
import { IItemStoreProps } from "./index";

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
}

export type IRowDetailsLinesProps = {
  num1: number;
  date: string;
  sharh_Head: string;
  sharh_Line: string;
  codeMoshtari: string;
  nameMoshtari: string;
  tedad1: string;
  tedad2: string;
  tedad1HavaleShode: number;
};

export interface StoreSearchFilter {
  type: string;
  color: string;
  dahane: string;
  name?: string;
  sortManfi: boolean;
}

export interface IStoreSearch {}

export abstract class StoreSearch extends Model<
  IStoreSearch,
  IItemStoreProps[]
> {
  private printOrderInstance = apiAxios("Good");
  private storeInstance = apiAxios("Good");

  public abstract getList: (filter?: StoreSearchFilter) => void;

  rowDetails: IRowDetailsLinesProps[] | null = null;
  showRowDetails: boolean = false;
  setShowRowDetails = (value: boolean) => {
    this.showRowDetails = value;
    this.trigger("wasLoaded");
  };

  StoreList: IItemStoreProps[] = [];
  setStoreList = (list: IItemStoreProps[]) => {
    this.StoreList = list;
    this.trigger("wasLoaded");
  };

  getListMain = (path: string, filter?: StoreSearchFilter) => {
    console.log(path, filter);

    this.trigger("waitLoading");
    this.sync
      .get(path, filter)
      .then((res) => {
        console.log(res.data);
        
        this.setStoreList(res.data as any);
      })
      .catch((err) => {
        this.trigger("error", err);
      });
  };

  searchInList = (filter: StoreSearchFilter) => {
    this.trigger("waitLoading");
    this.sync
      .get(
        `Search`,
        filter
          ? {
              filter,
            }
          : ""
      )
      .then((res) => {
        console.log(res.data);
        
        console.log("entered");
        console.log("🚀 ~ file: Search.ts ~ line 93 ~ StoreSearch ~ res", res);
        this.setStoreList(res.data as any);
      })
      .catch((err) => {
        this.trigger("error", err);
      });
  };

  getRowDetails = (id: string) => {
    this.trigger("waitLoading");
    this.sync
      .get<any, IRowDetailsLinesProps[]>(`RizGardeshInSefaresh?code=${id}`)
      .then((res) => {
        if (res.status === 200) {
          this.rowDetails = res.data;
          // console.log("🚀 ~ file: Search.ts ~ line 100 ~ StoreSearch ~ rowDetails", this.rowDetails)
          this.setShowRowDetails(true);
        } else {
          this.trigger("warning", "خطا در برقراری ارتباط با سرور");
        }
      })
      .catch((err) => {
        this.trigger("error", err);
      });
  };

  printRow = async (id: number) => {
    this.trigger("waitLoading");
    this.mainStateManager.resetPrintable();
    await this.printOrderInstance
      .get<any, IResponse<PrintableProps>>("Print", {
        params: {
          orderId: id,
        },
      })
      .then((res) => {
        this.mainStateManager.printable = res.data;
      });
  };

  deleteRow = (id: number) => {
    this.trigger("waitLoading");
    this.sync
      .get<any, IResponse<{}>>("Delete", {
        id: id,
      })
      .then((res) => {
        if (res.data.isSuccess) {
          this.getList();
          this.trigger("success", "سفارش مورد نظر با موفقیت حذف گردید");
        } else {
          this.trigger("warning", res.data.messageRoot);
        }
      })
      .catch((err) => {
        this.trigger("error", err);
      });
  };

  static empty(): StoreSearchFilter {
    return {
      type: "",
      dahane: "",
      color: "",
      name: "",
      sortManfi: false,
    };
  }

  // static buildNew(mainStateManager: MainStateManager): StoreSearch {
  //     return new StoreSearch(mainStateManager, StoreSearch.empty, apiAxios('Good'));
  // }

  onSubmit = (user: IStoreSearch) => {};
  schema = yup.object().shape({});
}

export class StoreSearch35 extends StoreSearch {
  getList = (filter?: StoreSearchFilter) => {
    this.getListMain("IndexForAnbar12", filter);
  };

  static buildNew(mainStateManager: MainStateManager): StoreSearch {
    return new StoreSearch35(
      mainStateManager,
      StoreSearch.empty,
      apiAxios("Good")
    );
  }
}

export class StoreSearch7 extends StoreSearch {
  getList = (filter?: StoreSearchFilter) => {
    this.getListMain("IndexForAnbar11", filter);
  };

  static buildNew(mainStateManager: MainStateManager): StoreSearch {
    return new StoreSearch7(
      mainStateManager,
      StoreSearch.empty,
      apiAxios("Good")
    );
  }
}
