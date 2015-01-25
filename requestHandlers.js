var jade = require("jade"),
	querystring = require("querystring"),
	formidable = require("formidable"),
	fs = require("fs"),
	url = require("url");

function start(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	var fn = jade.compileFile('./view/start.jt');
	response.write(fn({"name": "World"}));
	response.end();
}

function download(request, response) {
	var query = url.parse(request.url).query;
	var filepath = querystring.parse(query).path; // TODO: take file id instead
	console.log("downloading " + filepath);
	fs.readFile(filepath, function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
		} else {
			response.writeHead(200, {"Content-Type": "binary"}); // TODO: from database
			response.write(file, "binary");
			response.end();
		}
	})
}

function upload(request, response) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		console.log(files);
		if (error) console.log(error);
		var temppath = files.upload.path;
		var filepath = '/tmp/' + files.upload.name;

		fs.rename(temppath, filepath, function(error) {
			/* Possible error on Windows systems:
			tried to rename to an already existing file */
			if (error) {
				fs.unlink(filepath);
				fs.rename(temppath, filepath);
			}
		})
		var fn = jade.compileFile('./view/upload.jt');

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(fn({"filepath": filepath}));
		response.end();
	})
}

exports.start = start;
exports.download = download;
exports.upload = upload;
