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

const sampletaskList = [{
    index: 1,
    description: 'Shopping groceries',
    completed: true,
  },
  {
    index: 4,
    description: 'Dinner with friends',
    completed: false,
  },
  {
    index: 3,
    description: 'Finish assignment',
    completed: true,
  },
  {
    index: 2,
    description: 'Jogging',
    completed: false,
  },
];

const taskList = new TaskList(sampletaskList);
const editForm = new EditForm(taskList);

function displayTaskList() {
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
}

const taskInput = document.getElementById('task-add-id');
const taskSubmitBtn = document.getElementById('task-submit');
taskInput.onkeyup = taskSubmitBtn.onclick = (ev) => {
  if (ev.key === 'Enter' || ev.type === 'click') {
    taskList.create(taskInput.value);
    displayTaskList();
    taskInput.value = '';
  }
};

if (localStorage.getItem('tasks') === null) {
  localStorage.setItem('tasks', JSON.stringify(sampletaskList));
}

displayTaskList();