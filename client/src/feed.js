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
            <p>Subjectadsfasdfalsdkfjahsdlf</p>
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