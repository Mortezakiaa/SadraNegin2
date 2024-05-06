import React from 'react';
import { SelfListItem } from '../SelfListModalBox/listItem';
import { HeadOfProductsFactory, IHeadOfProducts } from '../../models/HeadOfProductsFactory';
import { EmptyItem } from 'components/EmptyItem';


interface ActiveItemProps{
    factory: HeadOfProductsFactory

}

export function ActiveItem({
    factory
}: ActiveItemProps){

   
   const onClickHandler =(item: IHeadOfProducts)=>{
    if(item.hasChild){
        factory.GoodGetAllChildern(item);
    }else{
        factory.finalItem=item;
        factory.trigger('change'); 
    }
   }


   if(factory.activeItem!.hasChild && factory.activeItem!.children != null ){
    const res =factory.activeItem!.children.map((item,index)=> 
    
    <SelfListItem
        item = {item}
        factory = {factory}
        key={index}
        title={item.name}
        onClick={()=>{onClickHandler(item)}}
        img={item.picture} 
    />
    ) 
    return <>{res}</> 
   }else{
       return <EmptyItem/>
    }
}





