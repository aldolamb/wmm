import React from 'react';
const firebase = require("firebase");

export class Upload extends React.Component {
    state = {
        selectedFile: null
    }
    
    async handleSubmit(e) {
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const body = document.getElementById('body').value;
        const self = this;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        e.preventDefault();

        firebase.database().ref('Posts').push({
            Title: title,
            Subtitle: subtitle,
            Body: body,
            Date: date,
            Time: time,
        }, function(error) {
            if (error) 
                alert("Failed to save.");
            else 
                self.props.history.push('/feed');
            
        });
    }

    static resetForm () {
        document.getElementById('contact-form').reset();
    }


    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        let file = this.state.selectedFile;
        let filename = file.name;
        let imageStorage = firebase.storage().ref(filename);
        let uploadTask = imageStorage.put(file);
        
        uploadTask.on('state_changed', function(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            window.alert("Unauthorized or file is larger than 50kb");
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                let add = "";
                if (filename.split('.').pop() === 'pdf') 
                    add = '<button><a href="' + downloadURL + '">Open Zine</a></button>';
                else 
                    add = '<img src="' + downloadURL + '" alt="Montecito Album Cover">';
                document.getElementById('body').value += add;
            });
        });
    }

    render () {
        return (
            <div className="upload">
                {sessionStorage.getItem("loggedIn") &&
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
                            <div className="toolBar">
                                <label><input onChange={this.fileSelectedHandler} type="file" className="form-control" id="file"/></label>
                                <button type="button" onClick= {this.fileUploadHandler}>Add Image</button>
                            </div>
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" rows="5" id="body" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                }
            </div>
        )
    }
}


                        // <label htmlFor="exampleInputEmail1">Email</label>