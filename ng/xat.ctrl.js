angular.module('xatApp')
    .controller('XatControler', function($scope,SocketSrv) {
        $scope.missatges = [];
        $scope.contador = 0;
        
        SocketSrv.getMessage(function(m) {
            $scope.missatges.push({'pos':$scope.contador++,'missatge':m});
            
        });
        $scope.enviar = function() {
            SocketSrv.sendMessage($scope.missatge);
        };
    });