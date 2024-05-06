import React from 'react';
import { makeStyles } from '@material-ui/core';
import { HeadOfProductsFactory, IHeadOfProducts } from '../../models/HeadOfProductsFactory';





interface LevelProps {

    exac : () => IHeadOfProducts | undefined | null 
    factory: HeadOfProductsFactory
}

export function Level ({
    exac,
    factory
}: LevelProps){ 

   const classes = useStyles();
   const res = exac()

   const onClickHandler=()=>{
    factory.activeItem=res;
    if(factory.activeItem !== factory.finalItem){
        factory.finalItem = null;
    }
    factory.trigger('change')
   }

   if(res){
       return <div className={classes.levelElement} onClick={onClickHandler}>{res.name}</div>
    }else{
        return null
    }
}

const useStyles = makeStyles((theme) => (
    {levelElement: {
        color: '#3a3a3a',
        borderLeft: '1px solid #b3b3a9',
        padding: '3px',
        height: '80%',
        width:' maxContent',
        display: 'flex',
        fontSize:' 12px',
        alignItems: 'center',
        borderRadius: '2px',
    }}
    
    ))




