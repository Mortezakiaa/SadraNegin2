import React from 'react';
import { Divider, makeStyles, MenuItem } from '@material-ui/core';
import { SelfNavLink } from '.';

interface SelfNavLinkMenuItemProps {
    path: string;
    exact?: boolean;
    strict?: boolean;
    caption: string;
    icon: JSX.Element;
    onClick?: (e: React.MouseEvent) => void;
}

export const SelfNavLinkMenuItem: React.FC<SelfNavLinkMenuItemProps> = ({
    path,
    exact,
    strict,
    caption,
    icon,
    onClick
}) => {
    const classes = useStyles();

    return (
        <>
            <MenuItem className={classes.menuItemStyle} onClick={onClick} >
                <SelfNavLink
                    menu
                    path={path}
                    caption={caption}
                    exact={exact}
                    strict={strict}
                >
                    {icon}
                </SelfNavLink>
            </MenuItem>
            <Divider />
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    menuItemStyle: {
        padding: 0
    },
}));