
/*var myapp = angular.module('customer',[]);
 

myapp.controller('c1',angController = function($scope){
    $scope.message = "This is Angular !!"; 
}); */

angular.module('test', []).controller('testCtrl', function ($scope, $http) {

  $scope.deleteUser = function(id){
    var id2 = id.target.attributes[1].nodeValue;
    console.log(id2);
    $http.delete('/users/delete/'+ id2)
    .success(function(data){
      console.log("Deleted successfull");
    })
    .then(function(){
      window.open("/","_self")
    });
    
  }
  $scope.editMode = false;
  

  

});