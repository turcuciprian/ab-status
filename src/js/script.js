(function() {
    //debug variable
    var debug = true;
    //The main module
    var slo = angular.module('slo', ['ui.bootstrap', 'ngAnimate', 'ngStorage']);
    // pcs.run(function($rootScope, $templateCache) {
    //     $rootScope.$on('$viewContentLoaded', function() {
    //         $templateCache.removeAll();
    //     });
    // });
    if (debug) {
        console.log('Module slo initiated');
    }

    var mainCtrl = slo.controller('mainCtrl', ['$scope', '$log', '$http', '$localStorage', function($scope, $log, $http, $localStorage) {
        if (debug) {
            console.log('inside controller');
        }
        $scope.totalUsers = '';
        $scope.latestUser = '';
        $scope.rootPath = '';
        var abUrl = String(document.location.href);

        if (abUrl.indexOf('localhost') > 0) {
            $scope.rootPath = 'http://localhost:8888/wordpress';

        } else {
            $scope.rootPath = 'http://server.admin-builder.com';
        }
        $scope.updatePage = function() {
          $scope.totalUsers = 'Loading...';
          $scope.latestUser = 'Loading...';
            $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: $scope.rootPath + '/wp-json/ab/getAdminStatus',
            }).then(function successCallback(response) {
                console.log(response.data.latest);
                $scope.totalUsers = response.data.users.total_users;
                $scope.latestUsers = response.data.latest;

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                return false;
            });
        };
        $scope.updatePage();



    }]);
})();
