import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';
import { IItemByPictureProps, IItemProps } from "../Good";
import { AxiosResponse } from "axios";




export interface IRepository {
  codeAnbar: IItemProps | null;
  mande: Number | null;
}

interface IRepositoryResponse {

}

export class Repository extends Model<IRepository, IRepositoryResponse> {

  private GoodInstance = apiAxios('Good');
  selectedProduct: IItemByPictureProps | null = null;
  public set setSelectedProduct(value: IItemByPictureProps | null) {
    this.selectedProduct = value;
    if(this.selectedProduct===null || this.selectedProduct?.code===null){
      this.getAll().mande = null
  }
    this.trigger('change');
  }

  public get codeAnbar() {
    return this.get('codeAnbar') ? this.get('codeAnbar')!.code : ''
  }
  public set codeAnbar(value: any) {
    this.setKey('codeAnbar', value);
    if(value===null || value.code===''){
      this.getAll().mande = null
  }
  }
  public get codeKala() {
    return this.selectedProduct ? this.selectedProduct.code : ''
  }
  setSearchProduct = (filter: string, setItem: (items: IItemByPictureProps[]) => void) => {
    this.setLoading(true);
    this.sync.post<any, AxiosResponse<IItemByPictureProps[]>>('Search', null, {
      params: {
        filter
      }
    })
      .then(res => {
        if (res.data) {
          setItem(res.data as any);
        } else {
          setItem([]);
        }
        this.trigger('wasLoaded');
      })
      .catch(err => {
        this.trigger('error', 'خطا');
      })
  }


  goodGetKardex = () => {
    this.sync.post(`GetKardex?anbar=${this.codeAnbar}&CodeKala=${this.codeKala}`, {})
      .then((res) => {
        this.setKey('mande', (res.data as any).mande)
        this.trigger('change')
        this.setLoading(false);
      })
      .catch((err) => {
        this.trigger('error', err);
      })
  }

  public get mande() {
    return this.getAll().mande

  }
  goodGetAll = (code: string, setItems: (items: IItemByPictureProps[]) => void) => {
    this.GoodInstance.post('GetAll', null, {
      params: {
        code
      }
    })
      .then((res) => {
        setItems(res.data as any);
        this.setLoading(false);
      })
      .catch((err) => {
        this.trigger('error', err);
      })
  }
  onSubmit = (data: IRepository) => {
    if (data != null && data.codeAnbar != null && this.selectedProduct?.code != null) {
      this.goodGetKardex()
    }
  }


  static empty(): IRepository {
    return {
      codeAnbar: null,
      mande: null,
    };
  }

  static buildNew(mainStateManager: MainStateManager): Repository {
    return new Repository(mainStateManager, Repository.empty, apiAxios('Good'));
  }

  schema = yup.object().shape({});
}




export const codeAnbar: IItemProps[] = [
  {
    code: '1',
    name: 'انبار مرکزی '
  },
  {
    code: '2',
    name: 'انبار فروشگاه یافت آباد'
  },
  {
    code: '3',
    name: 'انبار فروشگاه دلاوران'
  },
  {
    code: '14',
    name: 'انبار محصول درجه 2'
  },
  {
    code: '17',
    name: 'فروشگاه یافت آباد ACCESSORIES انبار'
  },
  {
    code: '18',
    name: 'فروشگاه دلاوران ACCESSORIES انبار'
  },
  {
    code: '19',
    name: 'انبار مرجوعی'
  },
  {
    code: '22',
    name: 'انبار تیراژه'
  },
];
