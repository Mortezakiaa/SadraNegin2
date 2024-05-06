import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DnsOutlined } from '@material-ui/icons';
import { SelfModal } from '../../components';
import { IItemProps, MainStateManager } from '../../models';
import { useSelfFormView } from '../../utilities';
import { ICashSearch, CashSearch } from '../../models/Cash/Search';
import { CashViewTableContainer } from '../../containers/cashViewTabel';

interface CashListShortCutProps {
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
}: CashListShortCutProps) => {
    const [mainState] = useSelfFormView<ICashSearch, CashSearch>(mainStateManager.Usering.Cash.Search);

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
        if (!mainState.CashList.length) {
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
                <CashViewTableContainer
                    mainState={mainState}
                    rows={mainState.CashList}
                    onClickRow={onClickRowHandler}
                />
            </SelfModal>
        </>
    )
}
