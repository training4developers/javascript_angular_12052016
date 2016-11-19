"use strict";

const
	http = require("http"),
	httpHelper = require("./http-helper"),
	options = JSON.parse(require("fs").readFileSync("config.json")),
	app = httpHelper(options.webServer);

app.use("/api", require("./widget-api-routes"));

http.createServer(app).listen(options.webServer.port, function(err) {

	if (err) {
		console.log(err.message);
		return;
	}

	console.log(`web server started on port ${options.webServer.port}`);

});
