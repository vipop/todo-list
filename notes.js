var notes = angular.module("notes", []);

notes.controller("notesController", function($scope, $http){
	var i;
	$scope.todos = [];
	$http.get('todo.json')
       .then(function(res){
		   var data = res.data;
		   	//console.log(data);
		   	for (i = 0; i < data.todo.length; i++) {
 	  			$scope.todos.push(data.todo[i]);
 	  		}
        });
	$scope.addNote = function() {
		var title = document.getElementById("title").value;
		var description = document.getElementById("description").value;

		if (title != '' && description != '') $scope.todos.push({"task":title, "complete":"false", "description":description});
	}
	$scope.checkNote = function(event) {
		event.currentTarget.parentNode.parentNode.style["background-color"] = "darkseagreen";
	}
	$scope.removeNote = function(event) {
		document.getElementsByTagName("body")[0].removeChild(event.currentTarget.parentNode.parentNode);
	}
	var upload = document.getElementById("upload");
	document.getElementsByTagName("body")[0].removeAttribute("style");
	document.getElementsByTagName("body")[0].removeChild(upload);
});

notes.filter('customFilter', function() {
    return function(collection) {
		var output = [];
		var i, j;
		for (i = 0; i < collection.length; i++) {
			var todo = collection[i];
			var found = "false";
			if (output.length == 0) output.push(todo);
			else {
				for (j = 0; j < output.length; j++) {
					var item = output[j];
					//console.log(item);
					//console.log(todo);
					//console.log("item[title] = " + item["task"] + " and todo[title] = " + todo["task"]);
					if (item["task"] == todo["task"]) {
						console.log("same title");
						found = "true";
					}
					if (item["description"] == todo["description"]) {
						console.log("same description");
						found = "true";
					}
			    }
				if (found == "false") {
					console.log("adding unique note");
					output.push(todo);
				}
				else console.log("duplicate task!");
			}
		}
		console.log("filtering done");
	    return output;
    };
});
