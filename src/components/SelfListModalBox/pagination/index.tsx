import React from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

export const SelfPagination = () => {
    const classes = useStyle();

    return (
        <Grid item container className={classes.container} >
            <Pagination count={4} color='primary' />
        </Grid>
    )
}

const useStyle = makeStyles((theme) => ({
    container: {
        boxShadow: 'inset 0 0 10px 0 rgba(0, 0, 0, .2)', 
        padding: '10px 0', 
        marginTop: 10, 
        borderRadius: 5, 
        direction: 'ltr', 
        justifyContent: 'center'
    }
}))
