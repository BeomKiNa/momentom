import { BACK, BTN, DEL, FINISHED } from "./constants.js";

class Finished {
  toDos = [];

  constructor({ $target, handleBack }) {
    this.handleBack = handleBack;
    this.$wrap = document.createElement("article");
    $target.appendChild(this.$wrap);
    this.loadToDos();
    this.render();
  }

  saveToDos = () => {
    localStorage.setItem(FINISHED, JSON.stringify(this.toDos));
  };

  loadToDos = () => {
    this.setState(JSON.parse(localStorage.getItem(FINISHED)) || []);
  };

  addToDo = (newToDo) => {
    this.setState([...this.toDos, newToDo]);
  };

  deleteToDo = (delToDo) => {
    this.setState(this.toDos.filter((toDo) => toDo.id !== delToDo));
  };

  handleBtn = (e) => {
    const $target = e.target;
    const classList = $target.classList;
    const isBtn = classList.contains(BTN);
    if (!isBtn) return;
    const $targetLi = $target.parentNode;
    const id = $targetLi.id;

    if (classList.contains(DEL)) {
      this.deleteToDo(id);
    }

    if (classList.contains(BACK)) {
      const backToDo = this.toDos.find((toDo) => toDo.id === id);
      this.deleteToDo(id);
      this.handleBack(backToDo);
    }
  };

  setState(toDos) {
    this.toDos = toDos;
    this.saveToDos();
    this.render();
  }

  render() {
    const { $wrap, toDos, handleBtn } = this;
    $wrap.innerHTML = `
      <h4>Finished</h4>
      <ul class="finished">
        ${toDos
          .map(
            (toDo) =>
              `<li id=${toDo.id}>${toDo.text}<button class="${BACK} ${BTN}">Back</button><button class="${DEL} ${BTN}">❌</button></li>`
          )
          .join("")}
      </ul>
    `;

    toDos.length &&
      $wrap.querySelector("ul").addEventListener("click", handleBtn);
  }
}

export default Finished;
