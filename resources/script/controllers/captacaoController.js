var captacaoCtrl = angular.module('captacaoCtrl', []);
appAgenda.controller(
				'captacaoCtrl',
				[
						'$scope',
						'$http',
						'$routeParams',
						'$location','usuarioService','$rootScope',
						function($scope, $http, $routeParams, $location, usuarioService,$rootScope) {
							$scope.sistema = 'CapiteWeb';
							$scope.captacao = {};
							$scope.captacao.situacao = "A Pagar";
							$scope.captacao.titulo1 = "";
							$scope.captacao.anuncio1 = "";
							$scope.captacoes = [];
							$scope.empreendimentos = [];
							$scope.index = true;
							$scope.empresa = {};
							$scope.login = usuarioService.popularLogin();
							$scope.captacao.login = $scope.login;
							$scope.parametro = usuarioService.popularParametro();
							$scope.imagens = 0;
							
							$scope.alterar = function(captacao) {
								$scope.captacao = captacao;
								$scope.captacao.login = $scope.login;
								$scope.index = false;
							}

							$scope.novo = function() {
								$scope.captacao = {};
								$scope.captacao.situacao1 = "A Pagar";
								$scope.captacao.login = $scope.login;
								$scope.captacao.idEmpresa = $scope.empresa.id;
								$scope.index = false;
							}
							
							$scope.sendImagens = function() {
								$scope.imagens = $scope.imagens+1;
							}

							$scope.salvar = function(captacao) {
								if(captacao.idEmpreendimento == null || captacao.investimento1 == null || captacao.investimento1 == 0 || captacao.titulo1 == null) {
									alert("Preencha as informações");
									return false;
								}
								captacao.login = $scope.login;
								if($scope.login.cargo != "Imobiliaria") {
									captacao.idCorretor = $scope.corretor.id;
								}
								captacao.idEmpresa = $scope.empresa.id;
								setTimeout(function() {
									$rootScope.isVisible.loading = true;
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "captacao/salvar",
											method : "POST",
											contentType : "application/json",
											data : captacao
										})
										.success(
											function(data) {
												$scope.captacao = data;
												$scope.pagarCaptacao();
												$rootScope.isVisible.loading = false;
												$scope.index = true;
												$scope.pesquisarPorNome();
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
								if($scope.parametro.login == undefined || $scope.parametro.login.email == undefined) {
									alert("Sem Parametros");
								}
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "captacao/listPorNome",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.captacoes = data;
											})
										.error(
											function(erro) {
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};
							

							$scope.carregar = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "captacao/get",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												if(data != null) {
													$scope.captacao = data;
												}
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
							
							$scope.carregarCorretor = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "corretor/get",
											method : "GET",
											contentType : "application/json",
											params : {"id": $scope.parametro.login.idCorretor}
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.corretor = data;
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
							
							$scope.pagarCaptacao = function() {
								$scope.parametro.idCaptacao = $scope.captacao.id;
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "checkout/pagarCaptacao",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												window.location.href = data.url;
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
							
							$scope.carregarEmpresa = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "empresa/get",
											method : "GET",
											contentType : "application/json",
											params : {"id": $scope.parametro.login.idEmpresa}
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
								$scope.captacao = {};
								$scope.carregar();
							};
							
							$scope.vencido = function(dataVencimento) {
								$scope.past = new Date();
								$scope.now = new Date(); // Data de hoje
								$scope.diff = 0;
								$scope.days = 0;
								if(dataVencimento != undefined) {
									$scope.data = dataVencimento.substring(6,10)+'-'+dataVencimento.substring(3,5)+'-'+dataVencimento.substring(0,2);
									$scope.past = new Date($scope.data); // Outra data no passado
									$scope.diff = Math.abs($scope.now.getTime() - $scope.past.getTime()); // Subtrai uma data pela outra
									$scope.days = Math.ceil($scope.diff / (1000 * 60 * 60 * 24));
								} else {
									$scope.days = -1;
								} 
									
								if($scope.days < 0) {
									return true;
								} else {
									return false;
								}
							};
							
							
							$scope.pesquisarEmpreendimento = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "empreendimento/listPorEmpresa",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.empreendimentos = data;
												
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
							
							$scope.excluir = function(captacao) {
								if(!confirm('Deseja Excluir a Campanha ?')) {
									return;
								}
								captacao.login = $scope.login;
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "captacao/excluir",
											method : "POST",
											contentType : "application/json",
											data : captacao
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.pesquisarPorNome();
												
													
											})
										.error(
											function(erro) {
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};
							
							
							
							$scope.carregar();
							$scope.carregarEmpresa();
							$scope.pesquisarPorNome();
							$scope.pesquisarEmpreendimento();
							if($scope.login.cargo != "Imobiliaria") {
								$scope.carregarCorretor();
							}
					} ]);
