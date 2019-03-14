const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });
const twilio = require('twilio');

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const SENDGRID_API_KEY = functions.config().sendgrid.key;


const accountSid = functions.config().twilio.sid;
const authToken  = functions.config().twilio.token;

const client = new twilio(accountSid, authToken);

const twilioNumber = '+12056235944';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);


exports.httpEmail = functions.https.onRequest((req, res) => {
  cors( req, res, () => {

    const toName  = req.body.toName;
    const toEmail = req.body.toEmail;
    const message = req.body.message;
    const text = req.body.text;

    const msg = {
        to: toEmail,
        from: 'tarek@mz.com.eg',
        subject:  'New Follower',
        text: text,
        html: message

        // custom templates
        // templateId: '300e1045-5b30-4f15-8c43-41754b73fe4f',
        // substitutionWrappers: ['{{', '}}'],
        // substitutions: {
        //   name: toName
        //   // and other custom properties here
        // }
    };

    return sgMail.send(msg)
        .then(() => res.status(200).send('email sent!') )
        .catch(err => res.status(400).send(err) );

  });
});


exports.httpSMS = functions.https.onRequest((req, res) => {
  cors( req, res, () => {
    const toNumber = req.body.toNumber;
    const message = req.body.message;

    const textMessage = {
        body: message,
        to: toNumber,  // Text to this number
        from: twilioNumber // From a valid Twilio number
    }

    return client.messages.create(textMessage)
    .then(() => res.status(200).send('SMS sent!') )
    .catch(err => res.status(400).send(err) );

  });
});
