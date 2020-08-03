import React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./private/Admin";
import PrivateRoute from "./routing/PrivateRoute";
import {LinkHeaderContainer, LinkHeaderItem} from "./style/Styles";

function App() {

    return (
        <div className="App">
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
        </div>
    );
}

export default App;
