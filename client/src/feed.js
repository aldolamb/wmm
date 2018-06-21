import React from 'react';
import axios from "axios";

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

const temp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.<iframe src=\"https://open.spotify.com/embed/track/0Uo7n867Ypq7t9L6GxMOWn\" width=\"100%\" frameBorder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>";
export class Feed extends React.Component {
    createItems = (item) => (
        <div key={item}>
            <h2>{item}</h2>
            <p dangerouslySetInnerHTML={{ __html: temp }}></p>
        </div>
    );

    async handleSubmit(e) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const self = this;
        e.preventDefault();
        await axios.post('/send', {
            name: name,
            email: email,
            messsage: message
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
                {items.map((val) => this.createItems(val))}
            </div>
        )
    }
}