const listWrap = document.querySelector(".listWrap"),
  toDoForm = listWrap.querySelector("form"),
  toDoinput = toDoForm.querySelector("input"),
  listP = listWrap.querySelector(".pending"),
  listF = listWrap.querySelector(".finished");

const P_LS = "PENDING",
  F_LS = "FINISHED";

let P_toDos = [],
  F_toDos = [];

function getObj(text) {
  return (toDoObj = {
    id: String(Date.now()),
    text,
  });
}

function saveToDos() {
  localStorage.setItem(P_LS, JSON.stringify(P_toDos));
  localStorage.setItem(F_LS, JSON.stringify(F_toDos));
}

function removeFromPending(id) {
  P_toDos = P_toDos.filter((toDo) => toDo.id !== id);
}

function removeFromFinished(id) {
  F_toDos = F_toDos.filter((toDo) => toDo.id !== id);
}

function deleteToDo(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromPending(li.id);
  removeFromFinished(li.id);
  saveToDos();
}

function findToPending(id) {
  return P_toDos.find((toDo) => toDo.id == id);
}

function findToFinished(id) {
  return F_toDos.find((toDo) => toDo.id == id);
}

function addToPending(taskObj) {
  P_toDos.push(taskObj);
}

function addToFinished(taskObj) {
  F_toDos.push(taskObj);
}

function checkToDo(e) {
  const li = e.target.parentNode;
  const task = findToPending(li.id);
  li.parentNode.removeChild(li);
  removeFromPending(li.id);
  addToFinished(task);
  finishedPaintToDo(task);
  saveToDos();
}

function backToDo(e) {
  const li = e.target.parentNode;
  const task = findToFinished(li.id);
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  addToPending(task);
  pendingPaintToDo(task);
  saveToDos();
}

function createBtn(name) {
  const btn = document.createElement("button");
  let icon = "";
  let handleBtn;
  btn.classList.add(name);
  switch (name) {
    case "checkBtn":
      icon = "✅";
      handleBtn = checkToDo;
      break;
    case "delBtn":
      icon = "❌";
      handleBtn = deleteToDo;
      break;
    case "backBtn":
      handleBtn = backToDo;
      icon = "⬅️";
      break;
  }
  btn.innerText = icon;
  btn.addEventListener("click", handleBtn);
  return btn;
}

function createList(id, text) {
  const li = document.createElement("li");
  const delBtn = createBtn("delBtn");
  const span = document.createElement("span");
  span.innerText = text;
  li.append(span, delBtn);
  li.id = id;
  return li;
}

function finishedPaintToDo(obj) {
  const list = createList(obj.id, obj.text);
  const backBtn = createBtn("backBtn");
  list.append(backBtn);
  listF.appendChild(list);
}

function pendingPaintToDo(obj) {
  const list = createList(obj.id, obj.text);
  const checkBtn = createBtn("checkBtn");
  list.append(checkBtn);
  listP.appendChild(list);
}

function loadToDos() {
  P_toDos = JSON.parse(localStorage.getItem(P_LS)) || [];
  F_toDos = JSON.parse(localStorage.getItem(F_LS)) || [];
}

function restoreToDos() {
  P_toDos.map((toDo) => pendingPaintToDo(toDo));
  F_toDos.map((toDo) => finishedPaintToDo(toDo));
}

function handleSubmit(e) {
  e.preventDefault();
  const toDoObj = getObj(toDoinput.value);
  P_toDos.push(toDoObj);
  pendingPaintToDo(toDoObj);
  toDoinput.value = "";
  saveToDos();
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadToDos();
  restoreToDos();
}

init();
