var express = require('express');
var app = express();

var tasks = [
	{
		id: 0,
		type: 'task',
	 	description: 'Write something down',
		status: 'READY',
		action: 0
	},
	{
		id: 1,
		type: 'task',
	 	description: 'Lift something up',
		status: 'READY',
		action: 1
	},
	{
		id: 2,
		type: 'task',
	 	description: 'Scream',
		status: 'READY',
		action: 1
	}
];

var actions = [
	'console.log(description.toUpperCase())',
	'console.log(\'~~\' + description.toLowerCase() + \'~~\')',
	'console.log(description)'
];

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/node/next', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var next = null;
	for(var i = 0; i < tasks.length; ++i) {
		if(tasks[i].status == 'READY') {
			next = i;
			break;
		}
	}
	var node = { id: null };
	if(next !== null) {
		node = tasks[next];
	}
    res.send(JSON.stringify( node ));
});

app.get('/action/:id', function(req, res) {
	var id = req.params.id;
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
		id: id,
		action: actions[id]
	}));
});

app.post('/node/:id', function(req, res) {
	var id = req.params.id;
	tasks[id].status = 'COMPLETED';
});

var server = app.listen(3030, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
