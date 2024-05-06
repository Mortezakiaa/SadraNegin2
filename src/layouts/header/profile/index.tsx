import React, { useState } from 'react';
import { MainStateManager } from 'models';
import { Avatar, Grid, makeStyles, Menu, MenuItem, Tooltip } from '@material-ui/core';

interface ProfileProps {
    mainStateManager: MainStateManager;
}

export const Profile: React.FC<ProfileProps> = ({
    mainStateManager,
}) => {
    const [menu, setMenu] = useState<Element | null>(null);
    const classes = useStyles();

    const onCLickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenu(e.currentTarget);
    }

    const onCloseHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenu(null);
    }

    const signOut = (e: React.MouseEvent) => {
        mainStateManager.Usering.logOut();
        onCloseHandler(e);
    }

    return (
        <Grid item className={classes.profileGrid} >
            <Tooltip arrow title={mainStateManager.Usering.userName} aria-label='username' >
                <Avatar className={classes.avatar} aria-haspopup={true} onClick={onCLickHandler} >
                    {mainStateManager.Usering.userName.slice(0, 1).toUpperCase()}
                </Avatar>
            </Tooltip>
            <Menu
                open={Boolean(menu)}
                anchorEl={menu}
                keepMounted
                onClose={onCloseHandler}
            >
                <MenuItem onClick={signOut} >خروج</MenuItem>
            </Menu>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    profileGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
    },
    avatar: {
        color: theme.palette.primary.main,
        background: theme.palette.getContrastText(theme.palette.primary.main),
        cursor: 'pointer',
    }
}))