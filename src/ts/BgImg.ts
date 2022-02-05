type Init = {
  $target: HTMLElement;
};

class BgImg {
  private static _IMG_NUM: number = 11;
  private imgNumber: number = 0;
  $target: HTMLElement;

  constructor({ $target }: Init) {
    this.$target = $target;
    this.setState();
  }

  getRandom(): number {
    return Math.floor(Math.random() * BgImg._IMG_NUM) + 1;
  }

  setState() {
    this.imgNumber = this.getRandom();
    this.render();
  }

  render() {
    const { imgNumber, $target } = this;
    const img = new Image();
    img.src = `./assets/images/${imgNumber}.jpg`;

    $target.setAttribute("style", `background-image: url(${img.src})`);
  }
}

export default BgImg;
