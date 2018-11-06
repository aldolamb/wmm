import React from 'react';
const firebase = require("firebase");

export class Edit extends React.Component {
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

    async handleSubmit(e) {
        const postID = this.state.postID;
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const body = document.getElementById('body').value
            .toString().replace(/"\n"/g, "\b");
        const self = this;
        e.preventDefault();

        const date = this.state.data.Date;
        const time = this.state.data.Time;

        firebase.database().ref('Posts/' + postID).set({
            Title: title,
            Subtitle: subtitle,
            Body: body,
            Date: date,
            Time: time,
        }, function(error) {
            if (error) 
                alert("Failed to save.");
            else 
                self.props.history.push('/feed/' + postID);
            
        });
    }

    onChange(e) {
        let dataCopy = JSON.parse(JSON.stringify(this.state.data))
        dataCopy[e.target.name] = e.target.value;
        this.setState({data: dataCopy});
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

    render() {
        return (
            <div className="postPage">
                <div>
                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" autoComplete="off" required
                                   name="Title" value={this.state.data.Title} onChange={(value) => this.onChange(value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Subtitle</label>
                            <input type="text" className="form-control" id="subtitle" aria-describedby="emailHelp" required
                                   name="Subtitle" value={this.state.data.Subtitle} onChange={(value) => this.onChange(value)}/>
                        </div>
                        <div className="form-group">
                            <div className="toolBar">
                                <label><input onChange={this.fileSelectedHandler} type="file" className="form-control" id="file"/></label>
                                <button type="button" onClick= {this.fileUploadHandler}>Add Image</button>
                            </div>
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" rows="5" id="body" required
                                      name="Body" value= {this.state.data.Body} onChange={(value) => this.onChange(value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}