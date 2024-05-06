import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { MainStateManager } from '../models';

interface FooterProps {
    mainStateManager: MainStateManager;
}

export const Footer: React.FC<FooterProps> = ({
    mainStateManager,
}) => {
    const classes = useStyles();

    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open('https://www.amisa.co', '_black');
    }

    return (
        <Grid item className={classes.footerBar} >
            <Typography className={classes.typographyStyles} onClick={onClickHandler} >
                اجرا و پیاده سازی - امین سیستم آرمان
            </Typography>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    footerBar: {
        position: 'static',
        bottom: 0,
        background: theme.palette.error.main,
        padding: theme.spacing(.5),
        zIndex: 500
    },
    typographyStyles: {
        flex: 1,
        textAlign: 'center',
        color: 'green',
        cursor: 'pointer',
    },
}));