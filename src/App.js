import React, {useState} from 'react';
import {AuthContext} from "./context/auth";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./private/Admin";
import PrivateRoute from "./routing/PrivateRoute";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            {/*// TODO replace context API with redux */}
            <AuthContext.Provider value={{loggedIn, setLoggedIn: setLoggedIn}}>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home Page</Link>
                            </li>
                            <li>
                                <Link to="/login">Login Page</Link>
                            </li>
                        </ul>
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
