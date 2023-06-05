import { useCallback, useEffect } from "react";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

export function useWeatherService(cords, setWeather) {
  const weatherService = useCallback( async () => {
    const keyURL = "6bf11c60285b9b4e9ef3802f78058417";
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?${cords}&appid=${keyURL}&units=metric`;
      const res = await fetch(URL);
      const data = await res.json();
      const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
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
  });

  useEffect(() => {
    cords !== "" && weatherService(cords, setWeather);
  }, [cords]);
}
