export default class EditForm {
  constructor(taskList) {
    this.taskList = taskList;
    this.index = null;
    this.element = null;
  }

  submit(description) {
    this.taskList.update(description, this.index);
    this.element = null;
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
        this.submit(ev.target.value);
        refresh();
      }
    };
    this.element.onblur = (ev) => {
      this.submit(ev.target.value);
      refresh();
    }
  }
}