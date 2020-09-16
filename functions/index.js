const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');



var admin = require("firebase-admin");

var serviceAccount = require("./thusitha-serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thusitha-firebase-api.firebaseio.com"
});


app.use(cors({
  origin: true
}));

const db = admin.firestore();



// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



app.get('/', function (req, res) {

  res.status(200).send("adoooo");
});

//create user

app.post("/create-user", function (req, res) {

  // try {


  db.collection("users").doc(req.body.id).create({

    "name": req.body.name,
    "age": req.body.age
  });

  res.status(200).send("created")

  // } catch {
  //   res.status("404").send("wrro");
  // }


})

// app.get("/users", async function (req, res) {
//   try {


//     db.collection("users").get().then((snapshot) => {
//       // res.status(200).send(snapshot.docs);

//       snapshot.docs.forEach(doc => {

//         res.status(200).send(doc.data());
//       });
//     });

//     // res.status(200).send("ok");
//   } catch {
//     res.status(404).send("Error");
//   }


// });

// app.get("/user/:id", async function (req, res) {

//   try {

//     const document = db.collection("users").doc(req.params.id);
//     let userDoc = await document.get();
//     let userData = userDoc.data();
//     res.status("200").send(userData);

//   } catch {
//     res.status("400").send("err");
//   }

// });

// app.put("/user/update/:id", function (req, res) {

//   try {

//     db.collection("users").doc(req.params.id).update({
//       "name": req.body.name,
//       "age": req.body.age
//     });

//     res.status(200).send("updated");


//   } catch {
//     res.status("400").send("err");
//   }
// });


// app.get("/user/delete/:id", function (req, res) {
//   try {
//     db.collection("users").doc(req.params.id).delete();

//     res.status(200).send("deleted");
//   } catch {

//     res.status("404").send("error");

//   }
// });

exports.api = functions.https.onRequest(app);