var agendaCtrl = angular.module('agendaCtrl', []);
app.controller('agendaCtrl', [
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
			$scope.agenda = {};
			$scope.agenda.agendado = true;
			$scope.agendas = [];
			$scope.index = true;
			$scope.empresa = {};
			$scope.clientes = [];
			$scope.situacoes = [];
			$scope.empreendimentos = [];
			$scope.ligacoes = [];
			$scope.agenda.login = $scope.login;
			$scope.parametro = usuarioServiceApp.popularParametro();
			$scope.detalhe = false;
			$scope.idSituacao =0;
			$scope.totalRegistros = 0;
			$scope.totalSituacao = 0;
			$scope.edit = 'novo';
			$scope.filter = 'mes';
			
			 
			$scope.tmp = $scope.login.nome.split(" ");
			$rootScope.usuario = $scope.tmp[0].toUpperCase();
			
			$scope.detalhar = function(agenda) {
				$scope.agendaDetalhe = agenda;
				$scope.detalhe = true;
			}

			$scope.desativarDetalhar = function() {
				$scope.detalhe = false;
			}

			$scope.alterar = function(agenda) {
				$scope.detalhe = false;
				$scope.agenda = agenda;
				$scope.index = false;
				$scope.edit = 'update';
				$scope.agenda.when = $filter('date')($scope.agenda.when,'dd/MM/yyyy HH:mm');
				//$scope.agenda.when = $scope.agenda.when.substring(8,10)+'/'+$scope.agenda.when.substring(5,7)+"/"+$scope.agenda.when.substring(0,4)+" "+$scope.agenda.when.substring(11,13)+":"+$scope.agenda.when.substring(14,16);
			}

			$scope.novo = function() {
				$scope.agenda = {};
				$scope.index = false;
				$scope.detalhe = false;
				$scope.edit = 'create';
			}
			

			$scope.salvar = function(agenda) {
				if($scope.edit == 'create') {
					$scope.create(agenda);
				} else {
					$scope.update(agenda);
				}
			}

			$scope.create = function(agenda) {
				agenda.macaddress = '11.11.11.11';
				agenda.type = 1;
				if(agenda.when == undefined || agenda.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = agenda.when;
				agenda.when = $scope.dateToGmt(agenda.when);
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/task",
							method : "POST",
							contentType : "application/json",
							data : agenda
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.index = true;
							$scope.filter = 'mes';
							$scope.agenda.when = data;
							$scope.filtrarMes();
						}).error(
							function(erro) {
								agenda.when = $scope.data;
								$rootScope.isVisible.loading = false;
								alert("ERRO no envio dos dados ! "
										+ erro == undefined ? ""
										: erro.error);
							})
					}, 100);

				})
			};

			$scope.update = function(agenda) {
				agenda.macaddress = '11.11.11.11';
				agenda.type = 1;
				if(agenda.when == undefined || agenda.when == "") {
					alert("Informe a Data!");
					return false;
				}
				$scope.data = agenda.when;
				agenda.when = $scope.dateToGmt(agenda.when);
				setTimeout(function() {
					$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url : URL + "/task/"+agenda._id,
							method : "PUT",
							contentType : "application/json",
							data : agenda
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.agenda.when = $scope.data;
							$scope.index = true;
							$scope.filter = 'mes';
							$scope.filtrarMes();
						}).error(
							function(erro) {
								agenda.when = $scope.data;
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
							url : URL + "/task/filter/month/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.agendas = data;
							$scope.totalRegistros = $scope.agendas.length;
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
							url : URL + "/task/filter/today/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.agendas = data;
							$scope.totalRegistros = $scope.agendas.length;
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
							url : URL + "/task/filter/year/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.agendas = data;
							$scope.totalRegistros = $scope.agendas.length;
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
							url : URL + "/task/filter/all/11.11.11.11",
							method : "GET"
						}).success(function(data) {
							$rootScope.isVisible.loading = false;
							$scope.agendas = data;
							$scope.totalRegistros = $scope.agendas.length;
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
			


			$scope.excluir = function(agenda) {
				if (!confirm('Deseja Excluir o Agendamento ?')) {
					return;
				}
				agenda.login = $scope.login;
				$rootScope.isVisible.loading = true;
				$scope.parametro.login.idAgenda = agenda.id;
				setTimeout(function() {
					setTimeout(function() {
						$http({
							url : URL + "/task/"+agenda._id,
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