const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-tasks');
const completedList = document.getElementById('completed-tasks');

const createTaskItem = function (text) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.className = 'task';
  // innerText, not innerHTML: the task text comes from the user and must not be parsed as markup
  label.innerText = text;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerText = 'Edit';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.append(deleteIcon);

  const listItem = document.createElement('li');
  listItem.append(checkbox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskItem(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const toggleTaskEditing = function (event) {
  const editButton = event.currentTarget;
  const listItem = editButton.closest('li');

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const isEditing = listItem.classList.contains('edit-mode');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function (event) {
  event.currentTarget.closest('li').remove();
};

const toggleTaskCompletion = function (event) {
  const checkbox = event.currentTarget;
  const listItem = checkbox.closest('li');
  const targetList = checkbox.checked ? completedList : todoList;
  targetList.appendChild(listItem);
};

const bindTaskEvents = function (listItem) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = toggleTaskEditing;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskCompletion;
};

addButton.addEventListener('click', addTask);

for (const listItem of [...todoList.children, ...completedList.children]) {
  bindTaskEvents(listItem);
}
