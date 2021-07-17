export default class EditForm {
  constructor(taskList) {
    this.taskList = taskList;
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'edit-input';
    this.trash = document.createElement('button');
    this.trash.type = 'button';
    this.trash.innerHTML = '<i class="fa fa-trash"></i>';
    this.trash.className = 'rightmost trash';
  }

  render(descrElement, index, refresh) {
    let commit = true;
    const block = descrElement.parentElement;
    this.input.value = this.taskList.edit(index);
    block.replaceChild(this.input, descrElement);
    block.replaceChild(this.trash, this.input.nextElementSibling);
    this.input.focus();
    this.trash.onmouseenter = (ev) => {
      commit = false;
      this.input.blur();
    }
    this.trash.onmouseleave = (ev) => {
      commit = true;
      this.input.focus();
    }

    this.trash.onclick = () => {
      this.taskList.delete(index);
      refresh();
    };
    this.input.onkeyup = (ev) => {
      if (ev.key === 'Enter') {
        this.taskList.update(ev.target.value, index);
        refresh();
      }
    };
    this.input.onblur = (ev) => {
      if (commit) {
        this.taskList.update(ev.target.value, index);
        refresh();
      }
    };
  }
}