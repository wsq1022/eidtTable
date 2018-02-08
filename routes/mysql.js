
var mysql=require("mysql");

var connect=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'w1710'
});



module.exports=connect;
