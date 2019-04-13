// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'neethu4547',
  database : 'Web_Technology'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;