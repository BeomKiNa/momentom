import Finished from "./Finished.js";
import Pending from "./Pending.js";
import ToDoForm from "./ToDoForm.js";

class ToDo {
  constructor({ $target }) {
    this.$listWrap = document.createElement("section");
    this.$listWrap.className = "listWrap cf";

    this.toDoForm = new ToDoForm({
      $target: this.$listWrap,
      newToDo: (text) => {
        const toDoObj = {
          id: String(Date.now()),
          text,
        };
        this.pending.addToDo(toDoObj);
      },
    });

    this.pending = new Pending({
      $target: this.$listWrap,
      handleCheck: (toDoObj) => this.finished.addToDo(toDoObj),
    });

    this.finished = new Finished({
      $target: this.$listWrap,
      handleBack: (toDoObj) => this.pending.addToDo(toDoObj),
    });

    $target.appendChild(this.$listWrap);
  }
}

export default ToDo;
