import { COORDS } from "./constants.js";

class Weather {
  weather = {
    place: null,
    sky: null,
    temp: null,
  };

  constructor({ $target }) {
    this.$weather = document.createElement("span");
    this.$weather.className = "weather";
    $target.appendChild(this.$weather);
    this.loadCoords();
  }

  getWeather = () => {
    const {
      coordsObj: { latitude: lat, longitude: lng },
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
        this.render();
      });
  };

  handleGeoSucces = (position) => {
    const {
      coords: { latitude, longitude },
    } = position;

    this.setState({ latitude, longitude });
  };

  handleGeoError = () => {
    console.log("sorry error");
  };

  askForCoords = () => {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  };

  saveCoords = () => {
    localStorage.setItem(COORDS, JSON.stringify(this.coordsObj));
  };

  loadCoords = () => {
    const getCoords = JSON.parse(localStorage.getItem(COORDS)) || null;
    if (getCoords === null) {
      this.askForCoords();
    } else {
      this.setState(getCoords);
    }
  };

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
