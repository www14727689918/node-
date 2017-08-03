var express = require('express')
var mysql = require('mysql');
// var pool  = mysql.createPool({
//     connectionLimit : 10,
//     host     : process.env.MYSQL_HOST,
//     port     : process.env.MYSQL_PORT,
//     user     : process.env.ACCESSKEY,
//     password : process.env.SECRETKEY,
//     database : 'app_' + process.env.APPNAME,
//
// });
// var connection = mysql.createConnection({
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : '',
//     database : 'kaifanla_new',
//     connectionLimit: 3
// })
var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
    connectionLimit: 3
})
connection.connect();
var app = express()
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.redirect('index.html')
})
//放借口文件
app.get('/dish',function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    connection.query('SELECT * FROM kf_dish', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0]);
        //var results=results;
        response.end("callback"+"("+JSON.stringify(results)+")");
    })
});
app.listen(process.env.PORT || 5050)
