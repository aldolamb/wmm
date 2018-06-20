import React from 'react';
import Home from 'react-icons/lib/md/home';
import Money from 'react-icons/lib/md/attach-money';
import Mail from 'react-icons/lib/md/mail';
import SmokeFree from 'react-icons/lib/md/smoke-free';
import Subscribe from 'react-icons/lib/md/notifications';
import Clear from 'react-icons/lib/md/close';

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <a href="/feed"><Home/></a>
                <a href="/shop"><Money/></a>
                <a href="/contact"><Mail/></a>
                {/*<a href="/smoke-free"><SmokeFree/></a>*/}
                <a href="/subscribe"><Subscribe/></a>
                <a href="/"><Clear/></a>
            </div>
        )
    }
}