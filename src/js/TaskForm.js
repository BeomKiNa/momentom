class TaskForm {
  handleNewTask = null;
  $form = null;

  constructor({ $target, handleNewTask }) {
    this.handleNewTask = handleNewTask;
    this.$form = document.createElement("form");
    $target.appendChild(this.$form);
    this.onSubmit = this.onSubmit.bind(this);
    this.$form.addEventListener("submit", this.onSubmit);
    this.render();
  }

  onSubmit(e) {
    e.preventDefault();
    const $input = e.target.taskForm;
    const value = $input.value;
    if (!value) return;
    $input.value = "";
    this.handleNewTask(value);
  }

  render() {
    const { $form } = this;

    $form.innerHTML = `
      <input type="text" placeholder="Write a to do" id="taskForm" required/>
    `;
  }
}

export default TaskForm;
