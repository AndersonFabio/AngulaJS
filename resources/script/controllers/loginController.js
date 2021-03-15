var loginCtrl = angular.module('loginCtrl', []);
app.controller('loginCtrl', [ '$scope', '$location','$http','$rootScope','usuarioServiceApp',
    function($scope, $location, $http, $rootScope,usuarioService ) {
			$scope.sistema = 'CapiteWeb';

			$scope.login = {};
			$scope.login.cargo = "Corretor/Supervisor";
			$scope.login.nome = "";
			
			$scope.logar = function (login) {
				$rootScope.isVisible.loading = true;
				if(login.login == 'admin' && login.senha == 'bsgi') {
					login.email = login.login;
					login.cargo = "Imobiliaria";
					usuarioService.salvarLogin(login);
					$location.path('/painel');
					
				} else if(login.login == 'membro' && login.senha == 'bsgi') {
					login.email = login.login;
					login.cargo = "Corretor";
					usuarioService.salvarLogin(login);
					$location.path('/painel');
					
				}  
				
				else {
					alert("Login ou Senha Incorreta.");
				}
				$rootScope.isVisible.loading = false;
		    }; 
		    
		    $scope.cancelar = function() {
		    	$rootScope.isVisible.loading = true;
		    	$scope.login = {};
				$scope.login.cargo = "Corretor/Supervisor";
				$location.path('/home');
		    	$rootScope.isVisible.loading = false;
		    }
}]
);
	
