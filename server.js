const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sgTransport = require('nodemailer-sendgrid-transport');
const expressSessions = require('express-session');
app.use(expressSessions({secret: 'apt318', saveUninitialized: false, resave: false}));

const nodemailer = require('nodemailer');
const creds = require('./config/config');


const firebase = require("firebase");
firebase.initializeApp(creds.FIREBASECONNECTION);
// Firebase App is always required and must be first
const admin = require('firebase-admin');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const auth = firebase.auth();

app.use(bodyParser.json());
const database = firebase.database();
const ref = database.ref('Posts');
const rootBeerRef = ref.child('RootBeers');

const storageRef = firebase.storage().ref();

const pageLength = 2;
// const db = firebase.initializeApp(creds.FIREBASECONNECTION);

auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("signed in")
  } else {
    console.log("signed out")
  }
});

// app.post('/login', function (req, res) {
//     const email = req.body.email;
//     const pwd = req.body.pwd;
//     con.query(queries.login(email), function (err, result) {
//         if (err) throw err;
//         if (result[0]) {
//             bcrypt.compare(pwd, result[0].pwd, function (error, response) {
//                 if (response) {
//                     req.session.nameFirst = result[0].name_first;
//                     res.send(result[0].name_first);
//                     console.log(req.session);
//                 }
//             })
//         } else {
//             res.send('');
//         }
//     });
// });

// app.post('/log_out', (req, res) => {
//     req.session.destroy();
//     res.sendStatus(200);
// });

const options = {
    auth: {
        api_user: creds.USER,
        api_key: creds.PASS
    }
};

const transporter = nodemailer.createTransport(sgTransport(options));

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages' + success);
    }
});

app.post('/send', function (req, res) {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const content = `${name}\n${message} `;

    const mail = {
        from: email,
        to: 'jlamberti2015@gmail.com',  //Change to email address that you want to receive messages on
        subject: 'WMM',
        text: content
    };

    transporter.sendMail(mail, (err) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
});

app.post('/feed', (req, res) => {
    const data = [];
    ref.orderByKey().limitToLast(10).once('value', function(snapshot) {
        let lastVisible = "";
        snapshot.forEach(function(childSnapshot) {
            if (!lastVisible)
                lastVisible = childSnapshot.key;
            let childData = childSnapshot.val();
            childData["key"] = childSnapshot.key;
            data.push(childData);
        });
        res.json({data: data.reverse(), lastVisible: lastVisible});
    });
});

app.post('/loadMore', (req, res) => {
    const data = [];
    const lowerValue = req.body.lastVisible;
    ref.orderByKey().endAt(lowerValue).limitToLast(11).once('value', function(snapshot) {
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
        res.json({data: data.reverse(), lastVisible: lastVisible});
    });
});
const util = require('util')
app.post('/upload', (req) => {
    console.log(req.body.PostFile);
    if(req.body.PostFile) {
        console.log("out");
        storageRef.put(req.body.PostFile).then(function(snapshot) {
            console.log(util.inspect(snapshot, {showHidden: false, depth: null}))
            console.log("in");
        })
    } else {
        ref.push({
            Title: req.body.PostTitle,
            Subtitle: req.body.PostSubtitle,
            Body: req.body.PostBody,
            Date: req.body.PostDate,
            Time: req.body.PostTime
        });
    }
});

app.post('/singlePost', (req, res) => {
    const data = [];
    // console.log(req.body.postID)
    ref.child(req.body.postID).once('value', function(snapshot) {
        // console.log(snapshot.val());
        // snapshot.forEach(function(childSnapshot) {
        //     if (!lastVisible)
        //         lastVisible = childSnapshot.key;
        //     let childData = childSnapshot.val();
        //     data.push(childData);
        // });
        res.json(snapshot.val());
    });
});

app.post('/subscribe', function (req, res) {
    const email = req.body.email;

    const data = [];
    if(req.session.loggedIn) {
        console.log("IT WORKED");
    }
    const ref = database.ref('Posts');
    ref.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            // console.log(childData);
            data.push(childData);
        });
        res.json({msg: data});
        // if (data) {
        //     res.json({
        //         msg: 'fail'
        //     })
        // } else {
        //     res.json({
        //         msg: email
        //     })
        // }
    });
    // ref.on('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var childData = childSnapshot.val();
    //       console.log(childData);
    //     });
    // });


    // if (email) {
    //     res.json({
    //         msg: 'fail'
    //     })
    // } else {
    //     res.json({
    //         msg: email
    //     })
    // }
});



app.post('/login', function (req, res) {
    const password = req.body.password;

    auth.signInWithEmailAndPassword('jlamberti2015@gmail.com', password)
    .then(function() {
        req.session.loggedIn = true;
        res.json({
            msg: 'success'
        })
    })
    .catch(function(error) {
        req.session.loggedIn = false;
        res.json({
            msg: 'fail'
        })
    });
});

app.post('/log_out', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    console.log('destroyed');
});

server = app.listen(5000, () => {
    console.log('Server is listening on port: ', server.address().port);
});