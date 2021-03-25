const express = require('express');
const request = require('request');
const path = require('path');

const app = express();
const port = 2620;

app.use(express.static(__dirname + "/public"));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const url = "http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees";

getEmployee = () => {
    return new Promise((resolve, reject)=>{
        request.get(url, {json:true}, (err, res, body)=> {
            if(err){
                reject(err);
            }else{
                resolve(body);
            }
        })
    })
}

app.get('/', (req,res)=>{
    let employees = getEmployee();
    employees.then(
        (data)=>{
            res.render('main', {
                data,
                title:"EMPLOYEE LIST"
            })
        }
    )
})

app.get('/:')

app.listen(port,(error)=>{
    console.log('server is running on port' + port);
})