import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export class Upload extends React.Component {
    
    async handleSubmit(e) {
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const body = document.getElementById('body').value;
        const self = this;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        e.preventDefault();
        await axios.post('/upload', {
            PostTitle: title,
            PostSubtitle: subtitle,
            PostBody: body,
            PostDate: date,
            PostTime: time,
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
            <div className="upload">
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        Its a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
        </div>
        )
    }
}

            // <div className="contact">
            //     {sessionStorage.getItem("loggedIn") &&
            //     <div>
            //         <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
            //             <div className="form-group">
            //                 <label htmlFor="title">Title</label>
            //                 <input type="text" className="form-control" id="title" autoComplete="off" required/>
            //             </div>
            //             <div className="form-group">
            //                 <label htmlFor="email">Subtitle</label>
            //                 <input type="text" className="form-control" id="subtitle" aria-describedby="emailHelp" required/>
            //             </div>
            //             <div className="form-group">
            //                 <label htmlFor="body">Body</label>
            //                 <textarea className="form-control" rows="5" id="body" required/>
            //             </div>
            //             <button type="submit" className="btn btn-primary">Submit</button>
            //         </form>
            //     </div>}
            // </div>
                        // <label htmlFor="exampleInputEmail1">Email</label>