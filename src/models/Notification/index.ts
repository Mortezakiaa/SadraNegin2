import { apiAxios, MainStateManager } from 'models';
import { Model } from 'models/Model'
import React, { createRef } from 'react';
import { NotifSearch } from './Search'
import * as yup from 'yup';
import { convertDate } from 'models/Order';
export interface INotif {
  date?: Date,
  sharh: string,
  tozihat: string,
  lines:
  {
    tozihat: string | undefined,
    name: string | undefined,
    fileContent: string | undefined,
    fileType: string | undefined
  }[]
}


export class NotificationFactory extends Model<any, any>{
 
  public disabled: boolean = false;
  titleValue: string = '';
  inputValue: string = '';
  tozihat: string | undefined = '';
  name: string | undefined = '';
  fileContent: string | undefined = undefined;
  fileType: string | undefined = '';
  values: INotif = { sharh: '', tozihat: '', lines: [] };
  isSelected: boolean = false;

  fileReader=(e:File)=>{
    const file = e
    const reader = new FileReader();
    reader.onloadstart = function () {
      
    };
    const onLoaded=(value:string)=>{
      this.fileContent = value
    }
    reader.onloadend = function () {
      const value =  reader.result
      if (value && typeof value === 'string') {
          const res = value.split(',')[1];
          onLoaded(res);
      }
    };
    reader.readAsDataURL(file);
 }


  private GoodInstance = apiAxios('Letter');

  onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const first = e.target.files[0];
      if(first){
        this.tozihat= first.name;
        this.name = first.name.split('.')[0];
        this.fileType=first.name.split('.')[1];
        this.fileReader(first);
      }
    }
  }


  inputReff = createRef<HTMLInputElement>()

  onChangeTiltle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.titleValue = e.target.value;
    this.trigger('change');
  }
  onchangeHandler = (text: string) => {
    this.inputValue = text;
    this.trigger('change');
  };

  onSubmitHandler = () => {
    const newLine = { tozihat: this.tozihat, name: this.name, fileType: this.fileType, fileContent: this.fileContent }
    this.values.lines = [...this.values.lines, newLine];
    this.trigger('change');
  }
  NotificationList: INotif[]  = [];
  setNotif = (list: INotif[] ) => {
      this.NotificationList = list;
      this.trigger('change');
  }
  sendFile = (dto:INotif|null) => {
    if(dto?.date!=null){
      const newDate =convertDate(Object.values(dto.date)[4]);  
      const newValue = {date: newDate, sharh: this.titleValue, tozihat: this.inputValue, lines:this.values.lines};

      this.GoodInstance.post('Insert', newValue)
        .then((res) => {
        if(res.status===200){
          this.trigger('success', 'اطلاعیه با موفقیت ثبت شد');
          this.setNotif(res.config.data)
        
        }
       setTimeout(()=>{
        this.values= { sharh: '', tozihat: '', lines: [] };
        this.titleValue ='';
        this.inputValue='';
        this.trigger('change');
       },1500)})
        .catch((err) => { this.trigger("error", err)})
    } 
  };

  byteArrayToImageConvertor(byteArray:string){
    const str = 'data:image/png;';
    str.concat(byteArray);
    return str
  }
  onSubmit = (dto:INotif|null) => {
    
    if( dto?.date!==null){
      this.sendFile(dto);
      this.loading = false
    }else{
      return null
    }
  };

  static empty(){
  
  };

  Search = NotifSearch.buildNew(this.mainStateManager);
  schema = yup.object().shape({});

  static buildNew(mainStateManager: MainStateManager): NotificationFactory {
    return new NotificationFactory(mainStateManager, NotificationFactory.empty, apiAxios('Letter'));
  }
}