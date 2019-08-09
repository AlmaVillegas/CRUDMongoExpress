var mongoose = require('mongoose');

module.exports.connect = () => {
	mongoose.connect('mongodb://localhost:27017/Agenda');
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}