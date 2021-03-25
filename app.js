
var fs = require('fs');

const express = require('express');

const router = express.Router();
const fetch = require("node-fetch");


var app = express(); //started the server


const MongoClient = require('mongodb').MongoClient; 
// Connection URL 
const url = 'mongodb://localhost:27017'; 
// Use connect method to connect to the server 
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
     if(!err){
          console.log('MongoDB Connection successfully established'); 
        }else{
             console.log('Failed to connect to MongoDB');
             }
             });
app.get('/employee/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.method);

    fs.readFile('employee.json', function (err, data) {
        if (!err) {
            const userData = JSON.parse(data);
            console.log(userData);
            for (let i = 0; i < userData.employees.length; i++) {
                console.log(typeof req.params.id);
                if (userData.employees[i].id == req.params.id) {
                    res.json(userData.employees[i])
                    return;
                }

            }
        } else {
            console.log(err);
            res.send('Unable to read the data');
        }
    });
});

app.get('/project/:projectId', (req, res) => {
    console.log(req.params.projectId);
    console.log(req.method);

    fs.readFile('project.json', function (err, data) {
        if (!err) {
            const userData = JSON.parse(data);
            console.log(userData);
            for (let i = 0; i < userData.project.length; i++) {
                console.log(typeof req.params.projectId);
                if (userData.project[i].projectId == req.params.projectId) {
                    res.json(userData.project[i])
                    return;
                }

            }
        } else {
            console.log(err);
            res.send('Unable to read the data');
        }
    });
});




app.get('/getemployeedetails/:id', function (req, res) {
    let id = req.params.id;
    fetch('http://localhost:2620/employee/' + id)
        .then(function (response) {
            return response.json();
        }).then(function (employee) {
            var projectId = employee.projectId;

            return fetch('http://localhost:2620/project/' + projectId)
                .then(function (response) {
                    return response.json();
                }).then(function (project) {
                    employee.project = project;
                    return employee;
                }).catch(function (error) {
                    console.log(error);
                })



        }).then(function (employee) {
            res.send(employee);
        })
        .catch(function (error) {
            console.log(error);
        })

});

app.listen(2620)