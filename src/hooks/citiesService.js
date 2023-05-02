export const citiesService = async (city, setWeather) => {
  try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
  } catch (error) {
    console.log(error);
  }
};
