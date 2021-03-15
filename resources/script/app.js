//var app = angular.module('ngdemoApp',['ngRoute', 'ngResource','ui.mask']);
//var app;

sessionStorage.SessionName = "CapiteWebEmail";
sessionStorage.SessionName = "CapiteWebSenha";
sessionStorage.SessionName = "CapiteWebCargo";
sessionStorage.SessionName = "CapiteWebNome";
sessionStorage.SessionName = "CapiteWebIdEmpresa";
sessionStorage.SessionName = "CapiteWebIdCorretor";

app.run(function($rootScope, $timeout) {
    $rootScope.isVisible = {
            loading: false
        };
/*        $rootScope.$on("$stateChangeStart", function() {
            $rootScope.isVisible.loading = true;
            //alert($rootScope.isVisible.loading)
        });
        $rootScope.$on("$viewContentLoaded", function () {
            $timeout(function () {
                $rootScope.isVisible.loading = false;
                //alert($rootScope.isVisible.loading)
            }, 2000);
        });
*/    }).directive('fullscreenDialog', function () {
	  return {
			controller: 'fsDialogController',
			link: fsDialogLinker,
			restrict : 'E',
			replace: true,
			transclude: true,
			template : '<div class="dialog-container"><ng-transclude></ng-transclude></div>'
		}
		function fsDialogLinker(scope, element, attribute) {
			scope.$on('$destroy', function () {
			    var bodyElement = document.getElementById("dialog");
		    	
		  });
		}
	}).config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', { templateUrl: 'views/home.html', controller: 'homeCtrl'})
		.when('/painel', {templateUrl: 'views/painel.html', controller: 'painelCtrl'})
		.when('/agenda', {templateUrl: 'views/agenda.html', controller: 'agendaCtrl'})
		.when('/calendario', {templateUrl: 'views/calendario.html', controller: 'agendaCtrl'})
		.when('/login', {templateUrl: 'views/login.html', controller: 'loginCtrl'})
		.when('/atividade', {templateUrl: 'views/atividade.html', controller: 'atividadeCtrl'})
		.when('/informacao', {templateUrl: 'views/informacao.html', controller: 'informacaoCtrl'})
		.when('/novidade', {templateUrl: 'views/novidade.html', controller: 'novidadeCtrl'})
		.when('/listaatividade', {templateUrl: 'views/listaatividade.html', controller: 'atividadeCtrl'})
		.when('/listainformacao', {templateUrl: 'views/listainformacao.html', controller: 'informacaoCtrl'})
		.when('/listanovidade', {templateUrl: 'views/listanovidade.html', controller: 'novidadeCtrl'})
		.otherwise({redirectTo: '/', controller: 'homeCtrl'});
	}]).controller('fsDialogController', function ($scope) {
		$scope.isPanelVisible = false;
		var bodyElement = document.getElementById("dialog");
		
		$scope.showDialog = function () {
			$scope.isPanelVisible = true;
			bodyElement.classList.add('noscroll');
		};
		$scope.hideDialog = function () {
			$scope.isPanelVisible = false;
			bodyElement.classList.remove('noscroll');
		};
	});
  



app.directive('jqm', function($timeout) {
	  return {
	    link: function(scope, elm, attr) {
	        $timeout(function(){
	            elm.trigger('create');
	        });
	    }
	  };
	});

	app.directive('myDirective', function (httpPostFactory) {
		return {
			restrict: 'A',
			scope: true,
			link: function (scope, element, attr) {
	
				element.bind('change', function () {
					var formData = new FormData();
					formData.append('file', element[0]);
					httpPostFactory('http://localhost:21137/upload', formData, function (callback) {
					   // recieve image name to use in a ng-src 
						console.log(callback);
					});
				});
	
			}
		};
	});

	app.directive('fileModel', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
		
				element.bind('change', function(){
					scope.$apply(function(){
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};}]);


	app.factory('httpPostFactory', function ($http) {
		return function (file, data, callback) {
			$http({
				url: file,
				method: "POST",
				data: data,
				headers: {'Content-Type': undefined}
			}).success(function (response) {
				callback(response);
			});
		};
	});

