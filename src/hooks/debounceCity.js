import { citiesService } from "./citiesService";

function debounceCity(value, setWeather, city) {
  if (city.current) clearTimeout(city.current);
  city.current = setTimeout(() => {
    value.length > 2 && citiesService(value, setWeather);
  }, 1000);
}

export default debounceCity;
