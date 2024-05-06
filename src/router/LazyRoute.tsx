import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { SelfBackDrop } from 'components';
import { IPageTypes, importPage } from 'pages';

interface LazyRouteProps<IPROPS> {
    path: string | string[];
    address: IPageTypes;
    props?: IPROPS;
    exact?: boolean;
    strict?: boolean;
}

export function LazyRoute<IPROPS>({
    path,
    address,
    props,
    exact,
    strict,
}: LazyRouteProps<IPROPS>) {
    const Component = lazy(() => importPage(address));

    return (
        <Route
            path={path}
            strict={strict}
            exact={exact}
            render={() => 
                <Suspense fallback={<SelfBackDrop show progress />} >
                    <Component {...props} />
                </Suspense>
            }
        >
        </Route>
    )
};