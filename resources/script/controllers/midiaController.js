var midiaCtrl = angular.module('midiaCtrl', []);
appAgenda.controller(
				'midiaCtrl',
				[
						'$scope',
						'$http',
						'$routeParams',
						'$location','usuarioService','$rootScope',
						function($scope, $http, $routeParams, $location, usuarioService,$rootScope) {
							$scope.sistema = 'CapiteWeb';
							$scope.midia = {};
							$scope.situacoes = [];
							$scope.index = true;
							$scope.empresa = {};
							$scope.login = usuarioService.popularLogin();
							$scope.midia.login = $scope.login;
							$scope.parametro = usuarioService.popularParametro();
							
							$scope.alterar = function(midia) {
								$scope.midia = midia;
								$scope.midia.login = $scope.login;
								$scope.index = false;
							}

							$scope.novo = function() {
								$scope.midia = {};
								$scope.midia.login = $scope.login;
								$scope.midia.idEmpresa = $scope.empresa.id;
								$scope.index = false;
							}
							
							 
							$scope.salvar = function(midia) {
								setTimeout(function() {
									$rootScope.isVisible.loading = true;
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "midia/salvar",
											method : "POST",
											contentType : "application/json",
											data : midia
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.index = true;
												$scope.pesquisar();
											})
										.error(
											function(erro) {
												$rootScope.isVisible.loading = false;
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};
							
							$scope.pesquisar = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "midia/listPorEmpresa",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.situacoes = data;
												
											})
										.error(
											function(erro) {
												$rootScope.isVisible.loading = false;
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};
							
							$scope.pesquisarPorNome = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "midia/listPorNome",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.situacoes = data;
											})
										.error(
											function(erro) {
												$rootScope.isVisible.loading = false;
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};

							$scope.carregar = function(midia) {
								$rootScope.isVisible.loading = true;
								$scope.parametro.idMidia = midia.id;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "midia/get",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.midia = data;
											})
										.error(
											function(erro) {
												$rootScope.isVisible.loading = false;
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};

							$scope.excluir = function(midia) {
								if(!confirm('Deseja Excluir o Midia ?')) {
									return;
								}
								midia.login = $scope.login;
								$scope.parametro.idMidia = midia.id;
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "midia/excluir",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.pesquisar();
													
											})
										.error(
											function(erro) {
												$rootScope.isVisible.loading = false;
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};
							
							$scope.getEmpresaPorId = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "empresa/getEmpresaPorId",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.empresa = data;
											})
										.error(
											function(erro) {
												$rootScope.isVisible.loading = false;
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};



							$scope.cancelar = function() {
								$scope.index = true;
								$scope.midia = {};
								
							};
							
							$scope.pesquisarPorNome();
							$scope.getEmpresaPorId();
						} ]);
