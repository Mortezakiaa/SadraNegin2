import React, { useState } from 'react';
import { MainStateManager } from 'models';
import { Grid, makeStyles, MenuItem } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { SelfDrawer } from './Drawer';

interface PhoneMenuProps {
    mainStateManager: MainStateManager;
}

export const PhoneMenu: React.FC<PhoneMenuProps> = ({
    mainStateManager,
}) => {
    const [drawer, setDrawer] = useState(false);
    const classes = useStyles();

    const onClickHandler = (e: React.MouseEvent, value: boolean) => {
        e.preventDefault();
        setDrawer(value);
    }

    return (
        <>
            <Grid container item className={classes.header} onClick={(e) => onClickHandler(e, true)} >
                <MenuItem className={classes.menuItemStyle}>
                    <Menu />
                </MenuItem>
            </Grid>
            <SelfDrawer
                mainStateManager={mainStateManager}
                className={classes.drawerStyles}
                anchor='right'
                show={drawer}
                onClose={(e) => onClickHandler(e, false)}
                onClickItem={(e) => onClickHandler(e, false)}
            />
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    menuItemStyle: {
        padding: '1rem',
    },
    drawerStyles: {
        width: 250,
        color: 'inherit'
    },
    header: {
        height: '5rem'
    }
}))