var cadastrarCtrl = angular.module('cadastrarCtrl', []);
app.controller('cadastrarCtrl', ['$scope', '$http','$routeParams', '$location','$rootScope',
    function($scope, $http, $routeParams , 	$location,$rootScope) {
			$scope.sistema = 'CapiteWeb';
				$scope.corretor = {};
				$scope.corretors = [];
				$scope.index = true;
				$scope.edit  = true;
				$scope.empresas = [];
				$scope.corretor.cargo = 'Selecione...'
				$scope.empresa = {};
				$scope.indicacoes = ["André Concha","Marcelo Perioto","Mariana da Silva","Outros"];
				$scope.formname = 'Usuário';
				var data = new Date();
				$scope.data = data;
				$scope.editar = function(editar) {
					if(editar == true) {
						$scope.index = false;
						$scope.edit  = true;
					} else {
						$scope.index = true;
						$scope.edit  = false;
					}
				}
				
				
				
				$scope.novo = function() {
					$scope.corretor = {};
					$scope.editar(true);
				}
				
			    $scope.salvar = function (corretor, empresa) {
			    	if($scope.corretor.cargo == 'Corretor' || $scope.corretor.cargo == 'Supervisor') {
				    	if($scope.corretor.email == undefined || $scope.corretor.email == "") {
				    		alert("Informe seu email !");
				    		return false;
				    	}
			    	}
			    	if($scope.corretor.cargo == 'Imobiliaria') {
				    	if($scope.empresa.email == undefined || $scope.empresa.email == "") {
				    		alert("Informe seu email !");
				    		return false;
				    	}
			    	}
			    	if($scope.corretor.cargo == 'Corretor' || $scope.corretor.cargo == 'Supervisor') {
				    	if($scope.corretor.senha != $scope.corretor.senha2 || $scope.corretor.senha == "" || $scope.corretor.senha == null || $scope.corretor.senha == undefined) {
				    		alert("Confirmação de Senha Inválida !");
				    		return;
				    	}
			    	}
			    	if($scope.corretor.cargo == 'Imobiliaria' ) {
				    	if($scope.empresa.senha != $scope.empresa.senha2 || $scope.empresa.senha == "" || $scope.empresa.senha == null || $scope.empresa.senha == undefined) {
				    		alert("Confirmação de Senha Inválida !");
				    		return;
				    	}
			    	}
			    	if($scope.corretor.cargo == 'Corretor' || $scope.corretor.cargo == 'Supervisor') {
			    		$scope.buscarporemailcorretor(corretor);
			    	}
			    	if($scope.corretor.cargo == 'Imobiliaria') {
			    		$scope.buscarporemailempresa(empresa);
			    	}
			    }; 
			    	
			    $scope.buscarporemailcorretor = function(corretor) {
			    	$rootScope.isVisible.loading = true;
			    	setTimeout(function() {
						$http({
							url: URL+"corretor/getbyemail",
							method: "GET",
							contentType: "application/json",
							params : {"email" : corretor.email}
						}).success(function (data) {
							$rootScope.isVisible.loading = false;
							if(data.email == corretor.email) {
								alert('Email já cadastrado !');
								return true;
							} else {
								setTimeout(function() {
									$http({
										url: URL+"corretor/salvar",
										method: "POST",
										contentType: "application/json",
										data : corretor
									}).success(function (data) {
										alert("Corretor cadastrado com Sucesso!")
										
										
										$location.path('/login');
									}).error( function (erro) {
										$rootScope.isVisible.loading = false;
										alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
											})},100);
								
							}
						}).error( function (erro) {
							$rootScope.isVisible.loading = false;
							alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
								})},100);
			    }
			    
			    
			    
			    $scope.getCep1 = function(cep) {
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
			    			$("#Endereco").val(unescape(data.endereco));
			            	//$("#Endereco").change();
			                $("#Bairro").val(unescape(data.bairro));
			                //$("#Bairro").change();
			                $("#Cidade").val(unescape(data.cidade));
			                $("#Estado").val(unescape(data.uf));
			                $("#Numero").focus();
							
							
						}).error( function (erro) {
							$rootScope.isVisible.loading = false;
							alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
								})},100);
					
				}
			    
			    $scope.getCep2 = function(cep) {
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
			    			$("#Endereco2").val(unescape(data.endereco));
			            	//$("#Endereco").change();
			                $("#Bairro2").val(unescape(data.bairro));
			                //$("#Bairro").change();
			                $("#Cidade2").val(unescape(data.cidade));
			                $("#Estado2").val(unescape(data.uf));
			                $("#Numero2").focus();
							
							
						}).error( function (erro) {
							$rootScope.isVisible.loading = false;
							alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
								})},100);
					
				}
			    
			    $scope.buscarporemailempresa = function(empresa) {
			    	$rootScope.isVisible.loading = true;
			    	setTimeout(function() {
						$http({
							url: URL+"empresa/getbyemail",
							method: "GET",
							contentType: "application/json",
							params : {"email" : empresa.email}
						}).success(function (data) {
							$rootScope.isVisible.loading = false;
							if(data.email == empresa.email) {
								alert('Email já cadastrado !');
								return true;
							} else {
								setTimeout(function() {
									$http({
										url: URL+"empresa/salvar",
										method: "POST",
										contentType: "application/json",
										data : empresa
									}).success(function (data) {
										alert("Imobiliária cadastrada com Sucesso!")
										$location.path('/login');
									}).error( function (erro) {
										alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
											})},100);
								
							}
						}).error( function (erro) {
							$rootScope.isVisible.loading = false;
							alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
								})},100);
			    }
			    $scope.cancelar = function () {
			        $scope.editar(true);
			        $scope.corretor = {};
			        $scope.empresa = {};
			        $scope.corretor.cargo = "Selecione...";
			        
			    };
			    
	 
}]
);
	
