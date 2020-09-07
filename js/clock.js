const clockWrap = document.querySelector(".clockWrap"),
    dateText = clockWrap.querySelector(".dateText"),
    timeText = clockWrap.querySelector(".timeText");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTime(){
    const nowDate = new Date(),
        seconds = nowDate.getSeconds(),
        minutes = nowDate.getMinutes(),
        hours = nowDate.getHours(),
        day = nowDate.getDay(),
        date =nowDate.getDate(),
        month = nowDate.getMonth()+1;

    dateText.innerText = `${month < 10 ? `0${month}`: month}/${date < 10 ? `0${date}`: date} ${days[day]}`;

    timeText.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}`;
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();