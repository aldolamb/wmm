import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Feed } from "./feed";
import { Post } from "./post";
import logo from './img/wmm.png';
import logo2 from './img/logo2.png';
import logo3 from './img/logo3.png';
import logoGif from './img/logo.gif';
import { Shop } from "./shop";
import { Header } from "./header";
import { Contact } from "./contact";
import { SmokeFree } from "./smoke-free";
import { Subscribe } from "./subscribe";
import { Login } from "./login";
import { Upload } from "./upload";

const Intro = () => <div style={{width: "100%", backgroundColor: "black"}}><a href="/feed"><img src={logo3} alt="WMM" className="logo"/></a></div>;
const Error = () => <h1>404..</h1>;

export class WMM extends React.Component {
    // componentWillUnmount() {
    //     axios.post('/log_out')
    //         .catch(function(error) {
    //             if (error)
    //                 console.log(error);
    //         });
    // }

    componentDidMount() {
        window.addEventListener('onclose', () =>{
            axios.post('/log_out')
                .catch(function(error) {
                    if (error)
                        console.log(error);
                });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('onclose', "")
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <Router>
                    <Switch>
                        <Route path='/feed/:postID'     component={Post} />
                        <Route path='/feed'         component={Feed} />
                        <Route path='/shop'         component={Shop} />
                        <Route path='/contact'      component={Contact} />
                        <Route path='/smoke-free'   component={SmokeFree} />
                        <Route path='/subscribe'    component={Subscribe} />
                        <Route path='/login'        component={Login} />
                        <Route path='/upload'       component={Upload} />
                        <Route exact path='/'       component={Intro} />
                        <Route path='*'             component={Error} />
                    </Switch>
                </Router>
            </div>
        )
    }
}