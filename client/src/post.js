import React from 'react';
import axios from "axios/index";
// import { Document, Page } from 'react-pdf';
const firebase = require("firebase");

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
        // axios.post('https://us-central1-wmmdata-42f0b.cloudfunctions.net/singlePost', {
        //     postID: self.state.postID
        // })
        //     .then(function (response) {
        //         if (response.data) {
        //             self.setState({data: response.data});
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // const data = [];
        firebase.database().ref('Posts').child(this.state.postID).once('value', function(snapshot) {
            self.setState({data: snapshot.val()});
        });
    }

    range(pages) {
        return Array(pages).fill().map((_, idx) => 1 + idx)
    }

    async handleDelete() {
        // e.preventDefault();
        let self = this;
        await axios.post('/delete', {
            PostKey: self.state.postID
        })
            .then(function (response) {
                if (response.data.msg === 'success') {
                    self.props.history.push('/feed');
                    console.log("success")
                } else if (response.data.msg === 'fail') {
                    alert("Failed to delete.")
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
                {/* <p>{this.state.data.Body}</p> */}
               
                <p dangerouslySetInnerHTML={{ __html: this.state.data.Body }}/>
                {sessionStorage.getItem("loggedIn") &&
                <div className="tools">
                    <button><a href={`/feed/edit/${this.state.postID}`}>Edit</a></button>
                    <button onClick={() => window.confirm("Are you absolutely positive you want to delete this?\nIt will be gone forever.") && this.handleDelete()}>Delete</button>
                </div>
                }
            </div>
        )
    }
}

                // {this.state.data.PDF ? <p><Document file={"https://firebasestorage.googleapis.com/v0/b/wmmdata-42f0b.appspot.com/o/sample.pdf?alt=media&token=0a35a15d-49b8-4e07-b554-e8e7211d7747"} onLoadSuccess={this.onDocumentLoad}>{this.range(this.state.data.Pages).map(page => (<Page pageNumber={page} />))}</Document></p> :
                // <p dangerouslySetInnerHTML={{ __html: this.state.data.Body }}/>}