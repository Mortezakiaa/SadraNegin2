import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps {
    component: JSX.Element;
    failurePath: string;
    rest: RouteProps;
    condition: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component,
    failurePath,
    rest,
    condition,
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (condition) {
                    return component;
                } else {
                    return <Redirect to={{
                        pathname: failurePath,
                        state: {
                            from: props.location
                        }
                    }} />
                }
            }}
        />
    )
}