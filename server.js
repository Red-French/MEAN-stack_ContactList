'use strict'

const express = require('express');
const app = express();
const mongojs = require('mongojs');  // require mongojs module
const db = mongojs('contactList', ['contactList']);  // which mongoDB database and collection will be used
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));  // 'static' is telling the server to look for files that don't change, i.e. HTML, CSS, javascript, images
                         // '__dirname + /public' tells the server where to look for the static files
app.use(bodyParser.json());  // now, the server can parse the data from the body that it receives

app.get('/contactList', function (req, res) {  // server responds to $http.get request and sends data
//    res.send('Hello World from server.js'); // appears in browser when directed to '/contactList'
   console.log('I received a GET request');  // appears in devTools console

   db.contactList.find(function (err, docs) { // 'docs' means it will respond with the data from the database
        console.log(docs);
        res.json(docs);  // sends data to the controller
   });

   app.post('/contactlist', (req, res) => {  // 'app.post' listens for the post request from the controller
    console.log(req.body);  // this will not work without the server knowing how to parse the data,
                            // so must add the 'body parser' module
    db.contactList.insert(req.body, (err, doc) => {  // '.insert' adds the data to the database
                                                     // 'doc' represents the item (req.body) that was received and parsed
      res.json(doc); // sends data to the controller in json format
    });
   });

   app.delete('/contactlist/:id', (req, res) => {  // the colon in the address is to indicate that what follows is a variable
    let id = req.params.id;  // gets the value of the id from the url above
    console.log(id);
    db.contactList.remove({_id: mongojs.ObjectId(id)}, (err, doc) => {  // id refers to the id passed into the function
      res.json(doc);  // send the item being removed to the controller
    });
   });

   app.get('/contactList/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    db.contactList.findOne({_id: mongojs.ObjectId(id)}, (err, doc) => {
      res.json(doc);
    });
   });

   app.put('/contactList/:id', (req, res) => {
    let id = req.params.id;
    console.log(req.body.name); // print the name to the console
    db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)}, // the contact being modified
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
      new: true}, (err, doc) => {  // new update = true
        res.json(doc)  // respond with updated info
      });
   });
   //  person1 = {
   //      name: 'Tim',
   //      email: 'time@email.com',
   //      number: '(111) 111-1111'  
   //  };

   //  person2 = {
   //      name: 'Emily',
   //      email: 'emily@email.com',
   //      number: '(222) 222-2222'  
   //  };
    
   //  person3 = {
   //      name: 'John',
   //      email: 'john@email.com',
   //      number: '(333) 333-3333'  
   //  };
    
   //  var contactList = [person1, person2, person3];
   // res.json(contactList);  // server responds to the GET request by sending back the data
   //                         // in JSON format 
});

app.listen(3000);
console.log('Server running on port 3000');