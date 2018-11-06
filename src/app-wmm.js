import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Zines } from "./zines";
import { Header } from "./header";
import { Footer } from "./footer";
import { Main } from "./main";

// import firebase from "firebase";
// const config = {
//     apiKey: "AIzaSyDNJbRL7IkdkxZ1bxc2faMH3AMmK0H0cvk",
//     authDomain: "wmmdata-42f0b.firebaseapp.com",
//     databaseURL: "https://wmmdata-42f0b.firebaseio.com",
//     projectId: "wmmdata-42f0b",
//     storageBucket: "wmmdata-42f0b.appspot.com",
//     messagingSenderId: "16374020327"
// };
// firebase.initializeApp(config);


export class WMM extends React.Component {
    render() {
        return (
            <div className="main">
                <Header/>
                <Router>
                    {/*{sessionStorage.getItem("loggedIn") ?*/}
                    {/*<Switch>*/}
                        {/*<Route path='/feed/edit/:postID'    component={Edit} />*/}
                        {/*<Route path='/feed/:postID'         component={Post} />*/}
                        {/*<Route path='/feed'                 component={Feed} />*/}
                        {/*<Route path='/shop'                 component={Shop} />*/}
                        {/*<Route path='/contact'              component={Contact} />*/}
                        {/*<Route path='/upload'               component={Upload} />*/}
                        {/*<Route path='/login'                component={Login} />*/}
                        {/*<Route exact path='/'               component={Main} />*/}
                        {/*<Route path='*'                     component={Error} />*/}
                    {/*</Switch> :*/}
                    {/*<Switch>*/}
                        {/*<Route path='/upload'               component={Upload} />*/}
                        {/*<Route path='/feed/:postID'         component={Post} />*/}
                        {/*<Route path='/feed'                 component={Feed} />*/}
                        {/*<Route path='/zines'                component={Zines} />*/}
                        {/*<Route path='/contact'              component={Contact} />*/}
                        {/*<Route path='/login'                component={Login} />*/}
                        {/*<Route exact path='/'               component={Main} />*/}
                        {/*<Route path='*'                     component={Error} />*/}
                    {/*</Switch>*/}
                    {/*}*/}
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