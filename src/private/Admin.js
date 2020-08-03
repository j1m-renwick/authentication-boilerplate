import React from "react";
import {BodyText, Button, Card} from "../style/Styles";
import {useStoreActions, useStoreState} from "easy-peasy";
import {getRequest} from "../api/util";

function Admin(props) {
    const username = useStoreState(state => state.username);
    const setUsername = useStoreActions(state => state.setUsername);
    const setLoggedIn = useStoreActions(actions => actions.setLoggedIn);

    function logOut() {
        getRequest(`/auth/logout?username=${username}`)
            .then(res => {
                if(res.status === 200) {
                    setLoggedIn(false);
                    setUsername(null);
                    console.log("logged out successfully.");
                } else {
                    console.error("logout api returned status", res.status, "- could not log out!")
                }
            }).catch(res => {
            console.error("logout api returned status", res.status, "- could not log out!")
        })
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