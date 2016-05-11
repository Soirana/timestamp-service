	var express = require('express');
var app = express();
var moment = require('moment');
var fs = require('fs');
var html = fs.readFileSync('index.html');

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
});
	
app.get('/:datest', function(request,response) {
	var checkDate;
	if (/^[0-9]+$/.test(request.params.datest)){
		checkDate = moment(request.params.datest, 'X');
	}
	else{
		checkDate = moment(request.params.datest, 'MMMM D, YYYY')
	}
	if (checkDate.isValid()) {
		
		response.json({	unix: checkDate.format("X"),
						natural: checkDate.format("MMMM D, YYYY")});
	} else {
		response.json({	unix: null,
						natural: null});
}

});






app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});