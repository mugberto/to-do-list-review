export default class TaskList {
  constructor(sampleList) {
    if (localStorage.getItem('tasks') == null) {
      this.list = sampleList;
    } else {
      this.list = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  create(description) {
    this.list = this.list.concat({ index: this.list.length + 1, description, completed: false });
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }
}