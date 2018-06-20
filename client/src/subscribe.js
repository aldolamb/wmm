import React from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export class Subscribe extends React.Component {
    async handleSubmit(e) {
        const email = document.getElementById('email').value;
        const self = this;
        e.preventDefault();
        await axios.post('/subscribe', {
            email: email
        })
            .then(function (response) {
                if (response.data.msg === 'success') {
                    alert("Message Sent.");
                    self.resetForm();
                } else if (response.data.msg === 'fail') {
                    alert("Message failed to send.")
                } else {
                    alert(response.data.msg);
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
            <div className="contact">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
            </div>
        )
    }
}