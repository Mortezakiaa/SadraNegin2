import React from 'react';
import { SelfLabelBox, SelfModal } from '../../../components';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { NotifSearch } from '../../../models/Notification/Search';

interface SelfTableRowDetailsProps {
    mainState: NotifSearch;
}

export const SelfTableRowDetails = ({
    mainState,
}: SelfTableRowDetailsProps) => {
    const classes = useStyles();

    const onCloseHandler = () => {
        mainState.setShowRowDetails(false);
        mainState.rowDetails = null;
    }
    const onClickHandler = (id: number,type:string) => {
        mainState.downLoadFile(id,type);
    }


    if (mainState.rowDetails) {
        const {
            id,
            date,
            sharh,
            tozihat,
            lines
        } = mainState.rowDetails;

        return (
            <>
                <SelfModal
                    open={mainState.showRowDetails}
                    onClose={onCloseHandler}
                    title='نمایش جزییات اطلاعیه'
                >
                    <Grid container item className={classes.container} >
                        <SelfLabelBox label='id' value={id.toString()} />
                        <SelfLabelBox label=' شرح ' value={sharh} />
                        <SelfLabelBox label=' توضیحات' value={tozihat} />
                        <SelfLabelBox label='تاریخ' value={date} />
                        <div>{  
                        lines.map((item, index) =>
                            <Button key={index} onClick={() => onClickHandler(item.id,item.fileType)}> {item.id}دریافت فایل</Button>)
                        }</div>
                    </Grid>

                </SelfModal>
            </>
        )
    }

    return null;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 'calc(100vh - 20rem)',
        overflowY: 'auto'
    }
}))
