import { FINISHED, PENDING } from "./constants.js";
import Finished from "./Finished.js";
import Pending from "./Pending.js";
import TaskForm from "./TaskForm.js";

class TasksContainer {
  constructor({ $target }) {
    this.$listWrap = document.createElement("section");
    this.$listWrap.className = "listWrap cf";

    this.taskForm = new TaskForm({
      $target: this.$listWrap,
      newTask: (text) => {
        const taskObj = {
          id: String(Date.now()),
          text,
        };
        this.pending.addTask(taskObj);
      },
    });

    this.pending = new Pending({
      $target: this.$listWrap,
      handleCheck: (taskObj) => this.finished.addTask(taskObj),
      title: PENDING,
    });

    this.finished = new Finished({
      $target: this.$listWrap,
      handleBack: (taskObj) => this.pending.addTask(taskObj),
      title: FINISHED,
    });

    $target.appendChild(this.$listWrap);
  }
}

export default TasksContainer;
