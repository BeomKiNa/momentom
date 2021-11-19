import Clock from "./Clock.js";

class Content {
  constructor($target) {
    this.$target = $target;
    this.$content = document.createElement("section");
    this.$content.className = "content";

    this.clock = new Clock(this.$content);

    this.$target.appendChild(this.$content);
  }
}

export default Content;
