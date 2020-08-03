import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useStoreState} from "easy-peasy";

function PrivateRoute({ component: Component, ...rest }) {
    const loggedIn = useStoreState(state => state.loggedIn);

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/login"}}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;