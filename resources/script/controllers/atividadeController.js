var AtividadeCtrl = angular.module('atividadeCtrl', []);
app.controller('atividadeCtrl', [
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
			$scope.atividade = {};
			$scope.atividades = [];
			$scope.index = true;
			$scope.parametro = usuarioServiceApp.popularParametro();
			$scope.detalhe = false;
			$scope.idSituacao =0;
			$scope.totalRegistros = 0;
			$scope.totalSituacao = 0;
			$scope.edit = 'novo';
			$scope.filter = 'mes';
				
			var searchObject = $location.search();


			
			$scope.detalhar = function(atividade) {
				$scope.atividadeDetalhe = atividade;
				$scope.detalhe = true;
			}

			$scope.desativarDetalhar = function() {
				$scope.detalhe = false;
			}

			$scope.alterar = function(atividade) {
				$scope.detalhe = false;
				$scope.atividade = atividade;
				$scope.index = false;
				$scope.edit = 'update';
				$scope.atividade.when = $filter('date')($scope.atividade.when,'dd/MM/yyyy HH:mm');
				//$scope.Atividade.when = $scope.Atividade.when.substring(8,10)+'/'+$scope.Atividade.when.substring(5,7)+"/"+$scope.Atividade.when.substring(0,4)+" "+$scope.Atividade.when.substring(11,13)+":"+$scope.Atividade.when.substring(14,16);
			};

			$scope.novo = function() {
				$scope.atividade = {};
				$scope.index = false;
				$scope.detalhe = false;
				$scope.edit = 'create';
			}
			

			$scope.salvar = function(atividade) {
				$location.search('fname', null);
				$location.search('id', null); 

				if($scope.edit == 'create') {
					$scope.create(atividade);
				} else {
					$scope.update(atividade);
				}
			}

			$scope.create = function(atividade) {
				atividade.macaddress = '11.11.11.11';
				atividade.type = 1;
				if(atividade.when == undefined || atividade.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = atividade.when;
				atividade.when = $scope.dateToGmt(atividade.when);

				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/atividade",
							method : "POST",
							contentType : "application/json",
							data : atividade
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividade = data;
							$scope.atividade.when = $scope.data;
							$scope.index = false;
							$scope.edit = 'update';
						}).error(
							function(erro) {
								atividade.when = $scope.data;
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.update = function(atividade) {
				atividade.macaddress = '11.11.11.11';
				atividade.type = 1;
				if(atividade.when == undefined || atividade.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = atividade.when;

				atividade.when = $scope.dateToGmt(atividade.when);
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/atividade/"+atividade._id,
							method : "PUT",
							contentType : "application/json",
							data : atividade
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividade = data;
							$scope.atividade.when = $scope.data;
							$scope.index = false;
							$scope.edit = 'update';
						}).error(
							function(erro) {
								atividade.when = $scope.data;
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
							url : URL + "/atividade/"+id,
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividade = data;
							$scope.atividade.when = $filter('date')($scope.atividade.when,'dd/MM/yyyy HH:mm');
							if(searchObject.fname != undefined && searchObject.fname != "") {
								$scope.atividade.url = searchObject.fname;
							}

							$scope.alterar($scope.atividade);
							$scope.update($scope.atividade);
 
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
							url : URL + "/atividade/filter/month/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividades = data;
							$scope.totalRegistros = $scope.atividades.length;
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
							url : URL + "/atividade/filter/today/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividades = data;
							$scope.totalRegistros = $scope.atividades.length;
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
							url : URL + "/atividade/filter/year/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividades = data;
							$scope.totalRegistros = $scope.atividades.length;
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
							url : URL + "/atividade/filter/all/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.atividades = data;
							$scope.totalRegistros = $scope.atividades.length;
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
			


			$scope.excluir = function(atividade) {
				if (!confirm('Deseja Excluir o Atividademento ?')) {
					return;
				}
				
				$rootScope.isVisible.loading = true;
				$scope.parametro.login.idAtividade = atividade.id;
				setTimeout(function() {
					setTimeout(function() {
						$http({
							url : URL + "/atividade/"+atividade._id,
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
			$scope.filtrarTodos();

		} ]);