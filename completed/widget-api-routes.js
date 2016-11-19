module.exports = function(app) {

	"use strict";

	const widgets = JSON.parse(require("fs").readFileSync("widgets.json"));

	let lastWidgetId = widgets[widgets.length-1].id;

	function getWidget(widgetId) {
		return widgets.filter((widget) => widget.id === widgetId)[0];
	}

	function getWidgetIndex(widget) {
		return widgets.indexOf(widget);
	}

	app.get("/widgets", function(req, res) {
		try {
			res.json(widgets);
		} catch(err) {
			res.error(err.message);
		}
	});

	app.post("/widgets", function(req, res) {
		try {
			let widget = req.body;
			widget.id = ++lastWidgetId;
			widgets.push(widget)
			res.json({
				widgetId: widget.id
			});
		} catch(err) {
			res.error(err.message);
		}
	});

	app.get("/widgets/:widgetId", function(req, res) {
		try {
			res.json(getWidget(parseInt(req.params.widgetId, 10)));
		} catch(err) {
			res.error(err.message);
		}
	});

	app.put("/widgets/:widgetId", function(req, res) {
		try {
			let
				widgetId = parseInt(req.params.widgetId, 10),
				widget = getWidget(widgetId);
			req.body.id = widgetId;
			widgets.splice(getWidgetIndex(widget), 1, req.body);
			res.json(widget);
		} catch(err) {
			res.error(err.message);
		}
	});

	app.delete("/widgets/:widgetId", function(req, res) {
		try {
			let widget = getWidget(parseInt(req.params.widgetId, 10));
			widgets.splice(getWidgetIndex(widget), 1);
			res.json(widget);
		} catch(err) {
			res.error(err.message);
		}
	});

	return app;
};
