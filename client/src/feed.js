import React from 'react';
import axios from "axios";

export class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.loadFeed       = this.loadFeed.bind(this);
        this.createItems    = this.createItems.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let self = this;
        axios.post('/feed', {
            params: {
            }
        })
            .then(function (response) {
                if (response.data)
                    self.setState({data: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    createItems = (item) => (
        <div key={item.Title}>
            <h3>{item.Title}</h3>
            <h4>{item.Subtitle}</h4>
            <p dangerouslySetInnerHTML={{ __html: item.Body }}></p>
        </div>
    );

    async handleSubmit(e) {
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const body = document.getElementById('body').value;
        const self = this;
        e.preventDefault();
        await axios.post('/upload', {
            PostTitle: title,
            PostSubtitle: subtitle,
            PostBody: body
        })
            .then(function (response) {
                if (response.data.msg === 'success') {
                    alert("Message Sent.");
                    self.resetForm();
                } else if (response.data.msg === 'fail') {
                    alert("Message failed to send.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static resetForm () {
        document.getElementById('contact-form').reset();
    }

    render () {
        return (
            <div className="feed">
                {sessionStorage.getItem("loggedIn") &&
                <div>
                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Subtitle</label>
                            <input type="text" className="form-control" id="subtitle" aria-describedby="emailHelp" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" rows="5" id="body" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>}
                
                {Object.values(this.state.data).map(this.createItems)}
            </div>
        )
    }
}