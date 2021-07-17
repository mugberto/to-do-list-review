export default class EditForm {
  constructor(taskList) {
    this.taskList = taskList;
  }
  
  render(descrElement, index, refresh) {
    this.index = index;
    this.element = document.createElement('input');
    this.element.type = 'text';
    this.element.className = 'edit-input';
    this.element.value = this.taskList.edit(index);
    descrElement.parentNode.replaceChild(this.element, descrElement);
    this.element.focus();
    this.element.onkeyup = (ev) => {
      if (ev.key === 'Enter') {
        this.taskList.update(ev.target.value, index);
        refresh();
      }
    };
    this.element.onblur = (ev) => {
      this.taskList.update(ev.target.value, index);
      refresh();
    }
  }
}