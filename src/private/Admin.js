import React from "react";
import { useAuth } from "../context/auth";
import {Button, Card, Form} from "../style/Forms";

function Admin(props) {
    const { setLoggedIn } = useAuth();

    function logOut() {
        // TODO send api call to logout of express session - read
        // https://stackoverflow.com/questions/27010013/express-session-vs-passportjs-session#:~:text=session%20has%20to%20be%20used%20after%20express.&text=session%20middleware%20is%20to%20deserialize,and%20stored%20in%20the%20session.
        console.log("logged out!")
        setLoggedIn(false);
    }

    return (
        <Card>
            <Form>Admin Page</Form>
            <Button onClick={logOut}>Log out</Button>
        </Card>
    );
}

export default Admin;