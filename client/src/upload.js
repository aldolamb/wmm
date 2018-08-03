import React from 'react';
import axios from 'axios';

export class Upload extends React.Component {
    
    async handleSubmit(e) {
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        // const file = document.getElementById('file').value;
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

    async uploadFile() {
        console.log("egg");
        const file = document.getElementById('file').value;
        console.log(file);
        const self = this;
        await axios.post('/uploadFile', {
            File: file,
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

    render () {
        return (
            <div className="upload">
                {/*{sessionStorage.getItem("loggedIn") &&*/}
                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Subtitle</label>
                            <input type="text" className="form-control" id="subtitle" aria-describedby="emailHelp" required/>
                        </div>
                        {/*<div className="form-group">*/}
                            {/*<label htmlFor="file">File</label>*/}
                            {/*<input style={{border: 'none'}}type="file" className="form-control" id="file" aria-describedby="emailHelp"/>*/}
                        {/*</div>*/}
                        <div className="form-group">
                            <div className="toolBar">
                                <input style={{border: 'none'}}type="file" className="form-control" id="file" aria-describedby="emailHelp"/>
                                <button onClick= {() => this.uploadFile}>Add Image</button>
                                <button>Add PDF</button>
                            </div>
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" rows="5" id="body" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                {/*}*/}
            </div>
        )
    }
}


                        // <label htmlFor="exampleInputEmail1">Email</label>