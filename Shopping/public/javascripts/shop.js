/* global angular */
angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.items = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/shopping').success(function(data){
				angular.copy(data, $scope.items);
			});
    };
    $scope.getAll();
    $scope.create = function(item) {
			return $http.post('/shopping', item).success(function(data){
				$scope.items.push(data);
			});
    };
    $scope.order = function() {
      console.log("In Order");
      angular.forEach($scope.items, function(value,key) {
        if(value.selected) {
          $scope.upOrder(value);
          $scope.cart.push(value);
        }
      });
    };
    $scope.upOrder = function(item) {
      return $http.put('/shopping/' + item._id + '/upOrder')
        .success(function(data){
          console.log("upOrder worked");
          item.Ordered += 1;
        });
    };
    $scope.addItem = function() {
      var newObj = {Name:$scope.name, Price:$scope.price, Ordered:0, Picture:$scope.picture};
      $scope.create(newObj);
      $scope.name = '';
      $scope.price = '';
      $scope.picture = '';
    };
    $scope.incrementOrder = function(item) {
      $scope.upOrder(item);
    };
    $scope.delete = function(item) {
      console.log("Deleting Name "+item.Name+" ID "+item._id);
      $http.delete('/shopping/'+item._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);