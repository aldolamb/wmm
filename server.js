const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const sgTransport = require('nodemailer-sendgrid-transport');

const nodemailer = require('nodemailer');
const creds = require('./config/config');

app.post('/login', function (req, res) {
    const email = req.body.email;
    const pwd = req.body.pwd;
    con.query(queries.login(email), function (err, result) {
        if (err) throw err;
        if (result[0]) {
            bcrypt.compare(pwd, result[0].pwd, function (error, response) {
                if (response) {
                    req.session.nameFirst = result[0].name_first;
                    res.send(result[0].name_first);
                    console.log(req.session);
                }
            })
        } else {
            res.send('');
        }
    });
});

app.post('/log_out', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

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


app.post('/subscribe', function (req, res) {
    const email = req.body.email;

    if (email) {
        res.json({
            msg: 'fail'
        })
    } else {
        res.json({
            msg: email
        })
    }
});

server = app.listen(5000, () => {
    console.log('Server is listening on port: ', server.address().port);
});