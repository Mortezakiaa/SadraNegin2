import React from 'react';
import { Divider, Drawer, Grid, makeStyles } from '@material-ui/core';
import { SelfNavLinkMenuItem } from 'components';
import { FormatListNumberedOutlined, HomeOutlined, ShopOutlined } from '@material-ui/icons';
import { MainStateManager } from 'models';
import { ProfilePhone } from './profile/Phone';

interface SelfDrawerProps {
    mainStateManager: MainStateManager;
    className?: string;
    anchor: 'top' | 'right' | 'left' | 'bottom';
    show: boolean;
    onClose: (e: React.MouseEvent) => void;
    onClickItem: (e: React.MouseEvent) => void;
}

export const SelfDrawer: React.FC<SelfDrawerProps> = ({
    mainStateManager,
    className,
    anchor,
    show,
    onClose,
    onClickItem,
}) => {
    const classes = useStyles();

    // const onLogoutHandler = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     mainStateManager.Usering.logOut();
    // }

    return (
        <Drawer className={className} anchor={anchor} open={show} onClose={onClose} >
            <ProfilePhone mainStateManager={mainStateManager} />
            <Divider className={classes.dviderStyle} />
            <Grid container item direction='column' className={classes.drawerStyles} >
                <SelfNavLinkMenuItem
                    path=''
                    exact
                    caption='خانه'
                    icon={<HomeOutlined />}
                    onClick={onClickItem}
                />
                <SelfNavLinkMenuItem
                    path='/StoreList'
                    caption='موجودی انبار پریفرم'
                    icon={<ShopOutlined />}
                    onClick={onClickItem}
                />
                <SelfNavLinkMenuItem
                    path='/orderList'
                    caption='لیست سفارشات'
                    icon={<FormatListNumberedOutlined />}
                    onClick={onClickItem}
                />
                <SelfNavLinkMenuItem
                    path='/order'
                    caption='ثبت سفارشات'
                    icon={<FormatListNumberedOutlined />}
                    onClick={onClickItem}
                />
                {/* <SelfNavLinkMenuItem
                    path='/cash'
                    caption='پرداخت وجه'
                    icon={<PaymentOutlined />}
                    onClick={onClickItem}
                />
                <SelfNavLinkMenuItem
                    path='/repository'
                    caption='موجودی انبار'
                    icon={<PaymentOutlined />}
                    onClick={onClickItem}
                />
                <SelfNavLinkMenuItem
                    path='/cashList'
                    caption='لیست وجوه واریزی'
                    icon={<PaymentOutlined />}
                    onClick={onClickItem}
                /> */}
                {/* <SelfNavLinkMenuItem
                    path='/notification'
                    caption='اخبار'
                    icon={
                        <Badge badgeContent={2} >
                            <Notifications />
                        </Badge>
                    }
                    onClick={onClickItem}
                /> */}
                {/* {mainStateManager.Usering.isAdmin() ?
                    <>
                        <SelfNavLinkMenuItem
                            path='/new-notification'
                            caption='خبر جدید'
                            icon={<AddAlertOutlined />}
                            onClick={onClickItem}
                        />
                        <SelfNavLinkMenuItem
                            path='/userrule'
                            caption='دسترسی کاربران'
                            icon={<TuneOutlined />}
                            onClick={onClickItem}
                        />
                    </> : null}
                <SelfNavLinkMenuItem
                    path='/auth'
                    caption='خروج'
                    icon={<ExitToAppOutlined />}
                    onClick={onLogoutHandler}
                /> */}
            </Grid>
        </Drawer>
    )
}

const useStyles = makeStyles((theme) => ({
    drawerStyles: {
        width: 250
    },
    dviderStyle: {
        height: '2px'
    }
}))

