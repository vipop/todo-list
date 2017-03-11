var notes = angular.module("notes", []);

notes.controller("notesController", function($scope, $http){
	var i;
	$scope.todos = [];
	$http.get('tasks.json')
       .then(function(res){
		   var data = res.data;
		   	console.log(data);
		   	for (i = 0; i < data.todo.length; i++) {
 	  			$scope.todos.push(data.todo[i]);
 	  		}
        });
	$scope.addNote = function() {
		$scope.todos.push({"task":"New Note", "complete":"false", "description":"Hello Hello Hello"});
	}
	var upload = document.getElementById("upload");
	document.getElementsByTagName("body")[0].removeAttribute("style");
	document.getElementsByTagName("body")[0].removeChild(upload);
});

function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.responseType = "json";
	xhr.onload = function() {
	  var status = xhr.status;
	  if (status == 200) {
		callback(null, xhr.response);
	  } else {
		callback(status);
	  }
	};
	xhr.send();
};
