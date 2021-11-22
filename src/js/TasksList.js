import { BTN, DEL } from "./constants.js";

class TasksList {
  _tasks = [];

  constructor({ $target, title }) {
    this.title = title;
    this.$wrap = document.createElement("article");
    $target.appendChild(this.$wrap);
    this.handleBtn = this.handleBtn.bind(this);
    this.getTasks();
  }

  saveTasks() {
    localStorage.setItem(this.title, JSON.stringify(this._tasks));
  }

  getTasks() {
    this.setState(JSON.parse(localStorage.getItem(this.title)) || []);
  }

  addTask(newTaskObj) {
    this.setState([...this._tasks, newTaskObj]);
  }

  deleteTask(delTaskId) {
    this.setState(this._tasks.filter((task) => task.id !== delTaskId));
  }

  handleBtn(e) {
    const $target = e.target;
    const classList = $target.classList;
    const isBtn = classList.contains(BTN);
    if (!isBtn) return;
    const $targetLi = $target.parentNode;
    const id = $targetLi.id;

    if (classList.contains(DEL)) {
      this.deleteTask(id);
    }
  }

  setState(tasks) {
    this._tasks = tasks;
    this.saveTasks();
    this.render();
  }

  render() {
    const { $wrap, _tasks, handleBtn, title } = this;
    $wrap.innerHTML = `
      <h4>${title[0].toUpperCase() + title.slice(1)}</h4>
      <ul class="${title}">
        ${_tasks
          .map(
            (task) =>
              `<li id=${task.id}>${task.text}<button class="${DEL} ${BTN}">❌</button></li>`
          )
          .join("")}
      </ul>
    `;

    _tasks.length &&
      $wrap.querySelector("ul").addEventListener("click", handleBtn);
  }
}

export default TasksList;
