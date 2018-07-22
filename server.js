var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')
app.use(bodyParser.json({type: 'aplication/json'}));
//support URL-encode body
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123Qwert*',
    database: 'rs_users'
});

const server = app.listen(3000, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });



con.connect((error)=>{
    if(!!error)console.log('error');
    else console.log('connected');
})

app.get('/users',function(req, res) {
    con.query('SELECT * FROM users',function (error, rows, fields) {
        if(!!error)console.log('error');
        else {
            console.log(rows);
            res.send(rows);
        }
    })
})

app.post('/users', function(req, res){
    con.query('SELECT * FROM users', req.body, function(error, rows, fields){
        if(!!error)console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})