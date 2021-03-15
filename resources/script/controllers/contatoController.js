app.controller('contatoCtrl', ['$scope', '$http','$routeParams', '$location','$rootScope',
    function($scope, $http, $routeParams , 	$location,$rootScope) {
			$scope.sistema = 'CapiteWeb';
				$scope.contato = {};
				$scope.contatos = [];
				$scope.index = true;
				$scope.edit  = true;
				$scope.formname = 'Contato';
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
					$scope.contato = {};
					$scope.editar(true);
				}
				
			    $scope.salvar = function (contato) {
			    	$rootScope.isVisible.loading = true;
					setTimeout(function() {
						$http({
							url: URL+"contato/salvar",
							method: "POST",
							contentType: "application/json",
							data : contato
						}).success(function (data) {
							$rootScope.isVisible.loading = false;
							alert("Contato Enviado com Sucesso!")
					        $scope.cancelar();
						}).error( function (erro) {
							alert("ERRO no envio dos dados ! "+erro == undefined ? "" : erro);
						})},100);
			    }; 
			
			    $scope.cancelar = function () {
			        $scope.editar(true);
			        $scope.contato = [];
			    };
		
}]
);
	
