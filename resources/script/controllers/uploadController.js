app.directive('myDirective', function (httpPostFactory) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attr) {

            element.bind('change', function () {
                var formData = new FormData();
                formData.append('file', element[0].files[0]);
                httpPostFactory('http://localhost:21137/api/image', formData, function (callback) {
                   // recieve image name to use in a ng-src 
                    console.log(callback);
                });
            });

        }
    };
});

app.factory('httpPostFactory', function ($http) {
    return function (file, data, callback) {
        $http({
            url: file,
            method: "POST",
            data: data,
            headers: {'Content-Type': undefined}
        }).success(function (response) {
            callback(response);
        });
    };
});












/*angular.module('ngdemoApp', []).directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          element.bind('change', function(){
          $parse(attrs.fileModel).assign(scope,element[0].files)
             scope.$apply();
          });
       }
    };
 }]).controller('uploadCtrl', ['$scope', '$http', function($scope, $http){


   $scope.uploadFile=function(){
   var fd=new FormData();
    console.log($scope.files);
    angular.forEach($scope.files,function(file){
    fd.append('file',file);
    });
   $http.post('http://localhost:1337/mediaobject/upload',fd,
       {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}                     
        }).success(function(d)
            {
                console.log(d);
            })         
   }
 }]);*/