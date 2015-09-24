
angular.module('app', ['ionic'])
    .controller("contr", function($scope, ParseHttpService){
        $scope.itemList = {};

        ParseHttpService.getStuffList().then(function (_data) {
            $scope.itemList = _data;
        });

    })

            .service('ParseHttpService', function ($http) {



                var baseURL = "https://api.parse.com/1/";
                var authenticationHeaders = {
                    "x-parse-application-id": "bgwztVkn0JLGfN3ApVfNCRaJI5wM2C6zoTCgq4Vj",
                    "x-parse-rest-api-key": "k9Z1ChRIguYB2KrsLG1z0OdcsZVDxky2GwjHSgH8"
                };
                return {
                    /**
                     * [[Description]]
                     * @returns {Promise} [[Descri$scope.stuffList = {};

                     ParseHttpService.getStuff().then(function (_data) {
		$scope.stuffList = _data;
	});ption]]
                     */
                    login: function () {

                        var credentials = {
                            "username": "admin",
                            "password": "test"
                        };

                        var settings = {
                            method: 'GET',
                            url: baseURL + 'login',
                            headers: authenticationHeaders,
                            // params are for query string parameters
                            params: credentials
                        };

                        // $http returns a promise, which has a then function,
                        // which also returns a promise
                        return $http(settings)
                            .then(function (response) {
                                // In the response resp.data contains the result
                                // check the console to see all of the data returned
                                console.log('login', response);
                                return response.data;
                            });
                    },


                    getStuffList: function () {

                        var settings = {
                            method: 'GET',
                            url: baseURL + 'classes/stuff/',
                            headers: authenticationHeaders,
                        };

                        // $http returns a promise, which has a then function,
                        // which also returns a promise
                        return $http(settings)
                            .then(function (response) {
                                // In the response resp.data contains the result
                                // check the console to see all of the data returned
                                console.log('getStuff', response);
                                return response.data.results;
                            });
                    }
                }

            });

