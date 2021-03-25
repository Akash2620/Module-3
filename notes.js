var express = require('express');
var fs = require('fs');
var fs1 = require('fs');

const fetch= require('node-fetch')




var app = express(); //started the server

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




app.listen(9090)