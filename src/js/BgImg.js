class BgImg {
  static _IMG_NUM = 11;
  constructor({ $target }) {
    this.$target = $target;
    this.setState();
  }

  getRandom = () => {
    return Math.floor(Math.random() * BgImg._IMG_NUM) + 1;
  };

  setState() {
    this.imgNumber = this.getRandom();
    this.render();
  }

  render() {
    const { imgNumber, $target } = this;
    const img = new Image();
    img.src = `img/${imgNumber}.jpg`;

    $target.setAttribute("style", `background-image: url(${img.src})`);
  }
}

export default BgImg;
