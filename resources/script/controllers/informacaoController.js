var informacaoCtrl = angular.module('informacaoCtrl', []);
app.controller('informacaoCtrl', [
		'$scope',
		'$location',
		'$http',
		'$filter',
		
		'$rootScope',
		'usuarioServiceApp',
		function($scope, $location, $http, $filter, $rootScope, usuarioServiceApp) {
			
			$scope.logout = function() {
				window.location.href = CONTEXTO + "index.html";
			}
			$scope.sistema = 'CapiteWeb';
			$scope.login = usuarioServiceApp.popularLogin();
			$scope.informacao = {};
			$scope.informacoes = [];
			$scope.index = true;
			$scope.empresa = {};
			$scope.clientes = [];
			$scope.situacoes = [];
			$scope.empreendimentos = [];
			$scope.ligacoes = [];
			$scope.informacao.login = $scope.login;
			$scope.parametro = usuarioServiceApp.popularParametro();
			$scope.detalhe = false;
			$scope.idSituacao =0;
			$scope.totalRegistros = 0;
			$scope.totalSituacao = 0;
			$scope.edit = 'novo';
			$scope.filter = 'mes';
			
			 
			$scope.tmp = $scope.login.nome.split(" ");
			$rootScope.usuario = $scope.tmp[0].toUpperCase();
			
			$scope.detalhar = function(informacao) {
				$scope.informacaoDetalhe = informacao;
				$scope.detalhe = true;
			}

			$scope.desativarDetalhar = function() {
				$scope.detalhe = false;
			}

			$scope.alterar = function(informacao) {
				$scope.detalhe = false;
				$scope.informacao = informacao;
				$scope.index = false;
				$scope.edit = 'update';
				$scope.informacao.when = $filter('date')($scope.informacao.when,'dd/MM/yyyy HH:mm');
				//$scope.informacao.when = $scope.informacao.when.substring(8,10)+'/'+$scope.informacao.when.substring(5,7)+"/"+$scope.informacao.when.substring(0,4)+" "+$scope.informacao.when.substring(11,13)+":"+$scope.informacao.when.substring(14,16);
			}

			$scope.novo = function() {
				$scope.informacao = {};
				$scope.index = false;
				$scope.detalhe = false;
				$scope.edit = 'create';
			}
			

			$scope.salvar = function(informacao) {
				if($scope.edit == 'create') {
					$scope.create(informacao);
				} else {
					$scope.update(informacao);
				}
			}

			$scope.create = function(informacao) {
				informacao.macaddress = '11.11.11.11';
				informacao.type = 1;
				if(informacao.when == undefined || informacao.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = informacao.when;
				informacao.when = $scope.dateToGmt(informacao.when);
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/informacoes",
							method : "POST",
							contentType : "application/json",
							data : informacao
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.index = true;
							$scope.filter = 'mes';
							$scope.informacao.when = data;
							$scope.filtrarMes();
						}).error(
							function(erro) {
								informacao.when = $scope.data;
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.update = function(informacao) {
				informacao.macaddress = '11.11.11.11';
				informacao.type = 1;
				if(informacao.when == undefined || informacao.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = informacao.when;
				informacao.when = $scope.dateToGmt(informacao.when);
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/informacoes/"+informacao._id,
							method : "PUT",
							contentType : "application/json",
							data : informacao
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.informacao.when = $scope.data;
							$scope.index = true;
							$scope.filter = 'mes';
							$scope.filtrarMes();
						}).error(
							function(erro) {
								informacao.when = $scope.data;
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.filtrarMes = function() {
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/informacoes/filter/month/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.informacoes = data;
							$scope.totalRegistros = $scope.informacoes.length;
							$scope.filter = 'mes';
							  
						}).error(
							function(erro) {
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.filtrarDia = function() {
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/informacoes/filter/today/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.informacoes = data;
							$scope.totalRegistros = $scope.informacoes.length;
							$scope.filter = 'dia';
							  
						}).error(
							function(erro) {
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.filtrarAno = function() {
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/informacoes/filter/year/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.informacoes = data;
							$scope.totalRegistros = $scope.informacoes.length;
							$scope.filter = 'ano';
							  
						}).error(
							function(erro) {
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.filtrarTodos = function() {
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/informacoes/filter/all/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.informacoes = data;
							$scope.totalRegistros = $scope.informacoes.length;
							$scope.filter = 'todos';
							  
						}).error(
							function(erro) {
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};
			


			$scope.excluir = function(informacao) {
				if (!confirm('Deseja Excluir a Informação ?')) {
					return;
				}
				informacao.login = $scope.login;
				$rootScope.isVisible.loading = true;
				$scope.parametro.login.idinformacao = informacao.id;
				setTimeout(function() {
					setTimeout(function() {
						$http({
							url : URL + "/informacoes/"+informacao._id,
							method : "DELETE"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.filter = 'mes';
							$scope.filtrarMes();
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

			$scope.dateToGmt = function(data) {
				if(data.substring(2,3) == "/") {
					$scope.dia = data.substring(0,2);
					$scope.mes = data.substring(3,5);
					$scope.ano = data.substring(6,10);
					$scope.hora =data.substring(11,13);
					$scope.minu =data.substring(14,16);
				} else {
					$scope.dia = data.substring(0,2);
					$scope.mes = data.substring(2,4);
					$scope.ano = data.substring(4,8);
					$scope.hora =data.substring(8,10);
					$scope.minu =data.substring(10,12);
				}
				data = $scope.ano+"-"+$scope.mes+"-"+$scope.dia+"T"+$scope.hora+":"+$scope.minu;
				return data;
			}


			$scope.cancelar = function() {
				$scope.index = true;
			};

			$scope.filtrarMes();
		} ]);