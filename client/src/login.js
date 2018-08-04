import React from 'react';
import axios from 'axios';
const firebase = require("firebase");

export class Login extends React.Component {
    async handleSubmit(e) {
        const password = document.getElementById('password').value;
        const self = this;
        e.preventDefault();
        // await axios.post('/login', {
        //     password: password
        // })
        //     .then(function (response) {
        //         if (response.data.msg === 'success') {
        //             // alert("Logged In");
        //             sessionStorage.setItem("loggedIn", true);
        //             self.props.history.push('/feed')
        //             // self.resetForm();
        //         } else if (response.data.msg === 'fail') {
        //             sessionStorage.setItem("loggedIn", false);
        //             // alert("Log In Failed")
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        firebase.auth().signInWithEmailAndPassword('jlamberti2015@gmail.com', password)
            .then(function() {
                sessionStorage.setItem("loggedIn", true);
                self.props.history.push('/feed')
                // req.session.loggedIn = true;
                // res.json({
                //     msg: 'success'
                // })
            })
            .catch(function(error) {
                sessionStorage.setItem("loggedIn", false);
                alert("Log In Failed")
                // req.session.loggedIn = false;
                // res.json({
                //     msg: 'fail'
                // })
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