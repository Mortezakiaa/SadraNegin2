import React from 'react';
import { Model } from '../../models'
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useSelfForm } from '../../utilities';
import { FilterProductIcon } from '../SelfListModalBox/filter';
import {SelfSearch } from '../SelfSearch';
import {SelfLevels} from '../SelfLevels/index';
import { IHeadOfProducts } from '../../models/HeadOfProductsFactory';
import { Result } from '../SelfListModalBox/list';




interface ShowProductsProps<IM, M extends Model<any, any>> {
    mainState: M;

}

export function SelfDontShowProducts<IM, M extends Model<any, any>>({
    mainState,
  
}: ShowProductsProps<IM,M>) {

    
    const classes = useStyles();
    const [factory] = useSelfForm( mainState.mainStateManager.Usering.HeadOfProductsFactory);
    

    const onDeleteRowHandler = (i:IHeadOfProducts| null) => {
        mainState.trigger('confirm',
            `آیا مایل به حذف محصول با شماره ${i?.code} میباشید`,
            'در صورت حذف رکورد حذف شده قابلیت بازگردانی دارد',
            () => { 
                factory.deleteItem(i);
            } ,
            () => { }
        )
    }

    const btnCheck = factory.finalItem ?
    <>
        <Button
        variant='outlined'
        color='primary'
        fullWidth
        onClick={()=>onDeleteRowHandler(factory.finalItem)}
        >
        عدم نمایش
        </Button>
      </>
    : null

    return (
            <>
            <FilterProductIcon<M, any> mainState={mainState} factory={factory}  />
            <SelfSearch<IM,M> mainState={mainState} factory={factory} />
            <SelfLevels  factory={factory}/>
            <Grid item container className={classes.container} >
                <Grid container item className={classes.selectedContainer} >
                    <Grid container item className={classes.itemsContainer} >
                         <Result factory={factory}/>
                    </Grid> 
                </Grid>
            </Grid>
            {btnCheck} 
           </>
    )
}


const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: 'inset 0 0 10px 0 rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'auto',
        maxHeight: 'calc(100vh - 25rem)',
        minHeight: 220
    },
    selectedContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    itemsContainer: {
        display: 'flex',
        alignItems: 'stretch',
        width: "100%",
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    imageContainer: {
        position: 'sticky',
        top: '1rem',
        display: 'flex',
        flexBasis: '50%'
    },
    selfTextField: {
        flexGrow: 1
    },
    button: {
        margin: '8px 0'
    },
    deleteBtn:{
        position:'sticky',
        top: 0,
    },
  
}))