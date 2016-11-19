(function(angular) {
	
	"use strict";

	service.$inject = ["$http", "WIDGET_API_URL"];

	function service($http, WIDGET_API_URL) {

		return {
			getAll: function() {
				return $http.get(WIDGET_API_URL);
			},
			get: function(widgetId) {
				return $http.get(WIDGET_API_URL + "/" + encodeURIComponent(widgetId));
			},
			insert: function(widget) {
				return $http.post(WIDGET_API_URL, widget);
			},
			update: function(widget) {
				return $http.put(WIDGET_API_URL + "/" + encodeURIComponent(widget.id), widget);
			},
			delete: function(widgetId) {
				return $http.delete(WIDGET_API_URL + "/" + encodeURIComponent(widgetId));
			}
		};

	}

	angular.module("WidgetApp.Services")
		.factory("widgets", service);

})(angular);
