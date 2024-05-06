import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Header } from './header';
import { MainStateManager } from '../models';
import { LazyRoute } from '../router/LazyRoute';
import { useForceUpdate, useHelmet } from '../utilities';
import { useHistory } from 'react-router-dom';

interface AppLayoutProps {
    mainStateManager: MainStateManager;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
    mainStateManager,
}) => {
    const classes = useStyles();
    let history = useHistory();
    const forceUpdate = useForceUpdate();
    let helmet = useHelmet(
        'صدرا - List | برنامه وب پیشرفته صدرا - خانه'
        , 'برنامه وب پیشرفته صدرا . صفحه اصلی برنامه . نمایش صفحه اصلی برنامه '
    );

    window.addEventListener('popstate', () => {
        history.go(1);
    });

    useEffect(() => {
        mainStateManager.Eventing.on('factoryChange', () => {
            forceUpdate();
        });

        return () => {
            mainStateManager.Eventing.remove('factoryChange');
        }
    }, [mainStateManager, forceUpdate]);

    return (
        <Grid container direction='column' className={classes.appStyle} >
            {helmet}
            <Header mainStateManager={mainStateManager}  />
            <Grid container className={classes.containerStyle}>
                <LazyRoute exact path='/' address='home' props={{ factory: mainStateManager.Usering.Home}}/>
                <LazyRoute path='/order' address='order' props={{ factory: mainStateManager.Usering.Order }} />
                <LazyRoute path='/orderlist' address='orderList' props={{ factory: mainStateManager.Usering.Order.Search }} />
                <LazyRoute path={['/cash/:id', '/cash']} address='cash' props={{ factory: mainStateManager.Usering.Cash }} />
                <LazyRoute path='/userrule' address='rule' props={{ factory: mainStateManager.Usering.Rule }} />
                <LazyRoute path='/cashlist' address='cashList' props={{ factory: mainStateManager.Usering.Cash.Search}} />
                <LazyRoute path='/repository' address='repository' props={{ factory: mainStateManager.Usering.Repository}} />
                <LazyRoute path='/notification' address='notification' props={{ factory: mainStateManager.Usering.NotificationFactory}} />
                <LazyRoute path='/notificationList' address='notificationList' props={{factory: mainStateManager.Usering.NotificationFactory.Search}} />
                <LazyRoute path='/StoreList' address='StoreList' props={{factory: mainStateManager.Usering.StoreSearch35}} />
                <LazyRoute path='/StoreSecond' address='StoreSecond' props={{factory: mainStateManager.Usering.StoreSearch7}} />
                <LazyRoute path='/DepotList' address='DepotList' props={{factory: mainStateManager.Usering.Depot}} />


                {/* <LazyRoute path='/dontShowProducts' address='dontShowProducts' props={{ factory: mainStateManager.Usering.HeadOfProductsFactory}} /> */}
                {/* <LazyRoute path='/showProducts' address='showProducts' props={{ factory: mainStateManager.Usering.HeadOfProductsFactory}} /> */}
                {/* <LazyRoute path='/new-notification' address='insertNews' props={{ factory: mainStateManager.Usering.News }} /> */}
                {/* <LazyRoute path='/notification' address='viewNews' props={{}} /> */}

            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    appStyle: {
        flexWrap: "nowrap",
        flexGrow: 1
    },
    containerStyle: {
        flexGrow: 1,
        flexWrap: 'nowrap',
        maxHeight: 'calc(100vh - 6rem)',
        overflow: 'auto',
    }
}))