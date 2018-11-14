import React from 'react';
import { ReleaseDate } from "./releaseDate";

export class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="shop">
                <ReleaseDate/>
            </div>
        )
    }
}