import React from 'react';
const firebase = require("firebase");

export class Zines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let self = this;
        firebase.firestore().collection("zines").doc("previews").get().then(snapshot => {
            if (snapshot.exists) {
                // snapshot.data().frontPages.map((item) => console.log(Object.keys(item)))
                // console.log(snapshot.data().frontPages)
                self.setState({pages: snapshot.data().frontPages});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }


    createPage = (page, index) => {
        console.log(page);
        return (
        <div class="page">
            {/*<p key={"index-"+Object.values(page)}>{index+1}</p>*/}
            <a href={"./zines/"+(index+1)}><img src={Object.values(page)} key={Object.values(page)} alt={"Zine Page "+index}/></a>
            <p key={"release-"+Object.values(page)}>{Object.keys(page)}</p>
        </div>);
    };

    render() {
        return (
            <div className="zines">
                <div className="pages">
                    {this.state.pages && this.state.pages.map((page, index) => this.createPage(page, index))}
                </div>
            </div>
        )
    }
}