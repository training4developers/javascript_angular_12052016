(function(angular) {

	"use strict";

	controller.$inject = ["$scope", "widgets", "$state"];

	function controller($scope, widgets, $state) {

		widgets.get($state.params.widgetId).then(function(results) {
			$scope.widget = results.data;
		});

		$scope.colors = [
			{ value: "red", label: "Red" },
			{ value: "blue", label: "Blue" },
			{ value: "green", label: "Green" },
			{ value: "yellow", label: "Yellow" },
			{ value: "orange", label: "Orange" },
			{ value: "purple", label: "Purple" }
		];

		$scope.sizes = [
			{ value: "tiny", label: "Tiny" },
			{ value: "small", label: "Small" },
			{ value: "medium", label: "Medium" },
			{ value: "large", label: "Large" },
			{ value: "huge", label: "Huge" }
		];

		$scope.saveWidget = function(widget) {
			($state.params.widgetId ? widgets.update(widget) : widgets.insert(widget)).then(function() {
				$state.go("home");
			});
		};

		$scope.deleteWidget = function(widgetId) {
			if (confirm("Are you sure you want to delete the widget?")) {
				widgets.delete(widgetId).then(function() {
					$state.go("home");
				});
			}
		};

		$scope.returnToList = function() {
			$state.go("home");
		};
	}

	angular.module("WidgetApp.Controllers")
		.controller("widgetEditCtrl", controller);

})(angular);
