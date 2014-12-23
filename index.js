var fs = require('fs');
var crypto = require('crypto');

function randomValueBase64 (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}

var inputData = fs.readFileSync(__dirname  + '/attendees.csv', 'utf-8');

var lines = inputData.split('\r\n');
var users = [];

for(var x = 0; x < lines.length; x++) {
	if(!lines[x].length) { continue; }

	var rows = lines[x].split(',');

	var last = rows[0].replace(/ /g, '');
	var first = rows[1].replace(/ /g, '');
	var email = rows[2];
	
	users.push({
		username: (first[0] + last).toLowerCase(),
		firstName: first,
		lastName: last,
		email: email,
		password: randomValueBase64(12),
		javaClass: "com.untangle.uvm.LocalDirectoryUser",
		expirationTime: 0
	});
}

fs.writeFileSync(__dirname + '/attendeeUsers.json', JSON.stringify(users));
