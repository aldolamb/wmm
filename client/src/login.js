import React from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export class Login extends React.Component {
    async handleSubmit(e) {
        const password = document.getElementById('password').value;
        const self = this;
        e.preventDefault();
        await axios.post('/login', {
            password: password
        })
            .then(function (response) {
                if (response.data.msg === 'success') {
                    // alert("Logged In");
                    sessionStorage.setItem("loggedIn", true);
                    self.resetForm();
                } else if (response.data.msg === 'fail') {
                    sessionStorage.setItem("loggedIn", false);
                    // alert("Log In Failed")
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
                        <input type="password" className="form-control" id="password" autoComplete="off" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
                        // <label htmlFor="exampleInputEmail1">Email</label>