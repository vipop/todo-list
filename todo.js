var tasks = "";

window.onload = function() {
	var file = 'tasks.json';
	var r = new FileReader();
	r.onload = receivedFile();
	r.readAsText(file);

	console.log(tasks.todo[0].task);
}

function receivedFile() {
	var text = e.target.result;
	tasks = JSON.parse();
}
