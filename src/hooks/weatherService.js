const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (cords) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?${cords}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
    
   const {
    weather,
    main: {temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
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
  };
};

export { getFormattedWeatherData };
