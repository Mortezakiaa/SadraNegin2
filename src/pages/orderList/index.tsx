import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useHelmet, useSelfFormView } from '../../utilities';
import { OrderSearch, IOrderSearch } from 'models';
import { SelfForm } from 'components';
import { OrderViewTableContainer } from 'containers';
interface OrderListContainerProps {
    factory: OrderSearch;
}

const OrderListContainer: React.FC<OrderListContainerProps> = ({
    factory,
}) => {
    const [mainState] = useSelfFormView<IOrderSearch, OrderSearch>(factory);
    const helmet = useHelmet(
        'SaDra - Login | برنامه وب پیشرفته صدرا - ورود'
        , 'برنامه وب پیشرفته صدرا . صفحه ورود کاربر . نمایش صفحه ورود کاربر به برنامه'
    );

    useEffect(() => {
         mainState.getList();
    }, [mainState]);

    return (
        <>
            {helmet}
            <Grid item container direction='column' className='self-container' >
                <SelfForm<IOrderSearch, OrderSearch>
                    mainState={mainState}
                    title='لیست سفارشات'
                >
                    <OrderViewTableContainer
                        mainState={mainState}
                        rows={mainState.OrderList}
                        withAssets
                    />
                </SelfForm>
                {/* <TestForm /> */}
            </Grid>
        </>
    )
}

export default OrderListContainer;