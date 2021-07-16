export function taskStatus(ev, index, list) {
  console.log(list);
  list = list.map((task) => {
    if (task.index === index) {
      task.completed = ev.target.checked;
    }
    return task;
  });
  console.log(list);
  localStorage.setItem('tasks', JSON.stringify(list));
}