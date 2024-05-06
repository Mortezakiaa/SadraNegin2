import React from 'react';
import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';

interface LoadingProps {

}

export const Loading: React.FC<LoadingProps> = () => {
    const classes = useStyles();
    return (
        <Grid container item className={classes.loadingParent} >
            <CircularProgress color='inherit' />
            <Typography variant='h6' className={classes.progress} >در حال بارگذاری</Typography>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    loadingParent: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    progress: {
        marginTop: theme.spacing(2)
    }
}))