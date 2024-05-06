import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { MainStateManager } from 'models';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout, LoginPage } from 'layouts';
import { useForceUpdate } from 'utilities';

interface RedirectingProps {
    mainStateManager: MainStateManager;
}

export const Redirecting: React.FC<RedirectingProps> = ({
    mainStateManager
}) => {
    let history = useHistory();
    let forceUpdate = useForceUpdate();

    useEffect(() => {
        mainStateManager.Eventing.on('redirectToLogin', () => {
            if (history) {
                history.replace('/auth');
            }
            forceUpdate();
        });

        return () => {
            mainStateManager.Eventing.remove('redirectToLogin');
        }
    }, [mainStateManager, history, forceUpdate]);

    return (
        <Router>
            <Switch>
                <Route path='/auth' >
                    <LoginPage mainFactory={mainStateManager.Usering.Login} />
                    {/* <AppLayout mainStateManager={mainStateManager} /> */}
                </Route>
                <ProtectedRoute
                    condition={mainStateManager.Usering.isAthentication}
                    component={<AppLayout mainStateManager={mainStateManager} />}
                    failurePath='/auth'
                    rest={{
                        path: '*'
                    }}
                />
                <Route path='*' component={() => <h1>404 Not Found</h1>} />
            </Switch>
        </Router>
    )
}
