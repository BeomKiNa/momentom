class ToDoForm {
  constructor({ $target, newToDo }) {
    this.newToDo = newToDo;
    this.$form = document.createElement("form");
    $target.appendChild(this.$form);
    this.$form.addEventListener("submit", this.onSubmit);
    this.render();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const $input = e.target.todo;
    const value = $input.value;
    if (value) return;
    $input.value = "";
    this.newToDo(value);
  };

  render() {
    this.$form.innerHTML = `
      <input type="text" placeholder="Write a to do" id="todo" required/>
    `;
  }
}

export default ToDoForm;
