import { BTN, CHECK } from "./constants.js";
import TasksList from "./TasksList.js";

class Pending extends TasksList {
  constructor({ $target, handleCheck, title }) {
    super({ $target, title });
    this.handleCheck = handleCheck;
  }

  handleBtn(e) {
    super.handleBtn(e);
    const $target = e.target;
    const classList = $target.classList;
    const $targetLi = $target.parentNode;
    const id = $targetLi.id;

    if (classList.contains(CHECK)) {
      const checkTask = this._tasks.find((task) => task.id === id);
      this.deleteTask(id);
      this.handleCheck(checkTask);
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
