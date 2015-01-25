function route(handle, pathname, request, response) {
	console.log("Routing " + pathname);
	if (typeof handle[pathname] == 'function') {
		handle[pathname](request, response);
	} else {
		console.log("No handler found for " + pathname);
		response.writeHeader(404, {"Content-Type": "text/plain"});
		response.write("404 NOT FOUND");
		response.end();
	}
}

exports.route = route;
