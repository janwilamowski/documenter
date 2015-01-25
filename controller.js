function foo(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello from Controller!");
	response.end();
}

exports.foo = foo;
