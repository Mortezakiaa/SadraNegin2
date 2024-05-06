import React from 'react';
import { Model } from '../../models';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { SelfTextFieldWithoutField } from '../SelfTextField/withoutField';
import { FindInPageOutlined } from '@material-ui/icons';
import { HeadOfProductsFactory } from 'models/HeadOfProductsFactory';


interface SelfSearchProps<IM, M extends Model<any, any>> {
    mainState: M;
    factory : HeadOfProductsFactory

}

export function SelfSearch <IM, M extends Model<any, any>>({
    mainState,
    factory
   
}: SelfSearchProps<IM, M>){ 


    const classes = useStyles();

    const onSearchHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        factory.SearchProduct();
      
    }

    const res= <Grid item container >
        
                <SelfTextFieldWithoutField
                    className={classes.selfTextField}
                    label='جستجو'
                    value={factory.searchItem}
                    disabled={mainState.loading}
                    onChange={factory.searchItemChangeHndler}
                />
                <Button
                    className={classes.button}
                    variant='outlined'
                    color='primary'
                    disabled={mainState.loading}
                    onClick={onSearchHandler}
                >
                    <FindInPageOutlined />
                </Button>
            </Grid>
            return <>{res}</>
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
        flexBasis: '50%',
        alignItems: 'stretch'
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




