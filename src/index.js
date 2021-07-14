import './style.css';

let taskList = [
  {
    index: 1,
    description: 'Shopping groceries',
    completed: true
  },
  {
    index: 4,
    description: 'Dinner with friends',
    completed: false
  },
  {
    index: 3,
    description: 'Finish assignment',
    completed: true
  },
  {
    index: 2,
    description: 'Jogging',
    completed: false
  },
];

const displayTaskList = function(list) {
  list.sort((a,b) =>  a.index - b.index );
  const ul = document.getElementById('list-id');
  list.forEach( task => { 
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if(task.completed){
      checkbox.setAttribute('checked', 'checked');
    }
    li.appendChild(checkbox);
    li.innerHTML += `<span>${task.description}</span> <i class="fa fa-ellipsis-v"></i>`;
    ul.appendChild(li);
  });
}

displayTaskList(taskList);