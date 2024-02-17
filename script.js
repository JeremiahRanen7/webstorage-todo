var container = document.getElementById("list-container");
var input = document.getElementById("input");
var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function loadTasks() {
    savedTasks.forEach(function(task) {
        var noteDiv = createNoteElement(task);
        container.appendChild(noteDiv);
    });
}

function createNoteElement(taskText) {
    var noteDiv = document.createElement("div");
    noteDiv.className = "note-box";

    var noteContent = document.createElement("span");
    noteContent.textContent = taskText;
    noteDiv.appendChild(noteContent);

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = deleteItem;
    noteDiv.appendChild(deleteButton);

    return noteDiv;
}


window.addEventListener("load", function() {
    loadTasks();
});


function add() {
    var noteText = input.value.trim();
    if (noteText !== "") {
        var noteDiv = createNoteElement(noteText);
        container.appendChild(noteDiv);
        savedTasks.push(noteText);
        saveTasks();
        input.value = "";
    }
}


function deleteItem(event) {
    var noteDiv = event.target.parentElement;
    var noteText = noteDiv.firstChild.textContent;
    var index = savedTasks.indexOf(noteText);
    if (index !== -1) {
        savedTasks.splice(index, 1);
        saveTasks();
    }
    container.removeChild(noteDiv);
}
