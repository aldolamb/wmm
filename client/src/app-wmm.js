import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Feed } from "./feed";
import logo from './img/wmm.png';
import { Shop } from "./shop";
import { Header } from "./header";
import { Contact } from "./contact";
import { SmokeFree } from "./smoke-free";
import { Subscribe } from "./subscribe";

const Intro = () => <a href="/feed"><img src={logo} alt="WMM" className="logo"/></a>;
const Error = () => <h1>404..</h1>;

export class WMM extends React.Component {
    render() {
        return (
            <div className="main">
                <Header/>
                <Router>
                    <Switch>
                        <Route path='/feed'         component={Feed} />
                        <Route path='/shop'         component={Shop} />
                        <Route path='/contact'      component={Contact} />
                        <Route path='/smoke-free'   component={SmokeFree} />
                        <Route path='/subscribe'    component={Subscribe} />
                        <Route exact path='/'       component={Intro} />
                        <Route path='*'             component={Error} />
                    </Switch>
                </Router>
            </div>
        )
    }
}