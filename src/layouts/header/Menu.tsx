import React from 'react';
import { Grid, makeStyles, MenuItem } from '@material-ui/core';
import { SelfNavLink } from 'components';
import { MainStateManager } from 'models';
import { Profile } from './profile';

interface DextopMenuProps {
    mainStateManager: MainStateManager;
    onClickItem?: (e: React.MouseEvent) => void;
}

export const DextopMenu: React.FC<DextopMenuProps> = ({
    mainStateManager,
    onClickItem,
}) => {
    const classes = useStyles();
    return (
        <Grid container item >
            <Profile mainStateManager={mainStateManager} />
            {mainStateManager.Usering.isAdmin() ?
                <>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink exact path='' caption='خانه' />
                    </MenuItem>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/orderList' caption='لیست سفارشات' />
                    </MenuItem>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/StoreList' caption='موجودی انبار تریگر'/>
                    </MenuItem>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/StoreSecond' caption='موجودی انبار قطعات تریگر' />
                    </MenuItem>

                </>
                :
                <>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink exact path='' caption='خانه' />
                    </MenuItem>
                    {/* <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/order' caption='ثبت سفارش' />
                    </MenuItem> */}
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/orderList' caption='لیست سفارشات' />
                    </MenuItem>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/StoreList' caption='موجودی انبار تریگر' />
                    </MenuItem>
                    <MenuItem className={classes.menuItemStyle} onClick={onClickItem} >
                        <SelfNavLink path='/StoreSecond' caption='موجودی انبار قطعات تریگر' />
                    </MenuItem>
                </>
            }
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    menuItemStyle: {
        padding: 0,
    }
}))