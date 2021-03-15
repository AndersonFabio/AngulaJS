$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;
//var app = angular.module('ngdemoApp',['ngRoute', 'ngResource','ui.mask']);
//var app;

sessionStorage.SessionName = "CapiteWebEmail";
sessionStorage.SessionName = "CapiteWebSenha";
sessionStorage.SessionName = "CapiteWebCargo";
sessionStorage.SessionName = "CapiteWebNome";
sessionStorage.SessionName = "CapiteWebIdEmpresa";
sessionStorage.SessionName = "CapiteWebIdCorretor";

appAgenda.run(function($rootScope, $timeout) {
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
		    	bodyElement.classList.remove('noscroll');
		  });
		}
	}).config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/visitante', { templateUrl: 'index.html', controller: 'homeCtrl'})
		.when('/gestao', {templateUrl: 'views/painel.html', controller: 'painelCtrl'})
		.when('/empreendimento', {templateUrl: 'views/empreendimento.html', controller: 'empreendimentoCtrl'})
		.when('/cliente', {templateUrl: 'views/cliente.html', controller: 'clienteCtrl'})
		.when('/vincularCorretor', {templateUrl: 'views/vincularCorretor.html', controller: 'gestaoCtrl'})
		.when('/formLeadgen', {templateUrl: 'views/formLeadgen.html', controller: 'formLeadgenCtrl'})
		.when('/painel', {templateUrl: 'views/painel.html', controller: 'painelCtrl'})
		.when('/situacao', {templateUrl: 'views/situacao.html', controller: 'situacaoCtrl'})
		.when('/vincularSupervisor', {templateUrl: 'views/vincularSupervisor.html', controller: 'gestaoCtrl'})
		.when('/resumoPorCorretor', {templateUrl: 'views/resumoPorCorretor.html', controller: 'gestaoCtrl'})
		.when('/midia', {templateUrl: 'views/midia.html', controller: 'midiaCtrl'})
		.when('/resumoPorSituacao', {templateUrl: 'views/resumoPorSituacao.html', controller: 'gestaoCtrl'})
		.when('/captacao', {templateUrl: 'views/captacao.html', controller: 'captacaoCtrl'})
		
		
		.otherwise({redirectTo: '/', controller: 'agendaCtrl'});
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


  



appAgenda.directive('jqm', function($timeout) {
	  return {
	    link: function(scope, elm, attr) {
	        $timeout(function(){
	            elm.trigger('create');
	        });
	    }
	  };
	});
