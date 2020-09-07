const userWrap = document.querySelector(".userWrap"),
    p = userWrap.querySelector("p"),
    form = userWrap.querySelector("form"),
    input = form.querySelector("input");

const USER_LS = "userName";

function saveUser(username){
    localStorage.setItem(USER_LS,username);
}

function handleSubmit(e){
    e.preventDefault();
    const value = input.value;
    paintName(value);
    saveUser(value);
    input.value = "";
}

function askName(){
    form.classList.add("show");
    form.addEventListener("submit",handleSubmit);
}

function paintName(name){
    form.classList.remove("show");
    form.classList.add("none");
    p.innerText = `Hello ${name}`;
}

function loadname(){
    const userName = localStorage.getItem(USER_LS);

    if(userName === null){
        askName();
    }else{
        paintName(userName);
    }
}

function init(){
    loadname();
}

init();