describe("widget edit controller", function() {

	var mockScope;

	beforeEach(angular.mock.module("WidgetApp"));

	beforeEach(angular.mock.inject(function($controller, $rootScope) {

		mockScope = $rootScope.$new();

		$controller("widgetEditCtrl", {
			$scope: mockScope
		});

	}));

	it("demo test", function() {

		expect(true).toBe(true);

	});

});
