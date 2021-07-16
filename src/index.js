import './style.css';
import {
  onDrag, onDragOver, onDragEnter, onDrop,
} from './dragAndDrop';
import { taskStatus } from './taskStatus';

const sampletaskList = [
  {
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

function displayTaskList() {
  const list = JSON.parse(localStorage.getItem('tasks'));
  const ul = document.getElementById('list-id');
  ul.innerHTML = '';
  list.sort((a, b) => a.index - b.index);
  list.forEach((task) => {
    const li = document.createElement('li');
    const box = document.createElement('div');
    const checkbox = document.createElement('input');
    const description = document.createElement('span');
    const handle = document.createElement('span');
    checkbox.type = 'checkbox';
    li.ondragenter = (ev) => onDragEnter(ev, task.index);
    li.ondragover = (ev) => onDragOver(ev);
    li.ondrop = (ev) => {
      onDrop(ev, list);
      displayTaskList(list);
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
    checkbox.addEventListener('change', (ev) => {
      console.log(list);
      taskStatus(ev, task.index, list);
      displayTaskList();
    });
    box.appendChild(checkbox);
    box.appendChild(description);
    box.appendChild(handle);
    li.appendChild(box);
    ul.appendChild(li);
  });
}

if (localStorage.getItem('tasks') === null) {
  localStorage.setItem('tasks', JSON.stringify(sampletaskList));
}

displayTaskList();