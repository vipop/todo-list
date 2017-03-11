var data = "";

window.onload = function() {
	//console.log(tasks.todo[0].task);
	document.getElementsByTagName("body")[0].style.display = "flex";
	document.getElementsByTagName("body")[0].style["align-items"] = "center";
}

function addNote() {
	var notes = document.getElementById("notes");
	var newNote = document.createElement("div");
	newNote.setAttribute("ng-include","'note.html'");
	newNote.setAttribute("class","note");
	notes.appendChild(newNote);
}
