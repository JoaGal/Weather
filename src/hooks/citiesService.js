export const citiesService = async (city, setWeather) => {
  const keyURL = "6bf11c60285b9b4e9ef3802f78058417"
  try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${keyURL}`
      );
      const data = await res.json();
      setWeather(data);
  } catch (error) {
    console.log(error);
  }
};
