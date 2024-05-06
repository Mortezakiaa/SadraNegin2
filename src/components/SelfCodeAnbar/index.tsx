import React from 'react';
import { IItemProps, Model } from '../../models';
import { SelfAutoComplete } from '..'
import { Control, FieldName } from 'react-hook-form';


const codeAnbar: IItemProps[] = [
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


interface SelfCodeAnbarProps<M> {
  mainState: M;
  control: Control<any>;
  fieldName: FieldName<any>
}
export function SelfCodeAnbar<M extends Model<any, any>>({
  mainState,
  control,
  fieldName
}: SelfCodeAnbarProps<M>) {

  // const onChangeHandler = (e: IItemProps | null) => {
  //   (mainState as any)[fieldName] = e;
  // }

  return (
    
      <SelfAutoComplete<M, any>
        mainState={mainState}
        control={control}
        fieldName={fieldName}
        label='کد انبار'
        defaultItems={codeAnbar}
        required
        rules={{
          required: true
        }} />
    

  )
}