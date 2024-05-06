import { MainStateManager } from "../MainStateManager";
import { apiAxios } from "../apiAxios";
import { Model } from "../Model";
import * as yup from 'yup';


export interface IHeadOfProducts{
    code: string;
    name: string;
    picture: string;
    hasChild: boolean;
    parent:IHeadOfProducts|null;
    children :IHeadOfProducts[] |null    
}

export class HeadOfProductsFactory extends Model<any,any>{


    private GoodInstance = apiAxios('Good');
    items : IHeadOfProducts[] | null = null
    activeItem : IHeadOfProducts | null |undefined = null
    finalItem  : IHeadOfProducts | null = null
    searchItem : string = ''

   
    GoodGetAll=() => {
        this.GoodInstance.get('GetRoot')
          .then((res) => {
            this.items = res.data;
            this.trigger('change');
          })
          .catch((err) => {
            this.trigger('error', err);
          })
      }

    GoodGetAllChildern=(item: IHeadOfProducts , isTopSelected:boolean = false ) => {
      this.searchItem = '';
      this.finalItem = null;
      if(this.activeItem !=null ){
          item.parent = this.activeItem
        
      if(isTopSelected){
        this.activeItem.parent = null;
        item.parent = null
        }
      }
    
      if(item.children != null && typeof item.children ==='object'){
        this.loading=false;
        this.activeItem=item;
        this.trigger('change')
        return;
      }
        this.loading=true;
        this.trigger('change')
        this.GoodInstance.get( `GetChildren?code=${item.code}`)
          .then((res) => {
            this.loading=true;
            this.activeItem=item;
            item.children= res.data;
            this.setLoading(false);
            this.trigger('change');
          })
          .catch((err) => {
            this.trigger('error', err);
          })
      }
      

    SearchList: IHeadOfProducts[] | null = [];
      setSearch = (list: IHeadOfProducts[] | null) => {
          this.SearchList = list;
          this.trigger('change');
      }
  
    searchItemChangeHndler=( e: string) => {
        this.SearchList = null;
        this.searchItem = e;
        this.trigger('change');
    };

    SearchProduct = () => {
        this.setLoading(true);
        this.GoodInstance.get(`Search?filter=${this.searchItem}`)
        .then(res => {
              this.activeItem=res.data;
              this.setSearch(res.data as any);
              this.setLoading(false);

              this.trigger('change');
          })
          .catch(err => {
            this.trigger('error', 'خطا');
          })
      }
    

 

  deleteItem=(item:IHeadOfProducts|null)=>{
      this.GoodInstance.get(`FilterCode?code=${item?.code}`)
      .then(res=>{

        this.items?.filter(i=>i.parent?.children!==res.data);
        // const resDelete:IHeadOfProducts[] | undefined = item?.parent?.children?.filter(i=>i.parent!.children=res.data)
        // console.log("resDelete",resDelete)

        this.trigger("success","محصول  با موفقیت حذف شد ");
      })
      .catch(err=>{this.trigger('error',err)})
    }

  onSubmit = () => {
      if(this.items == null){
        return this.GoodGetAll()
      }else{
        return this.items

      }
    }
   
    static empty(): IHeadOfProducts{
        return{
        parent:null,
        code: '',
        name: '',
        hasChild: false,
        picture: '',
        children :null } 
    }

    schema = yup.object().shape({});

    static buildNew(mainStateManager: MainStateManager): HeadOfProductsFactory {
        return new HeadOfProductsFactory(mainStateManager, HeadOfProductsFactory.empty,apiAxios('Good'));
      }

    }