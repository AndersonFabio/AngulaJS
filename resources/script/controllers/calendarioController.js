var agendaCtrl = angular.module('calendarioCtrl', []);
app.controller('calendarioCtrl', [
		'$scope',
		'$location',
		'$http',
		'$filter',
		
		'$rootScope',
		'usuarioServiceApp',
		function($scope, $location, $http, $filter, $rootScope, usuarioServiceApp) {
	
				
			$scope.agendamentos = function() {
				$location.path('/agenda');
			}

			$scope.formLeadgen = function() {
				$location.path('/formLeadgen');
			}
			
			$scope.conta = function() {
				$location.path('/conta');
			}
			
			$scope.empreendimento = function() {
				$location.path('/empreendimento');
			}
			$scope.cliente = function() {
				$location.path('/cliente');
			}
			
			$scope.painel = function() {
				$location.path('/painel');
			}
			
			$scope.cadastrarSituacao = function() {
				$location.path('/situacao');
			}
			
			$scope.cadastrarMidia = function() {
				$location.path('/midia');
			}
			
			$scope.captacao = function() {
				$location.path("/captacao");
			}
			
			$scope.vincularCorretor = function() {
				$location.path('/vincularCorretor');
			}
			
			$scope.vincularSupervisor = function() {
				$location.path('/vincularSupervisor');
			}
			
			$scope.resumoPorCorretor = function() {
				$location.path('/resumoPorCorretor');
			}
			
			$scope.resumoPorSituacao = function() {
				$location.path('/resumoPorSituacao');
			}
			
			$scope.gestao = function() {
				$location.path('/gestao');
			}
			
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
			
			$scope.alterar = function(agenda) {
				$scope.detalhe = false;
				$scope.agenda = agenda;
				$scope.agenda.login = $scope.login;
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
				agenda.when = agenda.when.substring(4,8
					)+'-'+agenda.when.substring(2,4)+'-'+agenda.when.substring(0,2)+'T'+agenda.when.substring(8,10)+':'+agenda.when.substring(10,13);
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
				agenda.when = agenda.when.substring(4,8
					)+'-'+agenda.when.substring(2,4)+'-'+agenda.when.substring(0,2)+'T'+agenda.when.substring(8,10)+':'+agenda.when.substring(10,13);
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




			$scope.cancelar = function() {
				$scope.index = true;
			};

			$scope.filtrarMes();
		} ]);