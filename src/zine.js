import React from 'react';
const firebase = require("firebase");

export class Zine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            zineID: props.match.params.zineID
        };
    }

    componentWillMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let self = this;
        firebase.firestore().collection("zines").doc(this.state.zineID).get().then(snapshot => {
            if (snapshot.exists) {
                self.setState({data: snapshot.data()});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }


    createPage = (page, index) => {
        return <img src={page} key={page} alt={"Zine Page "+index}/>;
    };

    render() {
        return (
            <div className="zine">
                <div className="pages">
                    {this.state.data.pages && this.state.data.pages.map((page, index) => this.createPage(page, index))}
                </div>
            </div>
        )
    }
}