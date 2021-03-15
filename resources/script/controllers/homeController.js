var homeCtrl = angular.module('homeCtrl', []);

app.controller('homeCtrl', [ '$scope', '$location','$http','$rootScope','usuarioServiceApp',
    function($scope, $location, $http, $rootScope,usuarioServiceApp ) {
			$scope.sistema = 'CapiteWeb';

			var searchObject = $location.search();

			if(searchObject.redirect=="atividade") {
				window.location.href = CONTEXTO+"atividade?id="+searchObject.id+"&fname="+searchObject.fname;
			}

			if(searchObject.redirect=="novidade") {
				window.location.href = CONTEXTO+"novidade?id="+searchObject.id+"&fname="+searchObject.fname;
			}

			$scope.home = function() {
				$location.path('/home');
			}

			$scope.painel = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/painel');
			}

			$scope.calendario = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/calendario');
			}

			$scope.listaatividade = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/listaatividade');
			}

			$scope.informacao = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/informacao');
			}

			$scope.listainformacao = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/listainformacao');
			}
			$scope.novidade = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/novidade');
			}

			$scope.listanovidade = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/listanovidade');
			}

			$scope.atividade = function() {
				$location.search('fname', null);
				$location.search('id', null); 

				$location.path('/atividade');
			}
			
			$scope.agenda = function() {
				$location.search('fname', null);
				$location.search('id', null); 
				$location.path('/agenda');
			}
			
			$scope.led = function() {
				$location.path('/led');
			};
			
			$scope.demo = function() {
				$scope.login = {};
				$scope.login.email = "imobiliaria@imobiliaria.com.br";
				$scope.login.senha = "demo";
				$scope.login.cargo = "Imobiliaria";
				$scope.logar($scope.login);
			}
			
			$scope.template1 = function() {
				$rootScope.isVisible.loading = true;
				$location.path('/template1');
			}
			$scope.template2 = function() {
				$rootScope.isVisible.loading = true;
				$location.path('/template2');
			}
			
			$scope.plano = function() {
				$location.path('/plano');
			};
			
			$scope.contato = function() {
				$location.path('/contato');
			};
			
			$scope.login = function() {
				$location.path('/login');
			};
			

			
			$scope.cadastrar = function() {
				$location.path('/cadastrar');
			};
			
			$scope.logar = function (login) {
				$rootScope.isVisible.loading = true;
				setTimeout(function() {
					$http({
						url: URL+"login/validar",
						method: "POST",
						contentType: "application/json",
						data : login
					}).success(function (data) {
						$rootScope.isVisible.loading = false;
						if(data.acesso == 'S') {
							usuarioServiceApp.salvarLogin(data);
							window.location.href = CONTEXTO+"agenda.html";
							
						} else {
							alert("Email ou Senha Incorreta.");
						}
						
					}).error( function (erro) {
						$rootScope.isVisible.loading = false;
						alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
					})},100);
		    }; 
}]
);

		




