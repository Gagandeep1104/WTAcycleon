var http = require('http');


var path = require('path');
var express = require('express');
//ar routes = require(path.join(__dirname ,'/routes'));


//Including controller/dao for testtable

var app = express();

var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.logger('dev'));
/*app.use(express.urlencoded());
app.use(express.methodOverride());*/
app.use(express.static(path.join(__dirname, 'public')));
// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
//var express = require('express');

//app.set('view engine', 'ejs'); 
//var path = require('path');


var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'kolikoli',
database : 'DBMSproject'
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/homepage.html'));
});

//contact us page
app.post('/contactus', function(request, response) {
var id = request.body.id;
var email = request.body.email;
var parking_no = request.body.parking_no;
var subject = request.body.subject;
if (id && email && parking_no && subject) 
{

connection.connect(function(err)
{
if(err) throw err;
console.log("connected");
connection.query('INSERT INTO contactus (`id`, `Alternate_contact_info`, `parking_no`, `Subject`) VALUES(?,?,?,?)',[id,email,parking_no,subject],function(err,result,fields)
{

if (err) 
{throw err; }
else
{
console.log("1 record inserted"); 

response.send("successfully inserted");
}

response.end();
});
});
}
else {
response.send('Please enter your details correctly!');
response.end();
}
});
app.listen(3091);