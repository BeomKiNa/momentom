import { USER_NAME } from "./constants.js";

class UserName {
  userName = null;

  constructor({ $target }) {
    this.$userWrap = document.createElement("div");
    $target.appendChild(this.$userWrap);
    this.getUser();
  }

  setUser = (name) => {
    localStorage.setItem(USER_NAME, JSON.stringify(name));
  };

  getUser = () => {
    const name = JSON.parse(localStorage.getItem(USER_NAME));
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
    const { userName, $userWrap, onSubmit } = this;
    if (userName) {
      $userWrap.innerHTML = `<p>Hello ${userName}</p>`;
    } else {
      $userWrap.innerHTML = `
        <form action="#" class="nameForm">
            <input type="text" placeholder="Hello Stranger" id="name" />
        </form>
        `;

      $userWrap.querySelector("form").addEventListener("submit", onSubmit);
    }
  }
}

export default UserName;
