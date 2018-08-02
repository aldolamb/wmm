import React from 'react';
import axios from "axios/index";
// import Edit from 'react-icons/lib/md/edit';
// import Delete from 'react-icons/lib/md/delete';
import { Document, Page } from 'react-pdf';

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
        axios.post('/singlePost', {
            postID: self.state.postID
        })
            .then(function (response) {
                if (response.data) {
                    self.setState({data: response.data});
                    console.log(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    range(pages) {
        return Array(pages).fill().map((_, idx) => 1 + idx)
    }

    async handleSubmit(e) {
        const postID = this.state.postID;
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        // const file = document.getElementById('file').value;
        const body = document.getElementById('body').value
            .toString().replace(/"\n"/g, "\b");
        const self = this;
        e.preventDefault();

        const date = this.state.data.Date;
        const time = this.state.data.Time;
        await axios.post('/save', {
            PostKey: postID,
            PostTitle: title,
            PostSubtitle: subtitle,
            // PostFile: file,
            PostBody: body,
            PostDate: date,
            PostTime: time,
        })
            .then(function (response) {
                if (response.data.msg === 'success') {
                    self.props.history.push('/feed/' + postID);
                    console.log("success")
                } else if (response.data.msg === 'fail') {
                    alert("Failed to save.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChange(e) {
        let dataCopy = JSON.parse(JSON.stringify(this.state.data))
        dataCopy[e.target.name] = e.target.value;
        this.setState({data: dataCopy});
    }

    render() {
        return (
            <div className="postPage">
                {/*<h4 className="date">{this.state.data.Date}</h4>*/}
                {/*<h4 className="time">{this.state.data.Time}</h4>*/}
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
                        {/*<div className="form-group">*/}
                            {/*<label htmlFor="file">File</label>*/}
                            {/*<input style={{border: 'none'}}type="file" className="form-control" id="file" aria-describedby="emailHelp"/>*/}
                        {/*</div>*/}
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" rows="5" id="body" required
                                      name="Body" value= {this.state.data.Body} onChange={(value) => this.onChange(value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
                {/*<h2><input value={this.state.data.Title}/></h2>*/}
                {/*<h3><input value={this.state.data.Subtitle}/></h3>*/}
                {/*<h4>{this.state.data.Date} {this.state.data.Time}</h4>*/}
                {/*/!* <p>{this.state.data.Body}</p> *!/*/}
                {/*{this.state.data.PDF ? <p><Document file={"https://firebasestorage.googleapis.com/v0/b/wmmdata-42f0b.appspot.com/o/sample.pdf?alt=media&token=0a35a15d-49b8-4e07-b554-e8e7211d7747"} onLoadSuccess={this.onDocumentLoad}>{this.range(this.state.data.Pages).map(page => (<Page pageNumber={page} />))}</Document></p> :*/}
                {/*<textarea value= {this.state.data.Body}/>}*/}
                {/*<div className="tools">*/}
                    {/*<button><a href={`/feed/edit/${this.state.postID}`}>Save</a></button>*/}
                    {/*/!*<button><a href="#">Delete</a></button>*!/*/}
                {/*</div>*/}
            </div>
        )
    }
}