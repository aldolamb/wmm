import React from 'react';
import axios from "axios";
import { Document, Page } from 'react-pdf';
const firebase = require("firebase");

export class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: true,
            lastVisible: ""
        };

        this.loadFeed       = this.loadFeed.bind(this);
        this.loadMore       = this.loadMore.bind(this);
        this.createItems    = this.createItems.bind(this);
    }

    componentWillMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let self = this;
        self.setState({isLoaded: false});
        // axios.post('https://us-central1-wmmdata-42f0b.cloudfunctions.net/feed')
        //     .then(function (response) {
        //         if (response.data) {
        //             self.setState({data: response.data.data});
        //             self.setState({lastVisible: response.data.lastVisible, isLoaded: true});
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        const data = [];
        console.log(firebase);
        firebase.database().ref('Posts').orderByKey().limitToLast(10).once('value', function(snapshot) {
            let lastVisible = "";
            snapshot.forEach(function(childSnapshot) {
                if (!lastVisible)
                    lastVisible = childSnapshot.key;
                let childData = childSnapshot.val();
                childData["key"] = childSnapshot.key;
                data.push(childData);
            });
            self.setState({data: data.reverse()});
            self.setState({lastVisible: lastVisible, isLoaded: true});
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
        console.log("called")
        let self = this;
        self.setState({isLoaded: false});
        // axios.post('https://us-central1-wmmdata-42f0b.cloudfunctions.net/loadMore', {
        //     lastVisible: self.state.lastVisible
        // })
        //     .then(function (response) {
        //         if (response.data.data.length > 0) {
        //             self.setState({data: self.state.data.concat(response.data.data)});
        //             self.setState({lastVisible: response.data.lastVisible, isLoaded: true})
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        const data = [];
        const lowerValue = this.state.lastVisible;
        firebase.database().ref('Posts').orderByKey().endAt(lowerValue).limitToLast(11).once('value', function(snapshot) {
            let lastVisible = "";
            snapshot.forEach(function(childSnapshot) {
                if (!lastVisible)
                    lastVisible = childSnapshot.key;
                if (lowerValue !== childSnapshot.key) {
                    const childData = childSnapshot.val();
                    childData["key"] = childSnapshot.key;
                    data.push(childData);
                }
            });
            if (data.length) {
                self.setState({data: self.state.data.concat(data.reverse())});
                self.setState({lastVisible: lastVisible, isLoaded: true})
            }
        });
    }

    currentDate() {
        const today = new Date();
        return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }

    createDays = (day) => (
        <div className="day" key={day[0]}>
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

    groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        let key = obj[property];
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
                {Object.entries(test).map(this.createDays)}
                {/*<button className="load_more" onClick={this.loadMore}>Load More</button>*/}
            </div>
        )
    }
}
