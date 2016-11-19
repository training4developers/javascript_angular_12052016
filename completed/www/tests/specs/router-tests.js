describe("app router", function() {

	"use strict";

	var stateSvc, rootScopeSvc, httpBackendSvc;

	beforeEach(angular.mock.module("WidgetApp"));

	beforeEach(angular.mock.inject(function($state, $rootScope, $httpBackend) {
		stateSvc = $state;
		rootScopeSvc = $rootScope;
		httpBackendSvc =  $httpBackend;
	}));

	it("home state configuration", function() {

		var stateConfig = stateSvc.get("home");

		expect(stateConfig.name).toEqual("home");
		expect(stateConfig.url).toEqual("/");
		expect(stateConfig.controller).toEqual("homeCtrl");
		expect(stateConfig.templateUrl).toEqual("tpls/home.html");

	});

	it("create state configuration", function() {

		var stateConfig = stateSvc.get("create");

		expect(stateConfig.name).toEqual("create");
		expect(stateConfig.url).toEqual("/widgets/create");
		expect(stateConfig.controller).toEqual("widgetEditCtrl");
		expect(stateConfig.templateUrl).toEqual("tpls/widget-edit.html");

	});

	it("view state configuration", function() {

		var stateConfig = stateSvc.get("view");

		expect(stateConfig.name).toEqual("view");
		expect(stateConfig.url).toEqual("/widgets/:widgetId");
		expect(stateConfig.controller).toEqual("widgetViewCtrl");
		expect(stateConfig.templateUrl).toEqual("tpls/widget-view.html");

	});

	it("edit state configuration", function() {

		var stateConfig = stateSvc.get("edit");

		expect(stateConfig.name).toEqual("edit");
		expect(stateConfig.url).toEqual("/widgets/:widgetId/edit");
		expect(stateConfig.controller).toEqual("widgetEditCtrl");
		expect(stateConfig.templateUrl).toEqual("tpls/widget-edit.html");

	});

	it("home state url", function() {
		var stateUrl = stateSvc.href("home", { widgetId: 1 });
		expect(stateUrl).toBe("/");
	});

	it("create state url", function() {
		var stateUrl = stateSvc.href("create");
		expect(stateUrl).toBe("/widgets/create");
	});

	it("view state url", function() {
		var stateUrl = stateSvc.href("view", { widgetId: 1 });
		expect(stateUrl).toBe("/widgets/1");
	});

	it("edit state url", function() {
		var stateUrl = stateSvc.href("edit", { widgetId: 1 });
		expect(stateUrl).toBe("/widgets/1/edit");
	});

	describe("goto state", function() {

		beforeEach(function() {

			httpBackendSvc.expectGET("tpls/home.html", {
				"Accept":"text/html"
			}).respond("Home HTML Template");

			httpBackendSvc.flush();

		});

		it("change to home state", function() {

			stateSvc.go("home").then(function() {

				expect(stateSvc.current.name).toEqual("home");
				expect(stateSvc.current.url).toEqual("/");
				expect(stateSvc.current.templateUrl).toEqual("tpls/home.html");
				expect(stateSvc.current.controller).toEqual("homeCtrl");

				angular.mock.inject(function($templateCache) {
					expect($templateCache.get(stateSvc.current.templateUrl)[1]).toEqual("Home HTML Template");
				});

			});

		});

		it("change to widget create state", function() {

			httpBackendSvc
				.expectGET("tpls/widget-edit.html")
				.respond("Widget Edit HTML Template");

			stateSvc.go("create").then(function() {

				expect(stateSvc.current.name).toEqual("create");
				expect(stateSvc.current.url).toEqual("/widgets/create");
				expect(stateSvc.current.templateUrl).toEqual("tpls/widget-edit.html");
				expect(stateSvc.current.controller).toEqual("widgetEditCtrl");

				angular.mock.inject(function($templateCache) {
					expect($templateCache.get(stateSvc.current.templateUrl)[1]).toEqual("Widget Edit HTML Template");
				});

			});

			httpBackendSvc.flush();

		});

		it("change to widget view state", function() {

			httpBackendSvc
				.expectGET("tpls/widget-view.html")
				.respond("Widget View HTML Template");

			stateSvc.go("view", { widgetId: 1 }).then(function() {

				expect(stateSvc.current.name).toEqual("view");
				expect(stateSvc.current.url).toEqual("/widgets/:widgetId");
				expect(stateSvc.current.templateUrl).toEqual("tpls/widget-view.html");
				expect(stateSvc.current.controller).toEqual("widgetViewCtrl");

				angular.mock.inject(function($templateCache) {
					expect($templateCache.get(stateSvc.current.templateUrl)[1]).toEqual("Widget View HTML Template");
				});

			});

			httpBackendSvc.flush();

		});

		it("change to widget edit state", function() {

			httpBackendSvc
				.expectGET("tpls/widget-edit.html")
				.respond("Widget Edit HTML Template");

			stateSvc.go("edit", { widgetId: 1 }).then(function() {

				expect(stateSvc.current.name).toEqual("edit");
				expect(stateSvc.current.url).toEqual("/widgets/:widgetId/edit");
				expect(stateSvc.current.templateUrl).toEqual("tpls/widget-edit.html");
				expect(stateSvc.current.controller).toEqual("widgetEditCtrl");

				angular.mock.inject(function($templateCache) {
					expect($templateCache.get(stateSvc.current.templateUrl)[1]).toEqual("Widget Edit HTML Template");
				});

			});

			httpBackendSvc.flush();

		});

		afterEach(function() {

			httpBackendSvc.verifyNoOutstandingExpectation();
			httpBackendSvc.verifyNoOutstandingRequest();

		});

	});

});
