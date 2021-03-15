appAgenda.controller(
				'gestaoCtrl',
				[
						'$scope',
						'$http',
						'$routeParams',
						'$location','usuarioService','$rootScope',
						function($scope, $http, $routeParams, $location, usuarioService,$rootScope) {
							$scope.sistema = 'CapiteWeb';
							$scope.corretor = {};
							$scope.corretores = [];
							$scope.supervisores = [];
							$scope.situacoes = [];
							$scope.idSituacao = "";
							$scope.index = false;
							$scope.empresa = {};
							$scope.loginCorretor = {};
							$scope.idCorretor = 0;
							$scope.login = usuarioService.popularLogin();
							$scope.corretor.login = $scope.login;
							if($scope.login.cargo == "Imobiliaria") {
								$scope.imobiliaria = true;
							} else {
								$scope.imobiliaria = false;
							}
							$scope.parametro = usuarioService.popularParametro();
							
							$scope.alterar = function(corretor) {
								$scope.corretor = corretor;
								$scope.corretor.login = $scope.login;
								$scope.index = false;
							}
							
							$scope.imprimirResumo = function(idCorretor) {
								if(idCorretor == undefined || idCorretor == null || idCorretor == "") {
									alert("Selecione um Corretor");
									return;
								}
								$scope.url = URL+"relatorio/resumoPorCorretor?idCorretor="+idCorretor;
								window.open($scope.url,'_blank');
								
							}

							
							$scope.imprimirResumoPorSituacao = function(idSituacao) {
								if(idSituacao == undefined || idSituacao == null || idSituacao == "") {
									alert("Selecione uma Situação");
									return;
								}
								$scope.url = URL+"relatorio/resumoPorSituacao?idSituacao="+idSituacao+"&idEmpresa="+$scope.login.idEmpresa;
								window.open($scope.url,'_blank');
								
							}
							

							$scope.novo = function() {
								$scope.corretor = {};
								$scope.corretor.login = $scope.login;
								$scope.corretor.idEmpresa = $scope.empresa.id;
								$scope.index = false;
							}
							
							$scope.cancelar = function() {
								$scope.loginCorretor = {};
							}
							
							$scope.vincularCorretor = function() {
								$scope.loginCorretor.idEmpresa = $scope.empresa.id;
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "corretor/vincularCorretor",
											method : "POST",
											contentType : "application/json",
											data : $scope.loginCorretor
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												
												if(data.id == undefined || data.id == "") {
													alert("Corretor não encontrado !");
													return false;
												} else {
													alert("Inclusão de Corretor Efetuada!");
												}
												$scope.getListCorretorPorIdEmpresa();
												$scope.getListSupervisorPorIdEmpresa();
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
							
							$scope.getListSupervisorPorIdEmpresa = function() {
								if($scope.parametro.login == undefined || $scope.parametro.login.email == undefined) {
									alert("Sem Parametros");
								}
								setTimeout(function() {
									$rootScope.isVisible.loading = true;
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "corretor/getListSupervisorPorIdEmpresa",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.supervisores = data;
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

							

							$scope.salvarCorretor = function() {
								if($scope.corretor.id == undefined || $scope.corretor.id == "" || $scope.corretor.idSupervisor == undefined || $scope.corretor.idSupervisor == "") {
								   alert("Selecione um corretor e um supervisor!");
								   return false;
								}
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "corretor/salvar",
											method : "POST",
											contentType : "application/json",
											data : $scope.corretor
										})
										.success(
											function(data) {
												$scope.getListCorretorPorIdEmpresa();
												$rootScope.isVisible.loading = false;
												alert("Corretor Atualizado!");
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
							
					
							$scope.buscarCorretorPorEmail = function(email) {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "corretor/getCorretorPorEmail",
											method : "POST",
											contentType : "application/json"
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												if(data.email == undefined || data.email == "") {
													alert("Corretor não Encontrado!");
												}
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


						
							$scope.getEmpresaPorId = function() {
								setTimeout(function() {
									$rootScope.isVisible.loading = true;
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
							
							$scope.getListCorretorPorIdEmpresa = function() {
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
													+ "corretor/getListCorretorPorIdEmpresa",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.corretores = data;
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

							$scope.pesquisarSituacoes = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "situacao/listPorEmpresa",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.situacoes = data;
												//$scope.idSituacao = data[0].id;
												//$scope.pesquisar();
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



					
							$scope.getListCorretorPorIdEmpresa();
							$scope.getListSupervisorPorIdEmpresa();
							$scope.getEmpresaPorId();
							$scope.pesquisarSituacoes();
						} ]);
