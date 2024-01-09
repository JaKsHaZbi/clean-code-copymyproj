// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  listItem.className = "task__item";
  label.innerText = taskString;
  label.className = "label task";

  checkBox.type = "checkbox";
  checkBox.className = "input input_checkbox";
  editInput.type = "text";
  editInput.className = "input input_text task";

  editButton.innerText = "Edit";
  editButton.className = "button button_edit";
  deleteButton.className = "button button_delete";
  deleteButtonImg.className = "image__remove";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  const listItem = createNewTaskElement(taskInput.value);
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

// Edit an existing task.
const editTask = function () {
  // Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".input_text");
  const label = listItem.querySelector(".label");
  const editBtn = listItem.querySelector(".button_edit");
  const containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  // When the checkbox is unchecked
  // Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// The glue to hold it all together.
// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".input_checkbox");
  const editButton = taskListItem.querySelector(".button_edit");
  const deleteButton = taskListItem.querySelector(".button_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// cycle over incompleteTaskHolder ul list items
// for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
// cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
