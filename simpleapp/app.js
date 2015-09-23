
angular.module('app', ['ionic'])
    .controller("contr", function($scope, ParseHttpService){
        $scope.trying = "i tried";
        ParseHttpService.login();
        $scope.itemsList = ["Preksha", "Koirala"];
        console.log(trying);



        $scope.doLogin = function () {
            return ParseHttpService.login().then(function (_response) {
                $scope.currentUser = _response;
                $scope.apiResponseData = _response;
                console.log("LOGGED IN");

            }, _alertHandler);
        }


        $scope.getStuffList = function () {
            return ParseHttpService.getStuff("").then(function (_response) {
                $scope.apiResponseData = _response;
                console.log("GOT THE DATA")
                itemList.push(_response.data)
                console.log (itemList);
            }, _alertHandler);
        }


        $scope.getStuff = function (_id) {
            return ParseHttpService.getStuff(_id).then(function (_response) {
                $scope.apiResponseData = _response;
            }, _alertHandler);
        }

            .run(function ($ionicPlatform) {
                $ionicPlatform.ready(function () {
                    // Hide the accessory bar by default (remove this to show the accessory
                    // bar above the keyboard for form inputs)
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    }
                    if (window.StatusBar) {
                        StatusBar.styleDefault();
                    }
                });
            })


            .service('ParseHttpService', function ($http) {
                //  var itemList = [];

                itemList.push({
                    "name": "big screen TV",
                    "room": "Basement"
                });


                var baseURL = "https://api.parse.com/1/";
                var authenticationHeaders = {
                    "x-parse-application-id": "bgwztVkn0JLGfN3ApVfNCRaJI5wM2C6zoTCgq4Vj",
                    "x-parse-rest-api-key": "k9Z1ChRIguYB2KrsLG1z0OdcsZVDxky2GwjHSgH8"
                };
                return {
                    /**
                     * [[Description]]
                     * @returns {Promise} [[Description]]
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


                    getStuffList: function (_id) {

                        // if an id is passed in then use it when querying
                        // stuff data
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
                                return response.data;
                            });
                    }
                }

            });
    });
