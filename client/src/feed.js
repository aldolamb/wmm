import React from 'react';

const items =
    [1
    ,2
    ,3
    ,4
    ,5
    ,6
    ,7
    ,8
    ,9
    ,10
    ,11
    ,12
    ,13
    ,14
    ,15];

export class Feed extends React.Component {
    createItems = (item) => (
        <div key={item}>
            <h2>{item}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    );

    render () {
        return (
            <div className="feed">
                {items.map((val) => this.createItems(val))}
            </div>
        )
    }
}