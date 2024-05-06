import React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import { Loading } from './Progress';

interface SelfBackDropProps {
    show: boolean;
    progress?: boolean;
}

export const SelfBackDrop: React.FC<SelfBackDropProps> = ({
    show,
    progress,
    children
}) => {
    const classes = useStyles();
    if (!show) {
        return null;
    }
    return (
        <Backdrop open={show} className={classes.backDrop} >
            {progress && <Loading />}
            {children}
        </Backdrop>
    )
}

const useStyles = makeStyles((theme) => ({
    backDrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));