class BgImg {
  IMG_NUM = 11;
  constructor($target) {
    this.$target = $target;
    this.setState();
  }

  getRandom = () => {
    return Math.floor(Math.random() * this.IMG_NUM) + 1;
  };

  setState() {
    this.imgNumber = this.getRandom();
    this.render();
  }

  render() {
    const img = new Image();
    img.src = `img/${this.imgNumber}.jpg`;

    this.$target.setAttribute("style", `background-image: url(${img.src})`);
  }
}

export default BgImg;
