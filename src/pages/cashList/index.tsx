import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useHelmet, useSelfFormView } from '../../utilities';
import { CashSearch } from '../../models/Cash/Search'
import { ICashSearch } from '../../models/Cash/Search';
import { SelfForm } from '../../components';
import { CashViewTableContainer } from '../../containers/cashViewTabel';

interface CashListContainerProps {
    factory: CashSearch;
}

const OrderListContainer: React.FC<CashListContainerProps> = ({
    factory,
}) => {
    const [mainState] = useSelfFormView<ICashSearch, CashSearch>(factory);
    let helmet = useHelmet(
        ' - Order List | برنامه وب پیشرفته صدرا - لیست سفارشات'
        , 'نمایش سفارشات شرکت صدرا. با توجه به فیلتر درخواستی'
    );

    useEffect(() => {
        if (!mainState.CashList.length) {
            mainState.getList();      
        }
    }, [mainState]);

    return (
        <>
            {helmet}
            <Grid item container direction='column' className='self-container' >
                <SelfForm<ICashSearch, CashSearch>
                    mainState={mainState}
                    title= "لیست دریافت وجوه"
                >
                    <CashViewTableContainer
                        mainState={mainState}
                        rows={mainState.CashList}
                        withAssets
                    />
                </SelfForm>
            </Grid>
        </>
    )
}

export default OrderListContainer;