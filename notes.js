var notes = angular.module("notes", []);

notes.service("notesService", function(){
	this.clean = function (x) {

        return clean;
    }
});

notes.controller("notesController", function($scope, $http){
	var i;
	$scope.all = [];
	$scope.todos = [];
	$scope.completes = [];
	$http.get('todo.json')
       .then(function(res){
		   var data = res.data;
		   	//console.log(data);
		   	for (i = 0; i < data.todo.length; i++) {
				if (data.todo[i].complete == "true") $scope.completes.push(data.todo[i]);
				else $scope.todos.push(data.todo[i]);
				$scope.all.push(data.todo[i]);
 	  		}
        });
	$scope.addNote = function() {
		var task = document.getElementById("title").value;
		var description = document.getElementById("description").value;

		if (title != '' && description != '') {
			$scope.todos.push({"task":task, "complete":"false", "description":description});
			$scope.all.push({"task":task, "complete":"false", "description":description});
		}
	}
	$scope.checkNote = function(event) {
		//event.currentTarget.parentNode.parentNode.style["background-color"] = "darkseagreen";
		var unique = [];
		var list = $scope.todos;
		var task = event.currentTarget.parentNode.parentNode.firstChild.innerText;
		var description = event.currentTarget.parentNode.parentNode.childNodes[2].innerText;
		for (i = 0; i < list.length; i++) {
			if (list[i].task != task && list[i].description != description) {
				unique.push(list[i]);
			}
		}
		$scope.todos = unique;
		$scope.completes.push({"task":task, "complete":"true", "description":description});

	}
	$scope.removeNote = function(event) {
		var i;
		var unique = [];
		var index = -1;
		var notes = document.getElementsByClassName("note");
		var note = event.currentTarget.parentNode.parentNode;
		if (event.currentTarget.parentNode.parentNode.style["background-color"] == "darkseagreen") list = $scope.completes;
		else list = $scope.todos;
		/*for (i = 0; i < notes.length; i++) {
			if (notes[i] == note) {
				index = i;
			}
		}*/
		var task = event.currentTarget.parentNode.parentNode.firstChild.innerText;
		var description = event.currentTarget.parentNode.parentNode.childNodes[2].innerText;
		//var task = list[index].task;
		//var description = list[index].description;
		for (i = 0; i < list.length; i++) {
			if (list[i].task != task && list[i].description != description) {
				unique.push(list[i]);
			}
		}
		if (event.currentTarget.parentNode.parentNode.style["background-color"] == "darkseagreen") {
			$scope.completes = unique;
			$scope.all = $scope.completes.concat($scope.todos);
		} else {
			$scope.todos = unique;
			$scope.all = $scope.todos.concat($scope.completes);
		}
		document.getElementsByTagName("body")[0].removeChild(note);
	}
	var upload = document.getElementById("upload");
	document.getElementsByTagName("body")[0].removeAttribute("style");
	document.getElementsByTagName("body")[0].removeChild(upload);
});

notes.filter('customFilter', function() {
    return function(collection, completes) {
		var output = [];
		var i, j;
		for (i = 0; i < collection.length; i++) {
			var todo = collection[i];
			var found = "false";
			if (output.length == 0) output.push(todo);
			else {
				for (j = 0; j < output.length; j++) {
					var item = output[j];
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
					output.push(todo);
				}
				else console.log("duplicate task!");
			}
		}
		//console.log("filtering done");
	    return output;
    };
});
