class UserName {
  USER_LS = "userName";
  userName = null;

  constructor($target) {
    this.$userWrap = document.createElement("div");
    $target.appendChild(this.$userWrap);
    this.getUser();
  }

  setUser = (name) => {
    localStorage.setItem(this.USER_LS, JSON.stringify(name));
  };

  getUser = () => {
    const name = JSON.parse(localStorage.getItem(this.USER_LS));
    this.setState(name);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const $nameInput = e.target.name;
    const value = $nameInput.value;
    $nameInput.value = "";
    this.setState(value);
  };

  setState(name) {
    this.userName = name;
    if (name) this.setUser(name);
    this.render();
  }

  render() {
    const { userName } = this;
    if (userName) {
      this.$userWrap.innerHTML = `<p>Hello ${userName}</p>`;
    } else {
      this.$userWrap.innerHTML = `
        <form action="#" class="nameForm">
            <input type="text" placeholder="Hello Stranger" id="name" />
        </form>
        `;

      this.$userWrap
        .querySelector("form")
        .addEventListener("submit", this.onSubmit);
    }
  }
}

export default UserName;
