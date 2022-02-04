import BgImg from "./BgImg";
import Content from "./Content";

class App {
  private bg;
  private content;
  constructor($target: HTMLElement) {
    this.bg = new BgImg({ $target });

    this.content = new Content({ $target });
  }
}

export default App;
