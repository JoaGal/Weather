const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

export const weatherService = async (cords, setWeather) => {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?${cords}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
    const res = await fetch(URL)
    const data = await res.json();
    const {
      weather,
      main: {temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;
    const { description, icon } = weather[0];
    setWeather({
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    });     
  } catch (error) {
    console.log(error);
  }
}