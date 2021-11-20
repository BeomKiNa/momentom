import Clock from "./Clock.js";
import ToDo from "./todo.js";
import UserName from "./userName.js";
import Weather from "./weather.js";

class Content {
  constructor($target) {
    this.$target = $target;
    this.$content = document.createElement("section");
    this.$content.className = "content";

    this.weather = new Weather({ $target: this.$content });

    this.clock = new Clock(this.$content);

    this.userName = new UserName(this.$content);

    this.toDo = new ToDo(this.$content);

    this.$target.appendChild(this.$content);
  }
}

export default Content;
