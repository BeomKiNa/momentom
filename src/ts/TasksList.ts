import { BTN, DEL } from "./constants";

type Init = {
  $target: HTMLElement;
  title: string;
};

type Task = {
  id: string;
  text: string;
};

type Tasks = Array<Task> | [];

interface TaskListComponent {
  addTask(newTaskObj: Task): void;
  deleteTask(delTaskId: string): void;
}

class TasksList implements TaskListComponent {
  private tasks: Tasks = [];
  private title: string;
  private $wrap: HTMLElement;

  constructor({ $target, title }: Init) {
    this.title = title;
    this.$wrap = document.createElement("article");
    $target.appendChild(this.$wrap);
    this.handleBtn = this.handleBtn.bind(this);
    this.getTasks();
  }

  saveTasks() {
    localStorage.setItem(this.title, JSON.stringify(this.tasks));
  }

  getTasks() {
    this.setState(JSON.parse(localStorage.getItem(this.title)!) || []);
  }

  addTask(newTaskObj: Task) {
    this.setState([...this.tasks, newTaskObj]);
  }

  deleteTask(delTaskId: string) {
    this.setState(this.tasks.filter((task: Task) => task.id !== delTaskId));
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

  setState(tasks: Tasks) {
    this.tasks = tasks;
    this.saveTasks();
    this.render();
  }

  render() {
    const { $wrap, tasks, handleBtn, title } = this;
    $wrap.innerHTML = `
      <h4>${title[0].toUpperCase() + title.slice(1)}</h4>
      <ul class="${title}">
        ${tasks
          .map(
            (task) =>
              `<li id=${task.id}>${task.text}<button class="${DEL} ${BTN}">❌</button></li>`
          )
          .join("")}
      </ul>
    `;

    tasks.length &&
      $wrap.querySelector("ul")!.addEventListener("click", handleBtn);
  }
}

export default TasksList;
