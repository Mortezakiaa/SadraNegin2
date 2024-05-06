import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from "yup";
import { IItemByPictureProps, IItemProps } from "../Good";
import { IEditOrderLine } from "containers/orderTable/edit";
import moment, { Moment } from "moment";
import { OrderSearch } from "./Search";
import { Cash } from "models/Cash";
import { UnpackNestedValue } from "react-hook-form";
import { AxiosResponse } from "axios";
import { HomeFactory } from "models/Home";

export interface IInsertOrder {
  codeKala: string;
  tozihat: string;
  picture: string;
  count: number;
  fee: number;
  amount: number;
  discountPercent: number;
  discount: number;
  finalAmount: number;
}

export interface IOrderLine {
  name: string;
  code: string;
  count: number;
  fee: number;
  discount: number;
  discountAmount: number;
  fianlBeforeDiscount: number;
  final: number;
  tozihat: string;
  img: string;
  edit: boolean;
}

export interface IOrder {
  codeFaktorType: IItemProps | null;
  num2: number | null;
  date2: Date;
  sharh: string | null;
  tozihat: string;
  discount: number;
  customerCode: IItemProps | null;
  typeInsert: IItemProps | null;
  company: IItemProps | null;
  orderLines: IInsertOrder[];
  codeAnbar: IItemProps | null;
  mande: Number | null;
}

interface IOrderResponse {
  id: number;
  num1: number;
}

export class Order extends Model<IOrder, IOrderResponse> {
  public disabled: boolean = false;
  private GoodInstance = apiAxios("Good");

  selectedProduct: IItemByPictureProps | null = null;

  public set setSelectedProduct(value: IItemByPictureProps | null) {
    this.selectedProduct = value;
    if (this.selectedProduct === null || this.selectedProduct?.code === null) {
      this.getAll().mande = null;
    }
    this.trigger("change");
  }

  public get codeKala() {
    return this.selectedProduct ? this.selectedProduct.code : "";
  }

  public get codeAnbar() {
    return this.get("codeAnbar") ? this.get("codeAnbar")!.code : "";
  }

  public set codeAnbar(value: any) {
    this.setKey("codeAnbar", value);
    if (value === null || value.code === "") {
      this.getAll().mande = null;
    }
  }

  goodGetKardex = () => {
    this.GoodInstance.post(
      `GetKardex?anbar=${this.codeAnbar}&CodeKala=${this.codeKala}`,
      {}
    )
      .then((res) => {
        this.setKey("mande", (res.data as any).mande);
        this.trigger("change");
        this.setLoading(false);
      })
      .catch((err) => {
        this.trigger("error", err);
      });
  };

  public get mande() {
    return this.getAll().mande;
  }
  orderLines: IOrderLine[] = [];
  orderDiscount: number = 0;
  numberOfProduct: number | null = null;
  numberOfFee: number | null = null;

  setSearchProduct = (
    filter: string,
    setItem: (items: IItemByPictureProps[]) => void
  ) => {
    this.setLoading(true);
    this.GoodInstance.post<any, AxiosResponse<IItemByPictureProps[]>>(
      "Search",
      null,
      {
        params: {
          filter,
        },
      }
    )
      .then((res) => {
        if (res.data.length) {
          setItem(res.data);
        } else {
          setItem([]);
        }
        this.trigger("wasLoaded");
      })
      .catch((err) => {
        this.trigger("error", "خطا");
      });
  };

  Search = OrderSearch.buildNew(this.mainStateManager);

  public customerShortCutOpen: boolean = false;
  public discountOrderTableModal: boolean = false;

  setCustomerShortCutOpen = (value: boolean) => {
    this.customerShortCutOpen = value;
    if (!value) {
      this.disabled = false;
    }
    this.trigger("change");
  };

  setDiscountOrderTableModal = (value: boolean) => {
    this.discountOrderTableModal = value;
    this.trigger("change");
  };

  set setNumberOfProduct(value: number | null) {
    this.numberOfProduct = value;
    this.trigger("change");
  }
  set setNumberOfFee(value: number | null) {
    this.numberOfFee = value;
    this.trigger("change");
  }

  disabledFormHandler = (value: boolean) => {
    this.disabled = value;
    this.trigger("change");
  };

  setDrderDiscount = (value: number) => {
    this.orderDiscount = value;
    this.discountOrderTableModal = false;
    this.trigger("change");
  };

  editMode = (code: number) => {
    const newList = [...this.orderLines];
    newList.forEach((i) => (i.edit = false));

    const current = newList[code];
    current.edit = true;
    this.orderLines = newList;
    this.trigger("change");
  };

  disableEditMode = () => {
    const newList = [...this.orderLines];
    newList.forEach((i) => (i.edit = false));
    this.orderLines = newList;
    this.trigger("change");
  };

