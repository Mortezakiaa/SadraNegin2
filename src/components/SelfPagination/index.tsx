import React from 'react';
import { FormControl, FormControlProps, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

interface SelfPaginationProps {
    totalPages: number;
    currentPage: number;
    onChange: (page: number) => void;
    props?: FormControlProps;
}

export const SelfPagination = ({
    totalPages,
    currentPage,
    onChange,
    props,
}: SelfPaginationProps) => {
    const classes = useStyles();

    const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
        e.preventDefault();
        onChange(page);
    }

    return (
        <FormControl fullWidth className={classes.formControl} {...props} >
            <Pagination
                className={classes.pagination}
                color='primary'
                count={totalPages}
                page={currentPage}
                onChange={onChangeHandler}
                siblingCount={0}
                boundaryCount={1}
            />
        </FormControl>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        minWidth: 50
    },
    pagination: {
        direction: 'ltr',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
