import Clock from "./Clock.js";
import TasksContainer from "./TasksContainer.js";
import UserName from "./userName.js";
import Weather from "./weather.js";

class Content {
  constructor({ $target }) {
    this.$target = $target;
    this.$content = document.createElement("section");
    this.$content.className = "content";

    this.weather = new Weather({ $target: this.$content });

    this.clock = new Clock({ $target: this.$content });

    this.userName = new UserName({ $target: this.$content });

    this.tasksContainer = new TasksContainer({ $target: this.$content });

    this.$target.appendChild(this.$content);
  }
}

export default Content;
