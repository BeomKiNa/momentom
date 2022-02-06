import { DAYS } from "./constants.js";

type Init = {
  $target: HTMLElement;
};

type DateObj = {
  seconds: null | number;
  minutes: null | number;
  hours: null | number;
  day: null | number;
  date: null | number;
  month: null | number;
};

class Clock {
  private $clockWrap: HTMLElement;
  private nowDate: DateObj = {
    seconds: null,
    minutes: null,
    hours: null,
    day: null,
    date: null,
    month: null,
  };

  constructor({ $target }: Init) {
    this.$clockWrap = document.createElement("article");
    this.$clockWrap.className = "clockWrap";

    $target.appendChild(this.$clockWrap);
    this.getTime = this.getTime.bind(this);
    this.getTime();
    setInterval(this.getTime, 1000);
  }

  getTime() {
    const nowDate = new Date(),
      seconds = nowDate.getSeconds(),
      minutes = nowDate.getMinutes(),
      hours = nowDate.getHours(),
      day = nowDate.getDay(),
      date = nowDate.getDate(),
      month = nowDate.getMonth() + 1;

    this.setState({
      seconds,
      minutes,
      hours,
      day,
      date,
      month,
    });
  }

  setState(nowDateObj: DateObj) {
    this.nowDate = nowDateObj;
    this.render();
  }

  render() {
    const {
      nowDate: { seconds, minutes, hours, day, date, month },
      $clockWrap,
    } = this;

    if (seconds && minutes && hours && day && date && month) {
      $clockWrap.innerHTML = `
      <p class="dateText">
      ${month < 10 ? `0${month}` : month} /
      ${date < 10 ? `0${date}` : date} ${DAYS[day]}
      </p>
      <p class="timeText">
      ${hours < 10 ? `0${hours}` : hours} :
      ${minutes < 10 ? `0${minutes}` : minutes} :
      ${seconds < 10 ? `0${seconds}` : seconds}
      </p>
      `;
    }
  }
}

export default Clock;
