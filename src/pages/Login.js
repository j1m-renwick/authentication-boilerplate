import React, {useState} from "react";
import {Button, Card, Error, Form, Input, Logo} from "../style/Styles";
import logoImg from "../images/logo.jpg";
import {useStoreActions} from 'easy-peasy';
import {useHistory} from "react-router-dom";
import {postRequest} from "../api/util";

function Login() {

    //pushing to the history is the same as a router Redirect component
    const history = useHistory();

    const setLoggedIn = useStoreActions(actions => actions.setLoggedIn);
    const setUsername = useStoreActions(actions => actions.setUsername);

    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function postLogin() {
        console.log("sending login request...")
        postRequest('/auth/login', {"username": userName, "password": password})
            .then(res => {
                // token cookie is saved by the browser here - any future requests to
                // the domain will include it by default.
                let success = res.status === 200
                setLoggedIn(success);
                setIsError(!success);
                if(success) {
                    setUsername(userName);
                    history.push("/admin");
                }
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