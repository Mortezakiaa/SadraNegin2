import React from 'react';
import { Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import { SelfModal } from 'components';
import { Customer, MainStateManager } from 'models';
import CustomerContainer from '.';

interface CustomerShortCutProps {
    mainState: MainStateManager;
    disabledPrevForm?: (value: boolean) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const CustomerShortCut = ({
    mainState,
    disabledPrevForm,
    open,
    setOpen,
}: CustomerShortCutProps) => {

    const showHandler = (e: React.MouseEvent) => {
        mainState.Usering.Customer = Customer.buildNew(mainState);
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

    return (
        <>
            <Button variant='outlined' onClick={showHandler} >
                <AddOutlined />
            </Button>
            <SelfModal
                open={open}
                title='اضافه کردن مشتری'
                onClose={hideHandler}
                overflow
            >
                <CustomerContainer factory={mainState.Usering.Customer} />
            </SelfModal>
        </>
    )
}
