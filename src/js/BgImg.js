class BgImg {
  static _IMG_NUM = 11;
  imgNumber = 0;

  constructor({ $target }) {
    this.$target = $target;
    this.setState();
  }

  getRandom() {
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
