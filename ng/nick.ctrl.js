angular.module('xatApp')
    .controller('NickController',function ($scope,SocketSrv,$location) {
        $scope.entrar = function(){
            console.log($scope.nick);
            SocketSrv.user($scope.nick);
        };
        $scope.$on('newUserOk', function() {
            $location.path('/xat');
        });
    });