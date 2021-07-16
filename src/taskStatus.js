export function taskStatus(ev, index, list) {
  console.log(ev.target.checked);
  list = list.map(task => {
    if(task.index === index ){
      task.completed = ev.target.checked;
    }
  });
}