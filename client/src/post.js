import React from 'react';
import axios from "axios/index";
import { Document, Page } from 'react-pdf';

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

    range(pages) {
        return Array(pages).fill().map((_, idx) => 1 + idx)
    }

    render() {
        return (
            <div className="postPage">
                {/*<h4 className="date">{this.state.data.Date}</h4>*/}
                {/*<h4 className="time">{this.state.data.Time}</h4>*/}
                <h2>{this.state.data.Title}</h2>
                <h3>{this.state.data.Subtitle}</h3>
                <h4>{this.state.data.Date} {this.state.data.Time}</h4>
                {/* <p>{this.state.data.Body}</p> */}
                {this.state.data.PDF ? <p><Document file={"https://firebasestorage.googleapis.com/v0/b/wmmdata-42f0b.appspot.com/o/sample.pdf?alt=media&token=0a35a15d-49b8-4e07-b554-e8e7211d7747"} onLoadSuccess={this.onDocumentLoad}>{this.range(this.state.data.Pages).map(page => (<Page pageNumber={page} />))}</Document></p> :
                <p dangerouslySetInnerHTML={{ __html: this.state.data.Body }}/>}
            </div>
        )
    }
}