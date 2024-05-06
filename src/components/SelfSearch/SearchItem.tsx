import React from 'react';
import { SelfListItem } from '../SelfListModalBox/listItem';
import { HeadOfProductsFactory, IHeadOfProducts } from '../../models/HeadOfProductsFactory';
import { EmptyItem } from 'components/EmptyItem';

interface SearchItemProps{
    factory: HeadOfProductsFactory
}

export function SearchItem({
    factory,
}: SearchItemProps){

   
   const onClickHandler =(item: IHeadOfProducts)=>{
    if(item.hasChild){
        factory.GoodGetAllChildern(item);
    }else{
        factory.finalItem=item;
        factory.trigger('change'); 
    }
    }
   if(factory.SearchList?.length!== 0 && factory.SearchList!==null){
       const res =factory.SearchList.map((item,index)=>
       <SelfListItem
        item = {item}
        factory = {factory}
        key={index}
        title={item.name}
        onClick={()=>{onClickHandler(item)}}
        img={item.picture}
         
    />)
    return <>{res}</>
   }else {
       return <EmptyItem/>;
   }
}





