var corretorCtrl = angular.module('corretorCtrl', []);
appAgenda.controller(
				'corretorCtrl',
				[
						'$scope',
						'$http',
						'$routeParams',
						'$location','usuarioService','$rootScope',
						function($scope, $http, $routeParams, $location, usuarioService,$rootScope) {
							$scope.sistema = 'CapiteWeb';
							$scope.corretor = {};
							$scope.corretor.situacao = "Disponivel";
							$scope.corretors = [];
							$scope.index = false;
							$scope.empresa = {};
							$scope.login = usuarioService.popularLogin();
							$scope.corretor.login = $scope.login;
							$scope.parametro = usuarioService.popularParametro();
							
							$scope.alterar = function(corretor) {
								$scope.corretor = corretor;
								$scope.corretor.login = $scope.login;
								$scope.index = false;
							}
							
							$scope.novo = function() {
								$scope.corretor = {};
								$scope.corretor.login = $scope.login;
								$scope.corretor.idEmpresa = $scope.empresa.id;
								$scope.index = false;
							}
							
							$scope.cancelar = function() {
								$location.path("/agenda");
							}

							$scope.salvar = function(corretor,empresa) {
								$rootScope.isVisible.loading = true;
								if($scope.login.email == "contato@capiteweb.com.br") {
									alert("Sistema Demonstração!");
									$rootScope.isVisible.loading = false;
									return false;
								}
								var url = "";
								var data = {};
								if($scope.login.cargo == "Imobiliaria") {
									url = URL+"empresa/salvar";
									data = empresa;
									$scope.login.email = empresa.email;
									$scope.login.senha = empresa.senha;
									usuarioService.salvarLogin($scope.login);
								} else {
									url = URL+"corretor/salvar";
									data = corretor;
									$scope.login.email = corretor.email;
									$scope.login.senha = corretor.senha;
									usuarioService.salvarLogin($scope.login);
								}

								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : url,
											method : "POST",
											contentType : "application/json",
											data : data
										})
										.success(
											function(data) {
												$rootScope.isVisible.loading = false;
												$scope.index = true;
												$location.path("/agenda");
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
							  
							
							$scope.pagarAgenda = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "checkout/pagarAgenda",
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
							
							$scope.pagarLeads = function() {
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "checkout/pagarLeads",
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


							$scope.excluir = function(corretor) {
								if(!confirm('Deseja Excluir o Corretor ?')) {
									return;
								}
								corretor.login = $scope.login;
								$scope.parametro.idCorretor = corretor.id; 
								$rootScope.isVisible.loading = true;
								setTimeout(function() {
									setTimeout(
									function() {
										$http(
										{
											url : URL
													+ "corretor/excluir",
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



							if($scope.login.cargo != "Imobiliaria") {
								$scope.carregarCorretor();
							}
							$scope.carregarEmpresa();
							$scope.getEmpresaPorId();
						} ]);
