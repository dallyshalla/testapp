var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('list', ['list']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/list', function(req, res) {

	console.log("i got get");

	db.list.find(function (err, docs) {
		console.log(docs);
		res.json(docs);

	});

});

app.post('/list', function(request, response) {

	console.log(request.body);

	db.list.insert(request.body, function(err, doc) {

		response.json(doc);

	});

});

app.delete('/list/:id', function(request, response) {
	var id = request.params.id;
	console.log(id);
	db.list.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		response.json(doc);
	});

});

app.get('/list/:id', function(request, response) {
	var id = request.params.id;
	console.log(id);
	db.list.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		response.json(doc);
	});
});

app.put('/list/:id', function(req, res) {
	var id = req.params.id;
	db.list.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc) {
			res.json(doc);
		});
});

app.listen(3000);