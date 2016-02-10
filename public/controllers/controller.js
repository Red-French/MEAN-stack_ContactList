// 'use strict'
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {
        console.log('Hello world from controller');

const refresh = () => {  // load/refresh the page
  $http.get('/contactList').success(function(response) {  // $http.get sends a request to the server
     console.log('I got the data I requested');
     $scope.contactList = response; // puts data into browser
     $scope.contact = '';  // clear input boxes

  });
};

refresh(); // get the data when page laods

$scope.addContact = function() {  // addContact refers to ng-click in index.html ('Add Contact' button)
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {  // fxn takes the response from the server as the argument
      // route='/contactlist'; '$http.post' sends input data from '$scope.contact' to the server
    console.log(response);
    refresh(); // refresh page
  });
};

$scope.remove = function (id) {
  console.log('id =', id);
  $http.delete('/contactlist/' + id).success(function (response) {  // on success, send response
    refresh();  // refresh page
  });
};

}]);
