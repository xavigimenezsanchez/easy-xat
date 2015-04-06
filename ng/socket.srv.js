angular.module('xatApp')
    .factory('SocketSrv', function($rootScope) {
        var socket = io().connect();
        socket.on('connect',function(s) {

            $rootScope.$broadcast('connected');
            $rootScope.$apply(); //This tells AngularJS that it needs to check the state of the application and update the templates
        });
        var nick;
        return {
            user: function(name) {
                socket.emit('newUser',name);
                $rootScope.$broadcast('newUserOk');
                
                nick = name;
                this.auth = true;
            },
            getNick: function() {
                return nick;
            },
            disconnect: function(callback) {
                socket.disconnec();
                $rootScope.$apply(function() {
                    callback.apply(socket); 
                });
                this.auth = false;
            },
            sendMessage: function(msg) {
                socket.emit('message',msg);
            },
            getMessage: function(callback) {
                socket.on('message',function(m) {
                    console.log(m);
                    $rootScope.$apply(function() {
                        callback(m);
                    });
                    
                });
            },
            connected: function() {
                return socket.connected;
            },
            auth: false
        };
    });
    
    /* Puc fer mètodes per crear usuari, enviar missatge, sortir.
    /* http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
    
    /*Notice that we wrap each socket callback in $scope.$apply. This tells AngularJS that it needs to check the state of the application and update the templates if there was a change after running the callback passed to it. Internally, $http works in the same way; after some XHR returns, it calls $scope.$apply, so that AngularJS can update its views accordingly.*/
    
  /*  
            on: function (eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$appy(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
        */