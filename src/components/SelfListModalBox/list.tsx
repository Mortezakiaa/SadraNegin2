import React from 'react';
import { SelfModal } from 'components/Modal';
import { Model } from 'models';
import {ActiveItem} from '../ActiveItem'
import { Button, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useSelfForm } from 'utilities';
import { FilterProductIcon } from './filter';
import { HeadOfProductsFactory, IHeadOfProducts } from 'models/HeadOfProductsFactory';
import {SearchItem} from '../SelfSearch/SearchItem'




interface SelfModalListProps<IM, M extends Model<any, any>> {
    mainState: M;
    open: boolean;
    setOpen: (value: boolean) => void;
    onClick:(value:IHeadOfProducts|null)=> void

}
interface ResultProps{
    factory:HeadOfProductsFactory;
}

export function SelfModalList<IM, M extends Model<any, any>>({
    mainState,
    open,
    setOpen,
    onClick
}: SelfModalListProps<IM,M>) {

    
    const classes = useStyles();
    const [factory] = useSelfForm( mainState.mainStateManager.Usering.HeadOfProductsFactory);
 
const onCloseHandler = () => {
      setOpen(false);
      factory.trigger('change');
      
    };


   const onClickHandler =(i:IHeadOfProducts| null)=>{
        setOpen(false);
        onClick(i);
        factory.trigger('change');  
    }


    const btnCheck = factory.finalItem? 
    <Button
    variant='outlined'
    color='primary'
    fullWidth
    onClick={()=>onClickHandler(factory.finalItem)}
    >
    انتخاب
    </Button>
    : null

    return (
        <SelfModal
            open={open}
            onClose={onCloseHandler}
            title='لیست محصولات'
            buttons={btnCheck}
            
        >
            <div style={{display: 'flex', justifyContent:' space-around',width:' 100%'}}>
            <FilterProductIcon<M, any> mainState={mainState} factory={factory}  />
            {/* <SelfLevels  factory={factory}/> */}
            
            <Grid item container className={classes.container} >
                <Grid container item className={classes.selectedContainer} >
                    <Grid container item className={classes.itemsContainer} >
                        <Result factory={factory}/>
                    </Grid>  
                </Grid>
            </Grid>
            </div>
        </SelfModal>
    )
}

export function Result({factory}: ResultProps) {
    
    if(factory.loading){
        return <CircularProgress />
    }else if(factory.searchItem !==''){
            return <SearchItem factory={factory}/>
    }else if(factory.activeItem !== null){
            return <ActiveItem factory={factory}/>
    }else{
            return <></>
    }
}
    
    

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'auto',
        maxHeight: 'calc(100vh - 12rem)',
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
    }
}))
