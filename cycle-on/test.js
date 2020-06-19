var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
var HOST = 'localhost';
var PORT = 3000
var MYSQL_USER = 'root';
var MYSQL_PASS = 'jelly123#';
var DATABASE = 'form';
var TABLE = 'info'; 

var mysql = mysql.createConnection({
host: HOST,
port: PORT,
user: MYSQL_USER,
password: MYSQL_PASS,
});
app.get('/home',function(req,res,next){
res.sendfile('views/forms.html');
});
app.post('/myaction', function(req, res) {
console.log('req.body');
console.log(req.body);
res.write('You sent the name "' + req.body.name+'".\n');
res.write('You sent the Email "' + req.body.email+'".\n');
res.write('You sent the City "' + req.body.city+'".\n');
res.write('You sent the Pincode "' + req.body.pincode+'".\n');
res.end()

mysql.query("Insert into "+TABLE+" (name,email,city,pincode) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.city+"','"+req.body.pincode+"')",function(err, result)      
{                                                      
  if (err)
     throw err;
});
});
app.listen(3000);
console.log('Example app listening at port:3000');