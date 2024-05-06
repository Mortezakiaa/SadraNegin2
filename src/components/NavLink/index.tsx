import React from 'react';
import { NavLink } from "react-router-dom"

interface SelfNavLinkProps {
    path: string;
    exact?: boolean;
    strict?: boolean;
    caption?: string;
    menu?: boolean;
}

export const SelfNavLink: React.FC<SelfNavLinkProps> = ({
    path,
    exact,
    strict,
    caption,
    menu,
    children
}) => {
    return (
        <NavLink
            to={path}
            exact={exact || false}
            strict={strict || false}
            className={`self-link ${children ? 'icon' : ''}`}
            activeClassName={`active-link ${menu ? 'menu' : ''}`}
        >
            {caption}
            {children}
        </NavLink>
    )
}