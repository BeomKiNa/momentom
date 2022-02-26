import { BTN, CHECK } from "./constants";
import TasksList, { Task } from "./TasksList";

class Pending extends TasksList {
  handleCheck: (taskObj: Task) => void;
  constructor({ $target, handleCheck, title }) {
    super({ $target, title });
    this.handleCheck = handleCheck;
  }

  handleBtn(e) {
    super.handleBtn(e);
    const $target: HTMLElement = e.target;
    const classList = $target.classList;
    const $targetLi = $target.parentNode;
    const id = $targetLi!["id"];
    // const id = $targetLi!.id; // error
    // https://stackoverflow.com/questions/38250575/typescript-property-id-does-not-exist-on-type-node

    if (classList.contains(CHECK)) {
      const checkTask: Task | undefined = this.tasks.find(
        (task) => task.id === id
      );
      this.deleteTask(id);
      checkTask && this.handleCheck(checkTask);
    }
  }

  render() {
    super.render();
    const { $wrap } = this;

    $wrap.querySelectorAll("li").forEach((li) => {
      const checkBtn = document.createElement("button");
      checkBtn.className = `${CHECK} ${BTN}`;
      checkBtn.innerText = "✅";
      li.append(checkBtn);
    });
  }
}

export default Pending;
