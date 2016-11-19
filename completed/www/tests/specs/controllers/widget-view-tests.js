describe("widget view controller", function() {

	var mockScope;

	beforeEach(angular.mock.module("WidgetApp"));

	beforeEach(angular.mock.inject(function($controller, $rootScope) {

		mockScope = $rootScope.$new();

		$controller("widgetViewCtrl", {
			$scope: mockScope
		});

	}));

	it("demo test", function() {

		expect(true).toBe(true);

	});

});
