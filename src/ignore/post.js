import React from 'react';
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
        firebase.database().ref('Posts').child(this.state.postID).once('value', function(snapshot) {
            self.setState({data: snapshot.val()});
        });
    }

    async handleDelete() {
        firebase.database().ref('Posts/' + this.state.postID).remove();
        this.props.history.push('/feed/' + this.state.postID);
    }

    render() {
        return (
            <div className="postPage">
                <h2>{this.state.data.Title}</h2>
                <h3>{this.state.data.Subtitle}</h3>
                <h4>{this.state.data.Date} {this.state.data.Time}</h4>
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