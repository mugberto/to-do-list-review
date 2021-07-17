import './style.css';
import {
  onDrag,
  onDragOver,
  onDragEnter,
  onDrop,
} from './dragAndDrop';
import taskStatus from './taskStatus';
import TaskList from './taskList';
import EditForm from './form';

const taskList = new TaskList([]);
const editForm = new EditForm(taskList);

const displayTaskList = () => {
  const ul = document.getElementById('list-id');
  ul.innerHTML = '';
  taskList.list.sort((a, b) => a.index - b.index);
  taskList.list.forEach((task) => {
    const li = document.createElement('li');
    const box = document.createElement('div');
    const checkbox = document.createElement('input');
    const description = document.createElement('span');
    const handle = document.createElement('span');
    checkbox.type = 'checkbox';
    li.ondragenter = (ev) => onDragEnter(ev, task.index);
    li.ondragover = (ev) => onDragOver(ev);
    li.ondrop = (ev) => {
      onDrop(ev, taskList.list);
      displayTaskList();
    };
    box.className = 'box';
    box.draggable = true;
    box.ondragstart = (ev) => onDrag(ev, task.index);
    description.className = 'task waiting';
    description.innerHTML = task.description;
    handle.className = 'rightmost handle';
    handle.innerHTML = '<i class="fa fa-ellipsis-v"></i>';
    if (task.completed) {
      checkbox.setAttribute('checked', 'checked');
      description.classList.replace('waiting', 'completed');
    }
    checkbox.onchange = (ev) => {
      taskStatus(ev, task.index, taskList.list);
      displayTaskList();
    };
    description.onclick = () => editForm.render(description, task.index, displayTaskList);
    box.appendChild(checkbox);
    box.appendChild(description);
    box.appendChild(handle);
    li.appendChild(box);
    ul.appendChild(li);
  });
};

const taskInput = document.getElementById('task-add-id');
taskInput.onkeyup = (ev) => {
  if (ev.key === 'Enter') {
    taskList.create(taskInput.value);
    displayTaskList();
    taskInput.value = '';
  }
};

const taskSubmitBtn = document.getElementById('task-submit');
taskSubmitBtn.onclick = (ev) => {
  if (ev.type === 'click') {
    taskList.create(taskInput.value);
    displayTaskList();
    taskInput.value = '';
  }
};

const clearAllCompletedBtn = document.getElementById('clear-btn-id');
clearAllCompletedBtn.onclick = () => {
  taskList.deleteAllCompleted();
  displayTaskList();
};

displayTaskList();