import React from 'react';
import axios from "axios/index";

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            postID: props.match.params.postID
        };
    }

    componentWillMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let self = this;
        axios.post('/singlePost', {
            postID: self.state.postID
        })
            .then(function (response) {
                if (response.data) {
                    self.setState({data: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="postPage">
                {/*<h4 className="date">{this.state.data.Date}</h4>*/}
                {/*<h4 className="time">{this.state.data.Time}</h4>*/}
                <h2>{this.state.data.Title}</h2>
                <h3>{this.state.data.Subtitle}</h3>
                <h4>{this.state.data.Date} {this.state.data.Time}</h4>
                <p>{this.state.data.Body}</p>
            </div>
        )
    }
}