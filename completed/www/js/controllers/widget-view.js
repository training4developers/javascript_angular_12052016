(function(angular) {

	"use strict";

	controller.$inject = ["$scope", "widgets", "$state"];

	function controller($scope, widgets, $state) {

		widgets.get($state.params.widgetId).then(function(results) {
			$scope.widget = results.data;
		});

		$scope.editWidget = function(widgetId) {
			$state.go("edit", { widgetId: widgetId });
		};

		$scope.returnToList = function() {
			$state.go("home");
		};
	}

	angular.module("WidgetApp.Controllers")
		.controller("widgetViewCtrl", controller);

})(angular);
