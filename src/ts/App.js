import BgImg from "./BgImg.js";
import Content from "./Content.js";

class App {
  constructor($target) {
    this.bg = new BgImg({ $target });

    this.content = new Content({ $target });
  }
}

export default App;
