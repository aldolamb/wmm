import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Zines } from "./zines";
import { Header } from "./header";
import { Footer } from "./footer";
import { Main } from "./main";

export class WMM extends React.Component {
    render() {
        return (
            <div className="main">
                <Header/>
                    <Router>
                        <Switch>
                            <Route path='/zines'                component={Zines} />
                            <Route exact path='/'               component={Main} />
                        </Switch>
                    </Router>
                <Footer/>
            </div>
        )
    }
}