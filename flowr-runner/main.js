var axios = require('axios');
var syncReq = require('sync-request');

var knownActions = {};

var executeNode = function(node, action) {
	//console.log('EXECUTE ' + node.type + ' \'' + node.description + '\' (' + node.id + '). The action is: ' + action);
	action(node.description);
	axios.post('http://localhost:3030/node/' + node.id, {});
	processNext();
};

var deployAction = function(id) {
	//console.log("DEPLOY ACTION: " + id);
	var req = syncReq('GET', 'http://localhost:3030/action/' + id);
	knownActions[id] = new Function('description', JSON.parse(req.getBody()).action);
}

var loadAction = function(id) {
	if(!knownActions[id]) {
		deployAction(id);
	}
	return knownActions[id];
}

var processNext = function() {
	axios.get('http://localhost:3030/node/next')
		.then(function(response) {
			//Nothing else to do
			if(response.data.id === null) return;

			var node = response.data;
			var action = loadAction(node.action);
			executeNode(node, action);
		})
		.catch(function(error) {
			console.log(error);
		});
}

processNext();
