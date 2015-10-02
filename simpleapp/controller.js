app.controller("contr", function ($scope, $state, ParseHttpService) {
    $scope.itemList = {};
    $scope.stateInfo = $state.current;
    $scope.params = $state.params;

    $scope.inputItem = {
        value: "",
        name: "",
        room: ""
    };

    ParseHttpService.getStuffList().then(function (_data) {
        console.log("got data");
        $scope.itemList = _data;
    });


    $scope.addItem = function addItem() {

        // separate the values you get from the ng-model
        // on the input field
        var data = $scope.inputItem.value.split(",");

        if (data.length === 2) {
            $scope.inputItem.name = data[0].trim();
            $scope.inputItem.room = data[1].trim();

            ParseHttpService.addObject($scope.inputItem)
                .then(function itemSaved(_newItem) {
                    //alert("Item Saved", _newItem.objectId);
                    $scope.inputItem = {};

                    return populateList();

                }, function errorSaving(_error) {
                    $scope.inputItem = {};
                });
        } else {
            //  alert("Invalid Input: " + $scope.inputItem.value);
            $scope.inputItem = {};
        }
    };


    $scope.editObject = function editObject(_object) {

        var data = null;
        var editedObject = {};
        var objectData = prompt("Enter the Edited Information", _object.name + ", " + _object.room);

        // check if the user entered some data
        if (objectData !== null) {
            // separate the values
            data = objectData.split(",");
        }

        // check if the user entered some data and if i got two items
        // back when I split the data for name and room value
        if (objectData && (data.length === 2)) {

            // create object parameters to save
            editedObject.name = data[0].trim();
            editedObject.room = data[1].trim();
            editedObject.objectId = _object.objectId;

            console.log(JSON.stringify(editedObject));

            ParseHttpService.updateObject(editedObject)
                .then(function itemUpdated(_updatedItem) {
                    //  alert("Item Updated " + _updatedItem.objectId);

                    return populateList();



                }, function errorSaving(_error) {
                    // alert("Error Editing Object " + _error)
                });
        } else {
            if (objectData !== null) {
                // alert("Invalid Input: " + objectData);
            }
        }
    };


    function populateList() {
        return ParseHttpService.getStuffList().then(function (_listData) {
            // successful response from server with data, lets
            // assign to scope variable to display in index.html
            $scope.itemList = _listData.results.data;
        });
    }


    $scope.deleteObject = function editObject(_objectId) {
        ParseHttpService.deleteObjectById(_objectId)
            .then(function itemSaved(_deletedObject) {
                //  alert("Item Deleted " + _deletedObject.objectId);

                return populateList();

            }, function errorDeleting(_error) {
                // alert("Error Deleting Object " + _objectId)
            });
    };


    $scope.goTo = function (_id) {
        console.log("am i going?");
        $state.go("detail", {
            id: _id
        });
    }


});











































app.controller("gotohome", function ($scope, $state, ParseHttpService, $timeout) {
    console.log("i donno what is happening");
    $scope.stateInfo = $state.current;

    $scope.gohome = function () {
        $state.go("app/home", {});
    }
    //ParseHttpService.login().then(function (_user) {
    //    $timeout(function () {
    //        $scope.goToDetail = function () {
    //            $state.go("home", {});
    //        }
    //    });
    //});
});


app.controller("detailCtrl", function ($scope, $state) {
    $scope.stateInfo = $state.current;
    $scope.params = $state.params;
});