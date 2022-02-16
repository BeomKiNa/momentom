import { FINISHED, PENDING } from "./constants";
import Finished from "./Finished";
import Pending from "./Pending";
import TaskForm from "./TaskForm";

class TasksContainer {
  $listWrap: HTMLElement;
  constructor({ $target }) {
    this.$listWrap = document.createElement("section");
    this.$listWrap.className = "listWrap cf";

    const taskForm = new TaskForm({
      $target: this.$listWrap,
      handleNewTask: (text) => {
        const taskObj = {
          id: String(Date.now()),
          text,
        };
        pending.addTask(taskObj);
      },
    });

    const pending = new Pending({
      $target: this.$listWrap,
      handleCheck: (taskObj) => finished.addTask(taskObj),
      title: PENDING,
    });

    const finished = new Finished({
      $target: this.$listWrap,
      handleBack: (taskObj) => pending.addTask(taskObj),
      title: FINISHED,
    });

    $target.appendChild(this.$listWrap);
  }
}

export default TasksContainer;
