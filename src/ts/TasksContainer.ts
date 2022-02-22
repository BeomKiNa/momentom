import { FINISHED, PENDING } from "./constants";
import Finished from "./Finished";
import Pending from "./Pending";
import TaskForm from "./TaskForm";
import { Task } from "./TasksList";

class TasksContainer {
  $listWrap: HTMLElement;
  constructor({ $target }) {
    this.$listWrap = document.createElement("section");
    this.$listWrap.className = "listWrap cf";

    const taskForm = new TaskForm({
      $target: this.$listWrap,
      handleNewTask: (text: string) => {
        const taskObj = {
          id: String(Date.now()),
          text,
        };
        pending.addTask(taskObj);
      },
    });

    const pending = new Pending({
      $target: this.$listWrap,
      handleCheck: (taskObj: Task) => finished.addTask(taskObj),
      title: PENDING,
    });

    const finished = new Finished({
      $target: this.$listWrap,
      handleBack: (taskObj: Task) => pending.addTask(taskObj),
      title: FINISHED,
    });

    $target.appendChild(this.$listWrap);
  }
}

export default TasksContainer;
