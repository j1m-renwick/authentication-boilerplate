import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Button, Card, Error, Form, Input, Logo} from "../style/Forms";
import {useAuth} from "../context/auth";
import logoImg from "../images/logo.jpg";

function Login(props) {
    const {loggedIn, setLoggedIn} = useAuth()
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function postLogin() {
        console.log("sending login request...")
        // TODO update api to return a proper body response and not to rely on status
        fetch('/auth/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username": userName, "password": password})
        }).then(function(response) {
            // TODO save token from response
            setLoggedIn(response.status === 200);
            setIsError(response.status !== 200);
        }).catch(res => {
            setLoggedIn(false);
            setIsError(true);
        })
    }

    if(loggedIn) {
        console.log("logged in!");
        return <Redirect to="/admin"/>;
    }

    return (
        <Card>
            <Logo src={logoImg} />
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
            { isError &&<Error>The username or password provided were incorrect!</Error> }
        </Card>
    );
}

export default Login;