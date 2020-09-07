const listWrap = document.querySelector(".listWrap"),
    toDoForm = listWrap.querySelector("form"),
    toDoinput = toDoForm.querySelector("input"),
    listP = listWrap.querySelector(".pendding"),
    listF = listWrap.querySelector(".finished");

const P_LS = "PENDING",
    F_LS ="FINISHED";

let P_toDos,F_toDos;

// function paintToDo(text,ul,array){
//     const li = document.createElement("li"),
//         delBtn = document.createElement("button"),
//         cheBackBtn = document.createElement("button"),
//         toDoText = document.createTextNode(text),
//         delText = document.createTextNode("❌"),
//         cheText = document.createTextNode("✔"),
//         backText = document.createTextNode("◀");

//     delBtn.appendChild(delText);
//     if(ul === listP){
//         cheBackBtn.appendChild(cheText);
//     }else if(ul === listF){
//         cheBackBtn.appendChild(backText);
//     }
//     backBtn.appendChild(backText);
//     li.appendChild(toDoText);
//     li.appendChild(delBtn);
//     li.appendChild(cheBackBtn);
//     li.id = array.length + 1;
//     ul.appendChild(li);
// }

// function loadToDo(){
//     const P_List = localStorage.getItem(P_LS),
//         F_List = localStorage.getItem(F_LS);

//     if(P_List!==null){
//         paintToDo(P_List,listP,P_toDos);
//     }else{
//         return false;
//     }

//     if(F_List!==null){
//         paintToDo(F_List,listF,P_toDos);
//     }else{
//         return false;
//     }
// }

function getTaskObj(text){
    return{
        id: String(Date.now()),
        text
    };
}

function addToFinished(list){
    F_toDos.push(list);
}

function addToPending(list){
    P_toDos.push(list);
}

function findInFinished(id){
    return F_toDos.find(function(list){
        return list.id === id;
    });
}

function findInPending(id){
    return P_toDos.find(function(list){
        return list.id === id;
    });
}

function removeFromFinished(id){
    F_toDos = F_toDos.filter(function(list){
        return list.id !== id;
    });
}

function removeFromPending(id){
    P_toDos = P_toDos.filter(function(list){
        return list.id !== id;
    });
}

function backList(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFinished(li.id);
    removeFromFinished(li.id);
    addToPending(task);
    paintPendingToDo(task);
    saveToDos();
}

function checkList(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInPending(li.id);
    removeFromPending(li.id);
    addToFinished(task);
    paintFinishedToDo(task);
    saveToDos();
}

function deleteList(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinished(li.id);
    removeFromPending(li.id);
    saveToDos();
}

function bulidList(task){
    const li = document.createElement("li"),
        span = document.createElement("span"),
        delBtn = document.createElement("button");
    span.innerText = task.text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteList);
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function paintPendingToDo(task){
    const list = bulidList(task),
        cheBtn = document.createElement("button");
    cheBtn.innerText = "✔";
    cheBtn.addEventListener("click",checkList);
    list.append(cheBtn);
    listP.append(list);
}

function paintFinishedToDo(task){
    const list = bulidList(task),
        backBtn = document.createElement("button");
    backBtn.innerText = "◀";
    backBtn.addEventListener("click",backList);
    list.append(backBtn);
    listF.append(list);
}

function saveToDos(){
    localStorage.setItem(P_LS,JSON.stringify(P_toDos));
    localStorage.setItem(F_LS,JSON.stringify(F_toDos));
}

function loadToDo(){
    P_toDos = JSON.parse(localStorage.getItem(P_LS)) || [];
    F_toDos = JSON.parse(localStorage.getItem(F_LS)) || [];
}

function restoreToDos(){
    P_toDos.forEach(function(list){
        paintPendingToDo(list)
    });
    F_toDos.forEach(function(list){
        paintFinishedToDo(list)
    });
}

function handleFormSubmit(e){
    e.preventDefault();
    const taskObj = getTaskObj(toDoinput.value);
    toDoinput.value = "";
    paintPendingToDo(taskObj);
    addToPending(taskObj);
    saveToDos();
}

function init(){
    toDoForm.addEventListener("submit",handleFormSubmit);
    loadToDo();
    restoreToDos();
}

init();