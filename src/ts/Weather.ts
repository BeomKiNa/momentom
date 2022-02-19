import { COORDS } from "./constants";

type Coords = {
  latitude: string | null;
  longitude: string | null;
};

class Weather {
  private $weather: HTMLElement;
  private coordsObj: Coords = {
    latitude: null,
    longitude: null,
  };

  constructor({ $target }) {
    this.$weather = document.createElement("span");
    this.$weather.className = "weather";
    this.handleGeoSucces = this.handleGeoSucces.bind(this);
    this.handleGeoError = this.handleGeoError.bind(this);
    $target.appendChild(this.$weather);
    this.loadCoords();
  }

  async getWeather() {
    const {
      coordsObj: { latitude: lat, longitude: lng },
    } = this;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.API_KEY}&units=metric`
    );
    const {
      name: place,
      main: { temp },
      weather,
    } = await response.json();
    const sky = weather[0].main;

    this.render({ place, sky, temp });
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
    const getCoords =
      JSON.parse(localStorage.getItem(COORDS)! as string) || null;
    if (getCoords === null) {
      this.askForCoords();
    } else {
      this.setState(getCoords);
    }
  }

  setState(coordsObj: Coords) {
    this.coordsObj = coordsObj;
    this.saveCoords();
    this.getWeather();
  }

  render({ place, sky, temp }) {
    const { $weather } = this;

    if (place && sky && temp) {
      $weather.innerText = `${place} ${sky} ${temp}°C `;
    }
  }
}

export default Weather;
