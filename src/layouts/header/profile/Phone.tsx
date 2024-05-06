import React from 'react';
import { MainStateManager } from 'models';
import { Avatar, capitalize, Grid, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

interface ProfilePhoneProps {
    mainStateManager: MainStateManager;
}

export const ProfilePhone: React.FC<ProfilePhoneProps> = ({
    mainStateManager,
}) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.profileGrid} >
            <Avatar className={classes.avatar} >
                {mainStateManager.Usering.userName.slice(0, 1).toUpperCase()}
            </Avatar>
            <Typography variant='h6' className={classes.typeUser} >
                {capitalize(mainStateManager.Usering.userName)}
            </Typography>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: '50%',
        background: theme.palette.primary.main,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    profileGrid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    typeUser: {
        color: grey.A200,
    }
}))