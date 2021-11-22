import { COORDS } from "./constants.js";

class Weather {
  API_KEY = "8fe1baf3aef0a2073f16346b8f874d78";
  $weather = null;
  weather = {
    place: null,
    sky: null,
    temp: null,
  };

  constructor({ $target }) {
    this.$weather = document.createElement("span");
    this.$weather.className = "weather";
    this.handleGeoSucces = this.handleGeoSucces.bind(this);
    this.handleGeoError = this.handleGeoError.bind(this);
    $target.appendChild(this.$weather);
    this.loadCoords();
  }

  getWeather() {
    const {
      coordsObj: { latitude: lat, longitude: lng },
      render,
    } = this;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const {
          name: place,
          main: { temp },
          weather,
        } = json;
        const sky = weather[0].main;

        this.weather = {
          place,
          sky,
          temp,
        };
        render();
      });
  }

  handleGeoSucces(position) {
    const {
      coords: { latitude, longitude },
    } = position;

    this.setState({ latitude, longitude });
  }

  handleGeoError() {
    console.log("sorry error");
  }

  askForCoords() {
    const { handleGeoSucces, handleGeoError } = this;
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  }

  saveCoords() {
    localStorage.setItem(COORDS, JSON.stringify(this.coordsObj));
  }

  loadCoords() {
    const { askForCoords, setState } = this;
    const getCoords = JSON.parse(localStorage.getItem(COORDS)) || null;
    if (getCoords === null) {
      askForCoords();
    } else {
      setState(getCoords);
    }
  }

  async setState(coordsObj) {
    this.coordsObj = coordsObj;
    this.saveCoords();
    this.getWeather();
  }

  render() {
    const {
      $weather,
      weather: { place, sky, temp },
    } = this;

    if (place && sky && temp) {
      $weather.innerText = `${place} ${sky} ${temp}°C `;
    }
  }
}

export default Weather;
