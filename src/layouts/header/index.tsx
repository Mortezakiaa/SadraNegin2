import React from 'react';
import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core';
import { MainStateManager } from 'models';
import { DextopMenu } from './Menu';
import { PhoneMenu } from './PhoneMenu';
// import { BasketShop } from './cart';
import { useSelfForm, useWidth } from 'utilities';

interface HeaderProps {
    mainStateManager: MainStateManager;
}


export const Header: React.FC<HeaderProps> = ({
    mainStateManager,
}) => {
    const classes = useStyles();
    const width = useWidth();

    const [factory] = useSelfForm(mainStateManager.Usering.HeadOfProductsFactory);
 
    const onChangePageHandler = () => {
          factory.setSearch(null);
          factory.searchItem='';
          factory.items = null;
          factory.activeItem=null;
          factory.finalItem=null;
          factory.trigger('change');
          
        };

    return (
        <Grid item>
            <AppBar position='static'>
                <Toolbar className={classes.headToolbarStyle} >
                    {width === 'xs' ?
                        <PhoneMenu mainStateManager={mainStateManager} /> :
                        <DextopMenu mainStateManager={mainStateManager} onClickItem={onChangePageHandler}/>
                    }
                    {/* <BasketShop mainFactory={mainStateManager.Usering.Order} /> */}
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

const useStyles = makeStyles({
    headToolbarStyle: {
        justifyContent: 'space-between'
    }
});