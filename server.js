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
const posts_ref = database.ref('Posts');
// const rootBeerRef = ref.child('RootBeers');

const storageRef = firebase.storage().ref();

// const db = firebase.initializeApp(creds.FIREBASECONNECTION);


// Add your credentials:
// Add your client ID and secret
// var CLIENT = 'AUJoKVGO3q1WA1tGgAKRdY6qx0qQNIQ6vl6D3k7y64T4qh5WozIQ7V3dl3iusw5BwXYg_T5FzLCRguP8';
// var SECRET = 'EOw8LNwDhM7esrQ3nHfzKc7xiWnJc83Eawln4YLfUgivfx1LGzu9Mj0F5wlarilXDqdK9Q5aHVo-VGjJ';
//
// var PAYPAL_API = 'https://api.sandbox.paypal.com';
//
// app.post('/my-api/execute-payment/', function(req, res) {
//         // 2. Get the payment ID and the payer ID from the request body.
//         const paymentID = req.body.paymentID;
//         const payerID   = req.body.payerID;
//
//         // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
//         request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID + '/execute', {
//             auth: {
//                 user: CLIENT,
//                 pass: SECRET
//             },
//             body: {
//                 payer_id: payerID,
//                 transactions: [{
//                     amount: {
//                         total: '10.99',
//                         currency: 'USD'
//                     }
//                 }]
//             },
//             json: true
//         }, function (err, response) {
//             if (err) {
//                 console.error(err);
//                 return res.sendStatus(500);
//             }
//
//             // 4. Return a success response to the client
//             res.json({
//                 status: 'success'
//             });
//         });
//     });



auth.signInAnonymously().catch(function(error) {
  // Handle Errors here.
  console.log("error");
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("signed in")
  } else {
    console.log("signed out")
  }
});



// auth.onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
//   // ...
// });

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
    posts_ref.orderByKey().limitToLast(10).once('value', function(snapshot) {
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
    posts_ref.orderByKey().endAt(lowerValue).limitToLast(11).once('value', function(snapshot) {
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
        posts_ref.push({
            Title: req.body.PostTitle,
            Subtitle: req.body.PostSubtitle,
            Body: req.body.PostBody,
            Date: req.body.PostDate,
            Time: req.body.PostTime,
        });
    }
});

app.post('/save', function (req, res) {
    let updates = {};
    updates[req.body.PostKey] = {
        Title: req.body.PostTitle,
        Subtitle: req.body.PostSubtitle,
        Body: req.body.PostBody,
        Date: req.body.PostDate,
        Time: req.body.PostTime,
    };

    if(req.body.PostFile) {
        // console.log("out");
        // storageRef.put(req.body.PostFile).then(function(snapshot) {
        //     console.log(util.inspect(snapshot, {showHidden: false, depth: null}))
        //     console.log("in");
        // })
    } else {
        // posts_ref.update(updates);
        firebase.database().ref('Posts/' + req.body.PostKey).set({
            Title: req.body.PostTitle,
            Subtitle: req.body.PostSubtitle,
            Body: req.body.PostBody,
            Date: req.body.PostDate,
            Time: req.body.PostTime,
        }, function(error) {
            if (error) {
                res.json({
                    msg: 'fail'
                })
            } else {
                res.json({
                    msg: 'success'
                })
            }
        });
    }
});

app.post('/delete', function (req, res) {
    // posts_ref.update(updates);
    firebase.database().ref('Posts/' + req.body.PostKey).remove()
    .then(function() {
        res.json({
            msg: 'success'
        })
    })
    .catch(function(error) {
        res.json({
            msg: 'fail'
        })
    });;
});

app.post('/singlePost', (req, res) => {
    const data = [];
    posts_ref.child(req.body.postID).once('value', function(snapshot) {
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

app.post('/uploadImage', function (req res) {
    // File or Blob named mountains.jpg
    var file = ...

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });
    });
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