  setNewOrderValue = (index: number, newValue: IEditOrderLine) => {
    this.loading = true;
    const current = this.orderLines[index];
    current.tozihat = newValue.tozihat;
    current.count = newValue.count;
    current.fee = newValue.fee;
    current.discount = newValue.discount;
    current.fianlBeforeDiscount = newValue.fee * newValue.count;
    current.discountAmount = Math.round(
      (current.fianlBeforeDiscount * current.discount) / 100
    );
    current.final = Math.round(
      current.fianlBeforeDiscount - current.discountAmount
    );

    const newList = [...this.orderLines];
    newList.forEach((i) => (i.edit = false));
    this.orderLines = newList;
    this.trigger("success", "انجام شد");
  };

  removeItemOrderLine = (code: number) => {
    this.trigger(
      "confirm",
      "آیا مایل به حذف سفارش میباشید",
      "در صورت حذف رکورد حذف شده قابلیت بازگردانی ندارد",
      () => {
        const current = this.orderLines[code];
        const newList = [...this.orderLines.filter((i) => i !== current)];
        this.orderLines = newList;
        this.trigger("success", "حذف انجام شد");
      },
      () => {}
    );
  };

  updateOrder = (current: IOrderLine) => {
    if (this.numberOfProduct) {
      current.count += this.numberOfProduct;
      current.final = current.fee * current.count;

      this.numberOfProduct = null;
      this.selectedProduct = null;
      this.trigger("success", "انجام شد");
    } else {
      this.trigger("info", "فیلد های مربوطه را کامل کنید");
    }
  };

  addToOrderLines = (watch: UnpackNestedValue<IOrder>) => {
    this.trigger("waitLoading");
    const { codeFaktorType } = watch;
    if (
      this.selectedProduct &&
      this.numberOfProduct &&
      codeFaktorType !== null
    ) {
      const current = this.orderLines.find(
        (i) => i.code === this.selectedProduct!.code
      );
      if (current) {
        this.updateOrder(current);
      } else {
        this.pushOrder(1);
      }
    } else {
      this.trigger("info", "فیلد های مربوطه را کامل کنید");
    }
  };

  pushOrder = (CodeFaktorType: number) => {
    if (
      this.selectedProduct &&
      this.numberOfProduct !== null &&
      this.numberOfProduct > 0 &&
      this.numberOfFee !== null &&
      this.numberOfFee > 0
    ) {
      const count: number = this.numberOfProduct;
      const fee: number = this.numberOfFee;
      const product: IItemByPictureProps = this.selectedProduct;
      const data = 0;
      this.orderLines.push({
        name: product.name,
        tozihat: "",
        code: product.code,
        discount: 0,
        discountAmount: 0,
        count,
        fee,
        fianlBeforeDiscount: data * count,
        final: fee * count,
        img: product.picture,
        edit: false,
      });

      this.numberOfProduct = null;
      this.selectedProduct = null;
      this.trigger("success", "اضافه گردید");
    }
  };

  pushOrderTest = (CodeFaktorType: number) => {
    if (
      this.selectedProduct &&
      this.numberOfProduct !== null &&
      this.numberOfProduct > 0
    ) {
      const count: number = this.numberOfProduct;
      const product: IItemByPictureProps = this.selectedProduct;

      this.orderLines.push({
        name: product.name,
        tozihat: "",
        code: product.code,
        discount: 0,
        discountAmount: 0,
        count,
        fee: 0,
        fianlBeforeDiscount: 0,
        final: 0,
        img: product.picture,
        edit: false,
      });

      this.numberOfProduct = null;
      this.selectedProduct = null;
      this.trigger("success", "اضافه گردید");
    }
  };

  convertObject = (value: IOrderLine): IInsertOrder => {
    return {
      codeKala: value.code,
      tozihat: value.tozihat,
      picture: value.img,
      count: value.count,
      fee: value.fee,
      amount: value.fianlBeforeDiscount,
      discount: value.discountAmount,
      discountPercent: value.discount,
      finalAmount: value.final,
    };
  };

  newCash = (
    orderId: IItemProps,
    amount: number,
    customerCode: IItemProps,
    sharh: string,
    sharhLine: string,
    babat: string,
    orderNum: number
  ) => {
    const newValues = Cash.empty();
    newValues.orderId = orderId;
    // newValues.amount = amount;
    newValues.codeMoshtari = customerCode;
    newValues.sharhForm = sharh;
    newValues.sharhLine = sharhLine;
    newValues.babat = babat;
    newValues.orderNum = orderNum;
    this.mainStateManager.Usering.Cash = Cash.buildNewByValues(
      this.mainStateManager,
      () => newValues
    );
    this.mainStateManager.Eventing.trigger("factoryChange");
  };

