import React, { useState } from 'react';
import {  CashSearch, CashSearchFilter} from '../../../models/Cash/Search';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { SelfDatePickerWithoutField, SelfModal, SelfTextFieldWithoutField } from 'components';

interface FilterTableContainerProps {
    mainState: CashSearch;
}

export const FilterTableContainer = ({
    mainState,
}: FilterTableContainerProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<CashSearchFilter>({
        filter: '',
        dateFrom: null,
        dateTo: null,
        itemsPerPage: 20,
        currentPage: 1,
    });
    const classes = useStyles();

    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);
    }

    const onSubmitHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.getList(filter);
        setOpen(false);
    }

    const onCloseHandler = () => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={onClickHandler} className={classes.filter} variant='text' >
                جستجو
            </Button>
            <SelfModal
                open={open}
                onClose={onCloseHandler}
                title='فیلتر'
            >
                <Grid container item style={{ maxWidth: '15rem', justifyContent: 'center' }} >
                    <Grid>
                        <Typography variant='subtitle1' component='h6'>
                            نام :
                        </Typography>
                        <SelfTextFieldWithoutField
                            value={filter.filter}
                            label='نام'
                            onChange={(e) => setFilter({ ...filter, filter: e })}
                            focused
                        />
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1' component='h6'>
                            از تاریخ :
                        </Typography>
                        <SelfDatePickerWithoutField
                            value={filter.dateFrom}
                            label='تاریخ'
                            onChange={(e) => setFilter({ ...filter, dateFrom: e })}
                        />
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1' component='h6'>
                            تا تاریخ :
                        </Typography>
                        <SelfDatePickerWithoutField
                            value={filter.dateTo}
                            label='تاریخ'
                            onChange={(e) => setFilter({ ...filter, dateTo: e })}
                        />
                    </Grid>
                    <Button
                        onClick={onSubmitHandler}
                        variant='contained'
                        color='primary'
                        fullWidth
                    >
                        اعمال
                    </Button>
                </Grid>
            </SelfModal>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    filter: {
        position: 'absolute',
        right: '.8rem',
        bottom: '.8rem',
        minWidth: 'auto',
        width: 45,
        height: 45,
        background: 'rgba(244, 67, 54, .6)',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        borderRadius: '50%',
        boxShadow: `0 0 2px 0 ${theme.palette.primary.main}`,
        zIndex: 5,
        '&:hover': {
            background: `linear-gradient(45deg, #f4433694, ${theme.palette.primary.main} 50%)`,
            boxShadow: `0 0 10px 0 ${theme.palette.primary.main}`,
        },
    }
}));
