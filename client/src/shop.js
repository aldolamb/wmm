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

export class Shop extends React.Component {
    createItems = (item) => (
        <div key={item}>
            <div className="overlay">
                <div className="text">
                    <p>{item}</p>
                    <p style={{borderBottom: "1px solid #ffffff"}}/>
                    <p>$40</p>
                </div>
            </div>
        </div>
    );

    render () {
        return (
            <div className="shop">
                {items.map((val) => this.createItems(val))}
            </div>
        )
    }
}