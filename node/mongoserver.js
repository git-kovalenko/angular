var c = console;
var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoStore = require('connect-mongo/es5')(session);

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;
var db = new Db('tutor',
	new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {})
);

db.open(function(){
	console.log("mongo db is opened!");
	db.collection('notes', function(error, notes) {
		db.notes = notes;
	});
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'publicCatalog')));
app.use(session({
	store: new MongoStore({
		url: 'mongodb://localhost:27017/angular_session'
	}),
	secret: 'angular_tutorial',
	resave: true,
	saveUninitialized: true,
}));

var counter = 0;

app.post("/doLogin", function(req, res) {
	c.log(req.body)
	db.notes.insert(req.body);
	res.end();
	c.log('--- logged :');
	c.log(req.body)
});


app.get("/notes", function(req,res) {
	db.notes.find(req.query).toArray(function(err, items) {
		res.send(items);
		c.log('--- found :')
		c.log(items);
	});
});

app.post("/notes", function(req, res) {
	c.log(req.body)
	db.notes.insert(req.body);
	res.end();
	c.log('--- inserted :');
	c.log(req.body)
});

app.delete("/notes", function(req,res) {
	var id = new ObjectID(req.query.id);
	db.notes.remove({_id: id}, function(err){
		if (err) {
			console.log(err);
			res.send("Failed");
		} else {
			res.send("Success");
		}
		res.end();
	});
});

app.get('/minimalOrder', function(req, res){
	db.notes.find().sort({order: -1}).limit(1).toArray(function(err, items){
		res.send(items);
		c.log('--- minimalOrder :')
		c.log(items);
	});
});


db.collection('sections', function(error, sections) {
	db.sections = sections;
});
app.get("/sections", function(req,res) {
	db.sections.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/sections/replace", function(req,resp) {
	// do not clear the list
	if (req.body.length==0) {
		resp.end();
	} 
	db.sections.remove({}, function(err, res) {
		if (err) console.log(err);
		db.sections.insert(req.body, function(err, res) {
			if (err) console.log("err after insert",err);
			resp.end();
		});
	});
});

app.listen(3000, function(){
	console.log('Server started at port 3000!')
});