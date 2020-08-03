import React, {useState} from 'react';
import {AuthContext} from "./context/auth";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./private/Admin";
import PrivateRoute from "./routing/PrivateRoute";
import {LinkHeaderContainer, LinkHeaderItem} from "./style/Styles";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            {/*// TODO replace context API with redux */}
            <AuthContext.Provider value={{loggedIn, setLoggedIn: setLoggedIn}}>
                <Router>
                    <div>
                        <LinkHeaderContainer>
                            <LinkHeaderItem>
                                <Link to="/">Home Page</Link>
                            </LinkHeaderItem>
                            <LinkHeaderItem>
                                <Link to="/admin">Admin Page</Link>
                            </LinkHeaderItem>
                        </LinkHeaderContainer>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <PrivateRoute path="/admin" component={Admin}/>
                    </div>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
