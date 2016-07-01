/**
 * @author fda
 */
var livreRecettes = angular.module("livreRecettes", ["ngRoute", "ngAnimate", "ui.bootstrap"]);


/* Configuration*/
livreRecettes.config(function($routeProvider) {
	$routeProvider
		.when("/recipes", {
			templateUrl: "views/recipes.html",
			controller: "RecipesController"
		})
		.when("/products", {
			templateUrl: "views/products.html",
			controller: "ProductsController"
		})
		.otherwise({
			redirectTo: "/recipes"
		});
});


/* Factories */
/*livreRecettes.factory("unitService", function() {
	var units = [];
	
	var factory =  {};
	
	factory.getUnits = function () {
		return units;
	};
	
	factory.putNewUnit = function (unitName,unitValue) {
		units.push({
			unitName: unitName,
			unitValue: unitValue
		});
	};
	
	return factory;
});*/


/* Controllers */
livreRecettes.controller("NavigationController", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "Livre de recettes";
	$scope.appDetails.tagline = "Gestion, création et consultation de recettes";
	
	$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path()) {
			return true;
		}
		
		return false;
	}
});


livreRecettes.controller("RecipesController", function($scope) {
	
	$scope.recipes = [
		{name: 'Recette1', city: 'Lausanne'},
		{name: 'Recette2', city: 'Vevey'},
		{name: 'Recette3', city: 'Genève'}
	];
		
});
