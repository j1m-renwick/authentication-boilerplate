import React, {useEffect, useState} from "react";
import {Button, Card, Error, Form, Input, Logo} from "../style/Styles";
import logoImg from "../images/logo.jpg";
import {useStoreState} from 'easy-peasy';
import {useStoreActions} from 'easy-peasy';
import {useHistory} from "react-router-dom";

function Login(props) {

    //pushing to the history is the same as a router Redirect component
    const history = useHistory();

    const loggedIn = useStoreState(state => state.loggedIn);
    const setLoggedIn = useStoreActions(actions => actions.setLoggedIn);

    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(loggedIn) {
            // TODO make this a generic redirect based on the link clicked
            console.log("already authenticated, redirecting to admin..")
            history.push("/admin")
        }
    }, [history, loggedIn])

    function postLogin() {
        console.log("sending login request...")
        // TODO update api to return a proper body response and not to rely on status
        fetch('/auth/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify({"username": userName, "password": password})
        }).then(res => {
            // token cookie is saved by the browser here - any future requests to
            // the domain will include it by default.
            let success = res.status === 200
            setLoggedIn(success);
            setIsError(!success);
            if (success) {
                history.push("/admin");
            }
        // }).then(() => {
        //     return fetch('/auth/validate', {
        //         method: 'get',
        //         credentials: "same-origin"
        //     })
        // }).then(res => {
        //     console.log("Finished calling /validate");
        }).catch(res => {
            setLoggedIn(false);
            setIsError(true);
        })
    }

    return (
        <Card>
            <h1>Login Page</h1>
            <Logo src={logoImg}/>
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            {isError && <Error>The username or password provided was incorrect</Error>}
        </Card>
    );
}

export default Login;