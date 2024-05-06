import React from 'react';
import { SelfModal } from '../../../components';
import { StoreSearch } from 'models/Store/Search';
import { SelfTableRowDetailsTable } from './table';

interface SelfTableRowDetailsProps {
    mainState: StoreSearch;
}

export const SelfTableRowDetails = ({mainState}: SelfTableRowDetailsProps) => {
    
    const onCloseHandler = () => {
        mainState.setShowRowDetails(false);
        mainState.rowDetails = null;
    }
        const lines = mainState.rowDetails;
        return (
            <>
                <SelfModal
                    open={mainState.showRowDetails}
                    onClose={onCloseHandler}
                    title='نمایش جزییات '
                >
                < SelfTableRowDetailsTable lines={lines}/>
                </SelfModal>
            </>
        )
    }

