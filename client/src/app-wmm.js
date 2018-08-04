import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Feed } from "./feed";
import { Post } from "./post";
import { Edit } from "./edit";
import { Shop } from "./shop";
import { Header } from "./header";
import { Contact } from "./contact";
import { Login } from "./login";
import { Upload } from "./upload";
import logo from './img/wmm.png';

import firebase from "firebase";
const config = {
    apiKey: "AIzaSyDNJbRL7IkdkxZ1bxc2faMH3AMmK0H0cvk",
    authDomain: "wmmdata-42f0b.firebaseapp.com",
    databaseURL: "https://wmmdata-42f0b.firebaseio.com",
    projectId: "wmmdata-42f0b",
    storageBucket: "wmmdata-42f0b.appspot.com",
    messagingSenderId: "16374020327"
};
firebase.initializeApp(config);

const Intro = () => <div style={{width: "100%"}}><a href="/feed"><img src={logo} alt="WMM" className="logo"/></a></div>;
const Error = () => <h1>404..</h1>;
const Home = () => <div></div>;

export class WMM extends React.Component {
    componentDidMount() {
        window.addEventListener('onbeforeunload', () =>{
            axios.post('/log_out')
                .catch(function(error) {
                    if (error)
                        console.log(error);
                });
        });
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <Router>
                    {sessionStorage.getItem("loggedIn") ?
                    <Switch>
                        <Route path='/feed/edit/:postID'    component={Edit} />
                        <Route path='/feed/:postID'         component={Post} />
                        <Route path='/feed'                 component={Feed} />
                        <Route path='/shop'                 component={Shop} />
                        <Route path='/contact'              component={Contact} />
                        <Route path='/upload'               component={Upload} />
                        <Route path='/login'                component={Login} />
                        <Route exact path='/'               component={Intro} />
                        <Route path='*'                     component={Error} />
                    </Switch> :
                    <Switch>
                        <Route path='/upload'               component={Upload} />
                        <Route path='/feed/:postID'         component={Post} />
                        <Route path='/feed'                 component={Feed} />
                        <Route path='/shop'                 component={Shop} />
                        <Route path='/contact'              component={Contact} />
                        <Route path='/login'                component={Login} />
                        <Route exact path='/'               component={Intro} />
                        <Route path='*'                     component={Error} />
                    </Switch>
                    }
                </Router>
            </div>
        )
    }
}

{sessionStorage.getItem("loggedIn") &&
                        <Switch>
                            <Route path='/upload'            component={Upload} />
                        </Switch>
                        }