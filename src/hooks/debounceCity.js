import { useCitiesService } from "./useCitiesService";

function debounceCity(value, setWeather, city) {
  if (city.current) clearTimeout(city.current);
  city.current = setTimeout(() => {
    value.length > 2 && useCitiesService(value, setWeather);
  }, 1000);
}

export default debounceCity;
