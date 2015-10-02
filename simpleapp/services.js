app.service('ParseHttpService', function ($http) {


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
        },

        getObjectById: function (_id) {

            var settings = {
                headers: authenticationHeaders
            };

            // $http returns a promise, which has a then function,
            // which also returns a promise
            return $http.get(baseURL + 'classes/stuff/' + _id, settings)
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('getObjectById', response);
                    return response.data;
                });
        },

        addObject: function (_params) {

            // for POST, we only need to set the authentication header
            var settings = {
                headers: authenticationHeaders,
            };
            // for POST, we need to specify data to add, AND convert it to
            // a string before passing it in as seperate parameter data
            var dataObject = {
                "name": _params.name,
                "room": _params.room,
            };

            var dataObjectString = JSON.stringify(dataObject);

            // $http returns a promise, which has a then function
            return $http.post(baseURL + 'classes/stuff', dataObjectString, settings)
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('addObject', response);
                    return response.data;
                });
        },

        updateObject: function (_params) {

            // for POST, we only need to set the authentication header
            var settings = {
                headers: authenticationHeaders
            };
            // for POST, we need to specify data to add, AND convert it to
            // a string before passing it in as seperate parameter data

            var dataObject = {
                "name": (_params.name ? _params.name : JSON.null),
                "room": (_params.room ? _params.room : JSON.null)
            };

            var dataObjectString = JSON.stringify(dataObject);

            var apiUrl = baseURL + 'classes/stuff/' + _params.objectId;

            // $http returns a promise, which has a then function,
            // which also returns a promise
            return $http.put(apiUrl, dataObjectString, settings)
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('updateObject', response);
                    return response.data;
                });
        },

        deleteObjectById: function (_id) {

            var settings = {
                headers: authenticationHeaders
            };

            // $http returns a promise, which has a then function,
            // which also returns a promise
            return $http.delete(baseURL + 'classes/stuff/' + _id, settings)
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('deleteObjectById', response);
                    return response.data;
                });
        },






    }

});

