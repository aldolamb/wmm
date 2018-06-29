import React from 'react';
import Home from 'react-icons/lib/md/home';
import Money from 'react-icons/lib/md/attach-money';
import Mail from 'react-icons/lib/md/mail';
import SmokeFree from 'react-icons/lib/md/smoke-free';
import Subscribe from 'react-icons/lib/md/notifications';
import Clear from 'react-icons/lib/md/close';


import logo from './img/wmm.png';
const Intro = <div style={{width: "100%"}}><a href="/feed"><img src={logo} alt="WMM" className="logo"/></a></div>;

export class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    {/*<a href="/feed"><Home/></a>*/}
                    {/*<a href="/shop"><Money/></a>*/}
                    {/*<a href="/contact"><Mail/></a>*/}
                    {/*<a href="/subscribe"><Subscribe/></a>*/}
                    {/*<a href="/"><Clear/></a>*/}

                    <a href="/feed">Home</a>
                    <a href="/shop">Shop</a>
                    <a href="/contact">Contact</a>

                    {/*<div className="iconTest">*/}
                        {/*<div className="top"></div>*/}
                        {/*<div className="right"></div>*/}
                        {/*<div className="bottom"></div>*/}
                        {/*<div className="left"></div>*/}
                    {/*</div>*/}
                </div>
                {Intro}
            </div>
        )
    }
}