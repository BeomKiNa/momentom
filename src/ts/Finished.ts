import { BACK, BTN } from "./constants";
import TasksList, { Task } from "./TasksList";

class Finished extends TasksList {
  handleBack: (taskObj: Task) => void;
  constructor({ $target, handleBack, title }) {
    super({ $target, title });
    this.handleBack = handleBack;
  }

  handleBtn(e) {
    super.handleBtn(e);
    const $target: HTMLElement = e.target;
    const classList = $target.classList;
    const $targetLi = $target.parentNode;
    const id = $targetLi!["id"];
    // const id = $targetLi!.id; // error
    // https://stackoverflow.com/questions/38250575/typescript-property-id-does-not-exist-on-type-node

    if (classList.contains(BACK)) {
      const backTask: Task | undefined = this.tasks.find(
        (task: Task) => task.id === id
      );
      this.deleteTask(id);
      backTask && this.handleBack(backTask);
    }
  }

  render() {
    super.render();
    const { $wrap } = this;

    $wrap.querySelectorAll("li").forEach((li) => {
      const backBtn = document.createElement("button");
      backBtn.className = `${BACK} ${BTN}`;
      backBtn.innerText = "↩️";
      li.append(backBtn);
    });
  }
}

export default Finished;
