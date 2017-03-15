var notes = angular.module("notes", []);

notes.service("notesService", function(){

	this.checkNote = function(event, todos) {
		var unique = [];
		var list = todos;
		var task = event.currentTarget.parentNode.parentNode.firstChild.innerText;
		var description = event.currentTarget.parentNode.parentNode.childNodes[2].innerText;
		for (i = 0; i < list.length; i++) {
			if (list[i].task != task && list[i].description != description) {
				unique.push(list[i]);
			}
		}
		var completed = {"task":task, "complete":"true", "description":description};

		return {"todos": unique, "completed": completed};
	}

	this.removeNote = function(event, todos, completes) {
		var i;
		var unique = [];
		var index = -1;
		var notes = document.getElementsByClassName("note");
		var note = event.currentTarget.parentNode.parentNode;
		if (event.currentTarget.parentNode.parentNode.style["background-color"] == "darkseagreen") list = completes;
		else list = todos;
		var task = event.currentTarget.parentNode.parentNode.firstChild.innerText;
		var description = event.currentTarget.parentNode.parentNode.childNodes[2].innerText;
		for (i = 0; i < list.length; i++) {
			if (list[i].task != task && list[i].description != description) {
				unique.push(list[i]);
			}
		}

		return unique;
	}

});

notes.controller("notesController", function($scope, $http, notesService){
	var i;
	$scope.todos = [];
	$scope.completes = [];

	document.getElementById("error").style.display = "none";
	document.getElementById("todo").style.display = "none";
	document.getElementById("complete").style.display = "none";

	$scope.upload = function(selector) {
		$scope.file = selector.files[0];
		$scope.$apply();
	    var reader = new FileReader();
	    reader.onload = function(e) {
			var r = reader.result;
			var data = JSON.parse(r);
			console.log(data);
			console.log(data.todo[0].task);
			for (i = 0; i < data.todo.length; i++) {
				if (data.todo[i].complete == "true") $scope.completes.push(data.todo[i]);
				else $scope.todos.push(data.todo[i]);
 	  		}
			$scope.$apply();
		}
		reader.readAsText($scope.file);
		console.log($scope.todos);
		console.log($scope.completes);
		document.getElementById("todo").style.display = "block";
		document.getElementById("complete").style.display = "block";
		var upload = document.getElementById("upload");
		document.getElementsByTagName("body")[0].removeAttribute("style");
		document.getElementsByTagName("body")[0].removeChild(upload);
	}

	$scope.addNote = function() {
		var task = document.getElementById("title").value;
		var description = document.getElementById("description").value;

		if (title != '' && description != '') {
			$scope.todos.push({"task":task, "complete":"false", "description":description});
			if (document.getElementById("todo").style.display == "none") {
				document.getElementById("todo").style.display = "block";
				document.getElementById("complete").style.display = "block";
				var upload = document.getElementById("upload");
				document.getElementsByTagName("body")[0].removeAttribute("style");
				document.getElementsByTagName("body")[0].removeChild(upload);
			}
		} else {
			document.getElementById("error").innerHTML = "Input cannot be blank.";
			document.getElementById("error").style.display = "";
		}

	}

	$scope.check = function(event) {
		// use custom service to move completed task to the other list
		var checked = notesService.checkNote(event, $scope.todos);
		$scope.todos = checked.todos;
		$scope.completes.push(checked.completed);
	}

	$scope.remove = function(event) {
		// use custom service to remove task from the list
		var unique = notesService.removeNote(event, $scope.todos, $scope.completes);

		if (event.currentTarget.parentNode.parentNode.style["background-color"] == "darkseagreen") {
			$scope.completes = unique;
		} else {
			$scope.todos = unique;
		}

	}

	$scope.clearError = function() {
		document.getElementById("error").style.display = "none";
	}

});

notes.filter('customFilter', function() {
    return function(collection, completes) {
		var output = [];
		var i, j;
		for (i = 0; i < collection.length; i++) {
			var todo = collection[i];
			var found = "false";
			if (output.length == 0) {
				output.push(todo);
				// clear the fields
					if (todo == collection[collection.length - 1]) {
					document.getElementById("title").value = "";
					document.getElementById("description").value = "";
				}
			}
			else {
				for (j = 0; j < output.length; j++) {
					var item = output[j];
					if (item["task"] == todo["task"]) {
						found = "true";
					}
					if (item["description"] == todo["description"]) {
						found = "true";
					}
			    }
				if (found == "false") {
					output.push(todo);
					// if the new item is not a duplicate then add it and clear the fields
					if (todo == collection[collection.length - 1]) {
						document.getElementById("title").value = "";
						document.getElementById("description").value = "";
					}
				}
				else {
					// if duplicate is found for the last added item then display error
					if (todo == collection[collection.length - 1]) {
						document.getElementById("error").innerHTML = "This task has already been added!";
						document.getElementById("error").style.display = "";
					}
				}
				// else it's another duplicate
				found = false;
			}
		}
	    return output;
    };
});
