import { BTN, CHECK, DEL, PENDING } from "./constants.js";

class Pending {
  toDos = [];

  constructor({ $target, handleCheck }) {
    this.handleCheck = handleCheck;
    this.$wrap = document.createElement("article");
    $target.appendChild(this.$wrap);
    this.loadToDos();
    this.render();
  }

  saveToDos = () => {
    localStorage.setItem(PENDING, JSON.stringify(this.toDos));
  };

  loadToDos = () => {
    this.setState(JSON.parse(localStorage.getItem(PENDING)) || []);
  };

  addToDo = (newToDo) => {
    this.setState([...this.toDos, newToDo]);
  };

  deleteToDo = (delToDoId) => {
    this.setState(this.toDos.filter((toDo) => toDo.id !== delToDoId));
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

    if (classList.contains(CHECK)) {
      const checkToDo = this.toDos.find((toDo) => toDo.id === id);
      this.deleteToDo(id);
      this.handleCheck(checkToDo);
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
      <h4>Pending</h4>
      <ul class="pending">
        ${toDos
          .map(
            (toDo) =>
              `<li id=${toDo.id}>${toDo.text}<button class="${CHECK} ${BTN}">Check</button><button class="${DEL} ${BTN}">❌</button></li>`
          )
          .join("")}
      </ul>
    `;

    toDos.length &&
      $wrap.querySelector("ul").addEventListener("click", handleBtn);
  }
}

export default Pending;
