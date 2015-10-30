var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope, $http) {
		console.log("hello");

		var refresh = function() {
				$http.get('/list').success(function(response) {
				console.log("got the data");
				$scope.list = response;
			});
		}
		
		refresh();
		$scope.addContact = function() {
			console.log($scope.contact);
			$http.post('/list', $scope.contact).success(function(response) {
				console.log(response);
				refresh();
			});
		};
		
		$scope.remove = function(id) {
			console.log(id);
			$http.delete('/list/' + id, $scope.contact).success(function(response) {
				refresh();
			});
		};
		$scope.edit = function(id) {
			console.log(id);
			$http.get('/list/' + id).success(function(response) {
				$scope.contact = response;
			});
		};

		$scope.update = function() {
			$http.put('/list/' + $scope.contact._id, $scope.contact).success(function(response) {
				refresh();
			});
		};

		$scope.clear = function() {
			$scope.contact = "";
		};

	}]);
