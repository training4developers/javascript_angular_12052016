describe("home controller", function() {

	"use strict";

	var mockScope, widgetsSvc, stateSvc, controllerSvc;

	beforeEach(angular.mock.module("WidgetApp"));

	beforeEach(angular.mock.inject(function($controller, $rootScope, widgets, $state) {

		controllerSvc = $controller;
		mockScope = $rootScope.$new();
		widgetsSvc = widgets;
		stateSvc = $state;

	}));

	beforeEach(function(done) {

		spyOn(widgetsSvc, "getAll").and.returnValue(new Promise(function(resolve) {

			setTimeout(function() {
				resolve({ data: [
					{ id: 1, name: "Test Widget", description: "Test Widget", color: "red", size: "tiny", quantity: 23 }
				]});
				done();
			}, 0);

		}));

		spyOn(stateSvc, "go");

		controllerSvc("homeCtrl", {
			$scope: mockScope,
			widgets: widgetsSvc,
			$state: stateSvc
		});

	});

	it("load widgets", function(done) {

		setTimeout(function() {
			expect(widgetsSvc.getAll).toHaveBeenCalled();
			expect(mockScope.widgets.length).toBe(1);
			done();
		}, 0);

	});

	it("view widget", function() {

		mockScope.viewWidget(1);
		expect(stateSvc.go).toHaveBeenCalledWith("view", { widgetId: 1 });

	});

	it("edit widget", function() {

		mockScope.editWidget(1);
		expect(stateSvc.go).toHaveBeenCalledWith("edit", { widgetId: 1 });

	});

	it("create widget", function() {

		mockScope.createWidget();
		expect(stateSvc.go).toHaveBeenCalledWith("create");

	});

})
