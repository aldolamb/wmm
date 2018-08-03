import React from 'react';
import axios from 'axios';

export class Upload extends React.Component {
    state = {
        selectedFile: null
    }
    
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


    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        // let self = this;
        console.log(fd);
        const fd = new FormData();
        fd.append('image', this.state.selectedFile);
        axios.post('/uploadImage', fd)
                .then(function (response) {
                    if (response.data.msg === 'success') {
                        alert("Message Sent.");
                        // self.resetForm();
                    } else if (response.data.msg === 'fail') {
                        alert("Message failed to send.")
                    } else {
                        console.log(response.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
    }


    // async uploadFile() {
    //     // const file = document.getElementById('file').files[0];
    //     const file = new Blob([document.getElementById('file').files[0]], { type: 'image/jpg' });
    //     // const file = new Blob([files[0]], { type: 'image/png' });
    //     let formData = new FormData();
    //     formData.append("image", file);
    //     console.log(formData);
    //     const self = this;
    //     // axios.post('uploadImage', formData, {
    //     //     headers: {
    //     //         'Content-Type': 'multipart/form-data'
    //     //     }
    //     // })
    //     axios.post('/uploadImage', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(function (response) {
    //             if (response.data.msg === 'success') {
    //                 alert("Message Sent.");
    //                 // self.resetForm();
    //             } else if (response.data.msg === 'fail') {
    //                 alert("Message failed to send.")
    //             } else {
    //                 console.log(response.data.msg);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //
    //     // const file = document.getElementById('file').files[0];
    //     // console.log(file);
    //     // const self = this;
    //     // await axios.post('/uploadImage', {
    //     //     Name: "egg",
    //     //     File: file,
    //     // })
    //     //     .then(function (response) {
    //     //         if (response.data.msg === 'success') {
    //     //             alert("Message Sent.");
    //     //             // self.resetForm();
    //     //         } else if (response.data.msg === 'fail') {
    //     //             alert("Message failed to send.")
    //     //         } else {
    //     //             console.log(response.data.msg);
    //     //         }
    //     //     })
    //     //     .catch(function (error) {
    //     //         console.log(error);
    //     //     });
    // }

    render () {
        // document.getElementById("file").onchange = function() {
        //     // document.getElementById("form").submit();
        //     console.log("added" + document.getElementById("form").value)
        // };

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
                                <label><input onChange={this.fileSelectedHandler} type="file" className="form-control" id="file"/></label>
                                <button onClick= {this.fileUploadHandler}>Add Image</button>
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