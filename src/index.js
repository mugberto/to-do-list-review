import './style.css';

const taskList = [
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

function displayTaskList(list) {
  list.sort((a, b) => a.index - b.index);
  const ul = document.getElementById('list-id');
  list.forEach((task) => {
    const li = document.createElement('li');
    const box = document.createElement('div');
    const checkbox = document.createElement('input');
    const description = document.createElement('span');
    box.className = 'box';
    checkbox.type = 'checkbox';
    description.className = 'task waiting';
    description.innerHTML = task.description;
    if (task.completed) {
      checkbox.setAttribute('checked', 'checked');
      description.classList.replace('waiting', 'completed');
    }
    box.appendChild(checkbox);
    box.appendChild(description);
    box.innerHTML += '<span class="rightmost handle"><i class="fa fa-ellipsis-v"></i></span>';
    li.appendChild(box);
    ul.appendChild(li);
  });
}

displayTaskList(taskList);