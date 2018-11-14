import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Zines } from "./zines";
import { Zine } from "./zine";
import { Store } from "./store";
import { Header } from "./header";
import { Footer } from "./footer";
import { Main } from "./main";
import "./ignore/firebaseConfig";

export class WMM extends React.Component {
    render() {
        return (
            <div className="main">
                <Header/>
                    <Router>
                        <Switch>
                            <Route path='/zines/:zineID'        component={Zine} />
                            <Route path='/zines'                component={Zines} />
                            <Route path='/store'                component={Store} />
                            <Route exact path='/'               component={Main} />
                        </Switch>
                    </Router>
                <Footer/>
            </div>
        )
    }
}