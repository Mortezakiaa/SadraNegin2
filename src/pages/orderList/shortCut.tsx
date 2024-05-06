import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DnsOutlined } from '@material-ui/icons';
import { SelfModal } from 'components';
import { IItemProps, MainStateManager } from 'models';
import { useSelfFormView } from '../../utilities';
import { IOrderSearch, OrderSearch } from '../../models';
import { OrderViewTableContainer } from 'containers';

interface OrderListShortCutProps {
    mainStateManager: MainStateManager;
    disabledPrevForm?: (value: boolean) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    onSelect?: (item: IItemProps) => void;
}

export const OrderListShortCut = ({
    mainStateManager,
    disabledPrevForm,
    open,
    setOpen,
    onSelect,
}: OrderListShortCutProps) => {
    const [mainState] = useSelfFormView<IOrderSearch, OrderSearch>(mainStateManager.Usering.Order.Search);

    const showHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (disabledPrevForm) {
            disabledPrevForm(true);
        }
        setOpen(true);
    }

    const hideHandler = (e: {}) => {
        setOpen(false);
        if (disabledPrevForm) {
            disabledPrevForm(false);
        }
    }

    const onClickRowHandler = (item: IItemProps) => {
        if (onSelect) {
            onSelect(item);
        }
        setOpen(false);
        if (disabledPrevForm) {
            disabledPrevForm(false);
        }
    }

    useEffect(() => {
        if (!mainState.OrderList.length) {
            mainState.getList();
        }
    }, [mainState]);

    return (
        <>
            <Button variant='outlined' onClick={showHandler} >
                <DnsOutlined color='inherit' />
            </Button>
            <SelfModal
                open={open}
                title='لیست سفارشات'
                onClose={hideHandler}
                overflow
            >
                <OrderViewTableContainer
                    mainState={mainState}
                    rows={mainState.OrderList}
                    onClickRow={onClickRowHandler}
                />
            </SelfModal>
        </>
    )
}
