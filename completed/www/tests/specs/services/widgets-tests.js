describe("widgets service", function() {

	var httpSvc, httpBackendSvc, widgetsSvc, rootScopeSvc;

	function getWidgetData() {
		return [
			{ id: 1, name: "Test Widget", description: "Test Widget", color: "red", size: "tiny", quantity: 23 },
			{ id: 2, name: "Test Widget 2", description: "Test Widget 2", color: "blue", size: "small", quantity: 45 }
		];
	}

	beforeEach(angular.mock.module("WidgetApp"));

	beforeEach(angular.mock.inject(function($http, $httpBackend, widgets, $rootScope) {
		httpSvc = $http;
		httpBackendSvc = $httpBackend;
		widgetsSvc = widgets;
		rootScopeSvc = $rootScope;
	}));

	it("get all widgets", function() {

		httpBackendSvc.expectGET("/api/widgets").respond(getWidgetData());

		widgetsSvc.getAll().then(function(results) {
			expect(results.data.length).toBe(2);
		});

	});

	it("get a widget", function() {

		httpBackendSvc.expectGET("/api/widgets/2").respond(getWidgetData()[1]);

		widgetsSvc.get(2).then(function(results) {
			expect(results.data.id).toBe(2);
		});

	});

	it("insert a widget", function() {

		var
			expectedNewWidget = {
				name: "Test Widget 3",
				description: "Test Widget 3",
				color: "yellow",
				size: "medium",
				quantity: 34
			},
			insertWidgetId = { widgetId: 3 };

		httpBackendSvc.expectPOST("/api/widgets", expectedNewWidget, {
			"Accept":"application/json, text/plain, */*",
			"Content-Type":"application/json;charset=utf-8"
		}).respond(insertWidgetId);

		widgetsSvc.insert(angular.extend({},expectedNewWidget)).then(function(results) {
			expect(results.data).toEqual(insertWidgetId);
		});

	});

	it("update a widget", function() {

		var
			expectedReplacementWidget = {
				id: 2,
				name: "Test Widget 2",
				description: "Test Widget 2",
				color: "purple",
				size: "large",
				quantity: 34
			},
			replacedWidget = getWidgetData()[1];

		httpBackendSvc.expectPUT("/api/widgets/2", expectedReplacementWidget, {
			"Accept":"application/json, text/plain, */*",
			"Content-Type":"application/json;charset=utf-8"
		}).respond(replacedWidget);

		widgetsSvc.update(angular.extend({}, expectedReplacementWidget)).then(function(results) {
			expect(results.data).toEqual(replacedWidget);
		});

	});

	it("delete a widget", function() {

		httpBackendSvc.expectDELETE("/api/widgets/2").respond(getWidgetData()[1]);

		widgetsSvc.delete(2).then(function(results) {
			expect(results.data.id).toBe(2);
		});

	});

	afterEach(function() {

		// need this for the $q service promise
		rootScopeSvc.$digest();

		// need this for the $http request
		httpBackendSvc.flush();

		httpBackendSvc.verifyNoOutstandingRequest();
		httpBackendSvc.verifyNoOutstandingExpectation();

	});

});
