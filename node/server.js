var c = console;
var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoStore = require('connect-mongo/es5')(session);


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
app.get("/greeting", function(req,res) {
	res.send("Hello, "+req.query.name+"! I’m server!");
	// req.session.name = req.query.name;
	// req.session.counter = (req.session.counter > 0) ? req.session.counter++ : 0;
	c.log(counter++)	
});

app.get("/notes", function(req,res) {
	/*fs.readFile("notes.json", function(err, result) {
		if (result) {
			result = ""+result; // convert Object to String
			//remove last \n in file
			result = result.substring(0, result.length - 1);
			result = "["+result+"]";
			result = result.split("\n").join(",");
			res.send(result);
		} else {
			res.end();
		}
	});*/

	res.send(req.session.notes||[]);
	c.log(req.session.notes)

});

app.post("/notes", function(req, res) {
	/*var note = req.body;
	var noteText = JSON.stringify(note)+"\n";
	fs.appendFile("notes.json", noteText, function(err) {
		if (err) console.log("something is wrong");
		res.end();
	});
*/
	if (!req.session.notes) {
		req.session.notes = [];
		req.session.last_note_id = 0;
	}
	var note = req.body;
	note.id = req.session.last_note_id;
	req.session.last_note_id++;
	req.session.notes.push(note);
	res.end();
	c.log(req.session)
});

app.delete("/notes", function(req,res) {
	var id = req.query.id;
	var notes = req.session.notes||[];
	var updatedNotesList = [];
	for (var i=0;i<notes.length;i++) {
		if (notes[i].id != id) {
			updatedNotesList.push(notes[i]);
		}
	}
	req.session.notes =	updatedNotesList;
	res.end();
});



app.listen(3000, function(){
	console.log('Server started at port 3000!')
});