import Clock from "./Clock";
import TasksContainer from "./TasksContainer";
import UserName from "./UserName";
import Weather from "./Weather";

class Content {
  private $target: HTMLElement;
  private $content: HTMLElement;

  constructor({ $target }) {
    this.$target = $target;
    this.$content = document.createElement("section");
    this.$content.className = "content";

    const weather = new Weather({ $target: this.$content });

    const clock = new Clock({ $target: this.$content });

    const userName = new UserName({ $target: this.$content });

    const tasksContainer = new TasksContainer({ $target: this.$content });

    this.$target.appendChild(this.$content);
  }
}

export default Content;
