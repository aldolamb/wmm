import React from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export class Contact extends React.Component {
    async handleSubmit(e) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const self = this;
        e.preventDefault();
        alert("Failed to send");
        // await axios.post('/send', {
        //     name: name,
        //     email: email,
        //     messsage: message
        // })
        //     .then(function (response) {
        //         if (response.data.msg === 'success') {
        //             alert("Message Sent.");
        //             self.resetForm();
        //         } else if (response.data.msg === 'fail') {
        //             alert("Message failed to send.")
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    static resetForm () {
        document.getElementById('contact-form').reset();
    }

    render () {
        return (
            <div className="contact">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" autoComplete="off" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}