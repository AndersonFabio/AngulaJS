var clienteCtrl = angular.module('clienteCtrl', []);
appAgenda.controller(
				'clienteCtrl',
				[
						'$scope',
						'$http',
						'$routeParams',
						'$location','usuarioService','$rootScope',
						function($scope, $http, $routeParams, $location, usuarioService,$rootScope) {
							
							$scope.login = {};
							$scope.login = usuarioService.popularLogin();
							$scope.parametro = usuarioService.popularParametro();
							
							$scope.sistema = 'CapiteWeb';
							$scope.empresa = {};
							$scope.cliente = {};
							$scope.situacoes = [];
							$scope.midias = [];
							$scope.cliente.captacao = "Selecione...";
							$scope.clientes = [];
							$scope.index = true;
							$scope.cliente.login = $scope.login;
							
							$scope.corretores = [];
							$scope.supervisores = [];
							$scope.captadores = [];
							$scope.totalRegistros = 0;

							
							
							$scope.alterar = function(cliente) {
								$scope.cliente = cliente;
								$scope.cliente.login = $scope.login;
								$scope.index = false;
							}

							$scope.novo = function() {
								$scope.cliente = {};
								$scope.cliente.captacao = "Selecione...";
								$scope.cliente.login = $scope.login;
								$scope.cliente.idEmpresa = $scope.empresa.id;
								$scope.index = false;
								$scope.cliente.idSituacao = "";
								$scope.cliente.idCorretor = "";
								$scope.cliente.idCaptador = "";
							}
							
							  $scope.getCep = function(cep, ind) {
							    	if(cep.length < 8) {
							    		return;
							    	}
							    	if(cep.length == 8) {
							    		cep = cep.substring(0,5)+"-"+cep.substring(5,9);
							    	}
							    	setTimeout(function() {
										$http({
											url: URL+"cep",
											method: "GET",
											contentType: "application/json",
											params : {"cep":cep}
										}).success(function (data) {
											if(ind == 1) {
								    			$("#Endereco").val(unescape(data.endereco));
								            	//$("#Endereco").change();
								                $("#Bairro").val(unescape(data.bairro));
								                //$("#Bairro").change();
								                $("#Cidade").val(unescape(data.cidade));
								                $("#Estado").val(unescape(data.uf));
								                $("#Numero").focus();
											} else {
												$("#Endereco2").val(unescape(data.endereco));
								            	//$("#Endereco").change();
								                $("#Bairro2").val(unescape(data.bairro));
								                //$("#Bairro").change();
								                $("#Cidade2").val(unescape(data.cidade));
								                $("#Estado2").val(unescape(data.uf));
								                $("#Numero2").focus();
											}
										}).error( function (erro) {
											$rootScope.isVisible.loading = false;
											alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
												})},100);
									
								}

							$scope.salvar = function(cliente) {
								if(cliente.dataNascimento != undefined && cliente.dataNascimento.substring(2,3) != "/") {
									cliente.dataNascimento = cliente.dataNascimento.substring(0,2)+'/'+cliente.dataNascimento.substring(2,4)+'/'+cliente.dataNascimento.substring(4,8);
								}
								if(cliente.idSituacao == "") {
									alert("Selecione uma Situação...");
									return;
								}
								setTimeout(function() {
									$rootScope.isVisible.loading = true;
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "cliente/salvar",
											method : "POST",
											contentType : "application/json",
											data : cliente
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.index = true;
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
							
							$scope.pesquisarPorEmpresa = function() {
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
													+ "cliente/listPorEmpresa",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.clientes = data;
												
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
							
							
							$scope.countPorCorretor = function() {
								if($scope.parametro.login == undefined || $scope.parametro.login.email == undefined) {
									alert("Sem Parametros");
								}
								if($scope.cliente != undefined) {
									$scope.parametro.idSituacao = $scope.cliente.idSituacao;
								}
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "cliente/countPorCorretor",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.totalRegistros = data;
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
							
							$scope.pesquisarPorNome = function() {
								if($scope.parametro.login == undefined || $scope.parametro.login.email == undefined) {
									alert("Sem Parametros");
								}
								if($scope.cliente != undefined) {
									$scope.parametro.idSituacao = $scope.cliente.idSituacao;
								}
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "cliente/listPorNome",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.clientes = data;
												$scope.countPorCorretor();
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
							
							
							$scope.pesquisarMidias = function() {
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
												$scope.midias = data;
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


							$scope.carregar = function(cliente) {
								$scope.parametro.idCliente = cliente.id;
								setTimeout(function() {
									$rootScope.isVisible.loading = true;
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "cliente/get",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.cliente = data;
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

							$scope.excluir = function(cliente) {
								if(!confirm('Deseja Excluir o Cliente ?')) {
									return;
								}
								cliente.login = $scope.login;
								$scope.parametro.idCliente = cliente.id; 
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "cliente/excluir",
											method : "POST",
											contentType : "application/json",
											data : $scope.parametro
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
							
							////////////////////////////////////////////////////////
							
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
							
							$scope.getListCaptadorPorIdEmpresa = function() {
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
												$scope.captadores = data;
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
							
							$scope.getListSupervisorPorIdSupervisor = function() {
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
													+ "corretor/getListSupervisorPorIdSupervisor",
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
							
							$scope.getListCorretorPorIdSupervisor = function() {
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
													+ "corretor/getListCorretorPorIdSupervisor",
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
							
							$scope.getListCorretorPorIdCorretor = function() {
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
													+ "corretor/getListCorretorPorIdCorretor",
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
							
							$scope.getListSupervisorPorIdCorretor = function() {
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
													+ "corretor/getListSupervisorPorIdCorretor",
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

							$scope.getEmpresaPorId = function() {
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
												alert("ERRO no envio dos dados ! "
														+ erro == undefined ? ""
														: erro);
											})
									}, 100);

								})
							};

							$scope.cancelar = function() {
								$scope.index = true;
								$scope.cliente = {};
								$scope.cliente.captacao = "Selecione...";
							};
							if($scope.login.cargo == "Imobiliaria") {
								$scope.getListCorretorPorIdEmpresa();
								$scope.getListSupervisorPorIdEmpresa();
								$scope.getListCaptadorPorIdEmpresa();
							}
							if($scope.login.cargo == "Supervisor") {
								$scope.getListCorretorPorIdSupervisor();
								$scope.getListSupervisorPorIdSupervisor();
								$scope.getListCaptadorPorIdEmpresa();
							}
							if($scope.login.cargo == "Corretor") {
								$scope.getListCorretorPorIdCorretor();
								$scope.getListSupervisorPorIdCorretor();
								$scope.getListCaptadorPorIdEmpresa();
							}
							$scope.pesquisarPorNome();
							$scope.getEmpresaPorId();
							$scope.pesquisarSituacoes();
							$scope.pesquisarMidias();
						} ]);
