export default function taskStatus(ev, index, list) {
  list = list.map((task) => {
    if (task.index === index) {
      task.completed = ev.target.checked;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(list));
}