  newHome = () => {
    this.mainStateManager.Usering.Home = HomeFactory.buildNew(
      this.mainStateManager
    );
    this.mainStateManager.Eventing.trigger("factoryChange");
  };
  insertOrder = (user: IOrder, value: IOrderLine[]) => {
    const newList: IInsertOrder[] = [
      ...value.map((i) => this.convertObject(i)),
    ];
    const newInsert: IOrder = {
      ...user,
      customerCode: user.customerCode!.code as any,
      typeInsert: user.customerCode!.code as any,
      company: user.customerCode!.code as any,
      codeFaktorType: +1 as any,
      codeAnbar: 1 as any,
      sharh: "title",
      date2: convertDate(user.date2) as any,
      orderLines: newList,
      discount: this.orderDiscount,
    };

    // const amount = value.map(i => i.final).reduce((a, b) => a + b);
    // const discount = Math.round(amount * this.orderDiscount / 100);
    // const finalAmount = Math.round(amount - discount);

    this.apiSyncPost("Insert", newInsert).then((res) => {
      if (res.isSuccess) {
        this.quit(() => {
          this.quit(() => {
            this.trigger("success", "عملیات با موفقیت انجام گردید");
          });
        }, "/");
        setTimeout(() => {
          this.orderLines = [];
          this.orderDiscount = 0;
          this.selectedProduct = null;
          this.numberOfProduct = null;
          user.num2 = null;
          user.tozihat = "";
          this.trigger("change");
        }, 2000);
      } else {
        this.trigger("error", "خطا در برقراری ارتباط . لطفا دوباره سعی کنید");
      }
    });
  };

  goodGetAll = (
    code: string,
    setItems: (items: IItemByPictureProps[]) => void
  ) => {
    this.GoodInstance.post("GetAll", null, {
      params: {
        code,
      },
    })
      .then((res) => {
        setItems(res.data);
        this.setLoading(false);
      })
      .catch((err) => {
        this.trigger("error", err);
      });
  };

  // fillPrintable = (user: IOrder) => {
  //   this.mainStateManager.printable = {
  //     ...this.mainStateManager.printable,
  //     codeAnbar: +user.codeAnbar!.code,
  //     codeFaktorType: +user.codeFaktorType!.code,
  //     nameFaktorType: user.codeFaktorType!.name,
  //     customerCode: user.customerCode!.code,
  //     date2: convertDate(user.date2),
  //     discount: user.discount,
  //     num2: user.num2,
  //     sharh: user.sharh,
  //     tozihat: user.tozihat,
  //     amount: this.orderLines.map(i => i.final).reduce((a, b) => a + b),
  //     lines: this.orderLines.map(item => {
  //       return {
  //         codeKala: item.code,
  //         tozihat: item.tozihat,
  //         picture: item.img,
  //         nameKala: item.name,
  //         count: item.count,
  //         amount: item.fianlBeforeDiscount,
  //         discount: item.discountAmount,
  //         discountPercent: item.discount,
  //         fee: item.fee,
  //         finalAmount: item.final
  //       }
  //     })
  //   };
  // }

  onSubmit = (user: IOrder) => {
    if (user.customerCode) {
      this.insertOrder(user, this.orderLines);
    } else {
      this.trigger("warning", "فیلد های مربوطه را کامل کنید");
    }
  };

  static empty(): IOrder {
    return {
      codeFaktorType: null,
      codeAnbar: null,
      num2: 0,
      date2: new Date(),
      sharh: null,
      tozihat: "",
      discount: 0,
      customerCode: null,
      typeInsert: null,
      company: null,
      orderLines: [],
      mande: null,
    };
  }

  static buildNew(mainStateManager: MainStateManager): Order {
    return new Order(mainStateManager, Order.empty, apiAxios("Order"));
  }

  schema = yup.object().shape({
    num2: yup.number(),
    date2: yup.date().required(),
    tozihat: yup.string(),
    customerCode: yup.object().required(),
  });
}

export const momentToDate = (date: Moment | null): Date | null => {
  if (date) {
    return date.toDate();
  }
  return null;
};

export const convertDate = (date: Date): string => {
  const newDate = moment(date.toLocaleDateString("fa")).toISOString();
  return `${newDate.slice(0, 4)}/${newDate.slice(5, 7)}/${
    +newDate.slice(8, 10) + 1
  }`;
};

export const codeAnbar: IItemProps[] = [
  {
    code: "1",
    name: "انبار مرکزی",
  },
  {
    code: "2",
    name: "انبار فروشگاه یافت آباد",
  },
  {
    code: "3",
    name: "انبار فروشگاه دلاوران",
  },
  {
    code: "14",
    name: "انبار محصول درجه 2",
  },
  {
    code: "17",
    name: "فروشگاه یافت آباد ACCESSORIES انبار",
  },
  {
    code: "18",
    name: "فروشگاه دلاوران ACCESSORIES انبار",
  },
  {
    code: "19",
    name: "انبار مرجوعی",
  },
  {
    code: "22",
    name: "انبار تیراژه",
  },
];
