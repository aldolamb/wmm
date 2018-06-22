import React from 'react';
import axios from "axios";
// import { Document, Page } from 'react-pdf';

export class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: true,
            lastVisible: ""
        };

        this.loadFeed       = this.loadFeed.bind(this);
        this.createItems    = this.createItems.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let self = this;
        self.setState({isLoaded: false});
        axios.post('/feed')
            .then(function (response) {
                if (response.data) {
                    self.setState({data: response.data.data});
                    self.setState({lastVisible: response.data.lastVisible, isLoaded: true});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 250) &&
            this.state.data.length && this.state.isLoaded
        ) {
            this.loadMore();
        }
    }

    async loadMore() {
        let self = this;
        self.setState({isLoaded: false});
        axios.post('/loadMore', {
            lastVisible: self.state.lastVisible
        })
            .then(function (response) {
                if (response.data.data.length > 0) {
                    self.setState({data: self.state.data.concat(response.data.data)});
                    self.setState({lastVisible: response.data.lastVisible, isLoaded: true})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    currentDate() {
        const today = new Date();
        return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }

    createDays = (day) => (
        <div key={day[0]}>
            <p className="date">{day[0] === this.currentDate() ? "Today" : day[0]}</p>
            {day[1].map(this.createItems)}
        </div>
    );

    createItems = (item) => (
        <a key={item.Title} href={`/feed/${item.key}`}>
            <span className="post" key={item.Title}>
                <h4>{item.Time}</h4>
                <h2>{item.Title}</h2>
                <h3>{item.Subtitle}</h3>
            </span>
        </a>
            // <p dangerouslySetInnerHTML={{ __html: item.Body }}/>
    );

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

    groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    render () {
        const test = this.groupBy(Object.values(this.state.data), 'Date');

        return (
            <div className="feed">
                {sessionStorage.getItem("loggedIn") &&
                <div>
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
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" rows="5" id="body" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>}
                {/*<Document*/}
                    {/*file={"https://firebasestorage.googleapis.com/v0/b/wmmdata-42f0b.appspot.com/o/sample.pdf?alt=media&token=0a35a15d-49b8-4e07-b554-e8e7211d7747"}*/}
                    {/*onLoadSuccess={this.onDocumentLoad}*/}
                {/*>*/}
                    {/*<Page pageNumber={1} />*/}
                {/*</Document>*/}
                {Object.entries(test).map(this.createDays)}
            </div>
        )
    }
}