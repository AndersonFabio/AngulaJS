var novidadeCtrl = angular.module('novidadeCtrl', []);
app.controller('novidadeCtrl', [
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
			$scope.CONTEXTO = CONTEXTO;
			$scope.sistema = 'CapiteWeb';
			$scope.login = usuarioServiceApp.popularLogin();
			$scope.novidade = {};
			$scope.novidades = [];
			$scope.index = true;
			$scope.parametro = usuarioServiceApp.popularParametro();
			$scope.detalhe = false;
			$scope.idSituacao =0;
			$scope.totalRegistros = 0;
			$scope.totalSituacao = 0;
			$scope.edit = 'novo';
			$scope.filter = 'mes';
				
			var searchObject = $location.search();


			
			$scope.detalhar = function(novidade) {
				$scope.novidadeDetalhe = novidade;
				$scope.detalhe = true;
			}

			$scope.desativarDetalhar = function() {
				$scope.detalhe = false;
			}

			$scope.alterar = function(novidade) {
				$scope.detalhe = false;
				$scope.novidade = novidade;
				$scope.index = false;
				$scope.edit = 'update';
				$scope.novidade.when = $filter('date')($scope.novidade.when,'dd/MM/yyyy HH:mm');
				//$scope.novidade.when = $scope.novidade.when.substring(8,10)+'/'+$scope.novidade.when.substring(5,7)+"/"+$scope.novidade.when.substring(0,4)+" "+$scope.novidade.when.substring(11,13)+":"+$scope.novidade.when.substring(14,16);
			};

			$scope.novo = function() {
				$scope.novidade = {};
				$scope.index = false;
				$scope.detalhe = false;
				$scope.edit = 'create';
			}
			

			$scope.salvar = function(novidade) {
				$location.search('fname', null);
				$location.search('id', null); 

				if($scope.edit == 'create') {
					$scope.create(novidade);
				} else {
					$scope.update(novidade);
				}
			}

			$scope.create = function(novidade) {
				novidade.macaddress = '11.11.11.11';
				novidade.type = 1;
				if(novidade.when == undefined || novidade.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = novidade.when;
				novidade.when = $scope.dateToGmt(novidade.when);

				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/novidades",
							method : "POST",
							contentType : "application/json",
							data : novidade
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidade = data;
							$scope.novidade.when = $scope.data;
							$scope.index = false;
							$scope.edit = 'update';
						}).error(
							function(erro) {
								novidade.when = $scope.data;
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.update = function(novidade) {
				novidade.macaddress = '11.11.11.11';
				novidade.type = 1;
				if(novidade.when == undefined || novidade.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = novidade.when;

				novidade.when = $scope.dateToGmt(novidade.when);
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/novidades/"+novidade._id,
							method : "PUT",
							contentType : "application/json",
							data : novidade
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidade = data;
							$scope.novidade.when = $scope.data;
							$scope.index = false;
							$scope.edit = 'update';
						}).error(
							function(erro) {
								novidade.when = $scope.data;
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.buscarPorId = function(id) {
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/novidades/"+id,
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidade = data;
							$scope.novidade.when = $filter('date')($scope.novidade.when,'dd/MM/yyyy HH:mm');
							if(searchObject.fname != undefined && searchObject.fname != "") {
								$scope.novidade.url = searchObject.fname;
							}

							$scope.alterar($scope.novidade);
							$scope.update($scope.novidade);
 
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


			$scope.filtrarMes = function() {
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/novidades/filter/month/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidades = data;
							$scope.totalRegistros = $scope.novidades.length;
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
							url : URL + "/novidades/filter/today/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidades = data;
							$scope.totalRegistros = $scope.novidades.length;
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
							url : URL + "/novidades/filter/year/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidades = data;
							$scope.totalRegistros = $scope.novidades.length;
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
							url : URL + "/novidades/filter/all/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.novidades = data;
							$scope.totalRegistros = $scope.novidades.length;
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
			


			$scope.excluir = function(novidade) {
				if (!confirm('Deseja Excluir o novidademento ?')) {
					return;
				}
				novidade.login = $scope.login;
				$rootScope.isVisible.loading = true;
				$scope.parametro.login.idnovidade = novidade.id;
				setTimeout(function() {
					setTimeout(function() {
						$http({
							url : URL + "/novidades/"+novidade._id,
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

			if(searchObject.id != undefined && searchObject.id != "") {
				$scope.filtrar = false;
				$scope.buscarPorId(searchObject.id);
			}

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
				$location.search('fname', null);
				$location.search('id', null); 
				$scope.filtrarMes();

			};
			$scope.filtrarMes();

		} ]);