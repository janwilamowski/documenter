var server = require("./server"),
	router = require("./router"),
	handlers = require("./requestHandlers");

var handle = {};
handle["/"] = handlers.start;
handle["/start"] = handlers.start;
handle["/download"] = handlers.download;
handle["/upload"] = handlers.upload;

server.start(router.route, handle);
