(function(angular) {

	"use strict";

	controller.$inject = ["$scope", "widgets", "$state"];

	function controller($scope, widgets, $state) {

		widgets.getAll().then(function(results) {
			$scope.widgets = results.data;
		});

		$scope.editWidget = function(widgetId) {
			$state.go("edit", { widgetId: widgetId });
		};

		$scope.viewWidget = function(widgetId) {
			$state.go("view", { widgetId: widgetId });
		}

		$scope.createWidget = function() {
			$state.go("create");
		}

	}

	angular.module("WidgetApp.Controllers")
		.controller("homeCtrl", controller);

})(angular);
