import { BACK, BTN } from "./constants";
import TasksList from "./TasksList";

class Finished extends TasksList {
  constructor({ $target, handleBack, title }) {
    super({ $target, title });
    this.handleBack = handleBack;
  }

  handleBtn(e) {
    super.handleBtn(e);
    const $target = e.target;
    const classList = $target.classList;
    const $targetLi = $target.parentNode;
    const id = $targetLi.id;

    if (classList.contains(BACK)) {
      const backTask = this._tasks.find((task) => task.id === id);
      this.deleteTask(id);
      this.handleBack(backTask);
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
