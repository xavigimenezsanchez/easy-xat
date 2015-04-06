angular.module('xatApp')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: 'inici.html',
                autoritzat: false
            })
            .when("/user", {
                controller: "NickController",
                templateUrl: 'user.html',
                autoritzat: false
            })
            .when("/xat", {
                controller: "XatControler",
                templateUrl: 'xat.html',
                autoritzat: true
            })
            .otherwise({
                redirectTo: '/'
            });
            $locationProvider.html5Mode({
                          enabled: true,
                          requireBase: false
            });
    })
    .run(function($rootScope,SocketSrv) {
        $rootScope.$on('$routeChangeStart', function(event, next) {
           if (next)
                if (!SocketSrv.auth & next.autoritzat) 
                    event.preventDefault();
        });
    });