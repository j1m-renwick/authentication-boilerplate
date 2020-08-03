import React from "react";
import {useAuth} from "../context/auth";
import {BodyText, Button, Card} from "../style/Styles";

function Admin(props) {
    const {setLoggedIn} = useAuth();

    function logOut() {
        // TODO delete cookie and send api call to logout of express session - read
        // https://stackoverflow.com/questions/27010013/express-session-vs-passportjs-session#:~:text=session%20has%20to%20be%20used%20after%20express.&text=session%20middleware%20is%20to%20deserialize,and%20stored%20in%20the%20session.
        console.log("logged out!")
        setLoggedIn(false);
    }

    return (
        <Card>
            <h1>
                Admin Page
            </h1>
            <BodyText>
                Wow! A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to
                freebase. Do a flip! Dear God, they'll be killed on our doorstep! And there's no trash pickup until
                January 3rd.
                <br/>
                <br/>
                Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you! That's
                not soon enough! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his
                wife holding up? …To shreds, you say.
                <br/>
                <br/>
                Why am I sticky and naked? Did I miss something fun? Ah, yes! John Quincy Adding Machine. He struck a
                chord with the voters when he pledged not to go on a killing spree. That's a popular name today. Little
                "e", big "B"?
            </BodyText>
            <Button onClick={logOut}>Log out</Button>
        </Card>
    );
}

export default Admin;