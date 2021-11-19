class Clock {
  DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  constructor($target) {
    this.$clockWrap = document.createElement("article");
    this.$clockWrap.className = "clockWrap";

    $target.appendChild(this.$clockWrap);
    this.getTime();
    setInterval(this.getTime, 1000);
  }

  getTime = () => {
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
  };

  setState(nowDateObj) {
    this.nowDate = nowDateObj;
    this.render();
  }

  render() {
    const { seconds, minutes, hours, day, date, month } = this.nowDate;
    this.$clockWrap.innerHTML = `
        <p class="dateText">
            ${month < 10 ? `0${month}` : month} /
            ${date < 10 ? `0${date}` : date} ${this.DAYS[day]}
        </p>
        <p class="timeText">
            ${hours < 10 ? `0${hours}` : hours} :
            ${minutes < 10 ? `0${minutes}` : minutes} :
            ${seconds < 10 ? `0${seconds}` : seconds}
        </p>
      `;
  }
}

export default Clock;
