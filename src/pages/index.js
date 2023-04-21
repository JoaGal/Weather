import { getFormattedWeatherData } from "../hooks/weatherService";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Card } from "@/components/Card";
import { ListCities } from "@/components/ListCities";
import Link from "next/link";
import bg from "../assets/bg.jpg";
import { loadedUser, logout } from "@/firebase/auth";
import { useUserContext } from "@/context/context";
import { useRouter } from "next/router";

export default function Home() {
  const apiKey = "6bf11c60285b9b4e9ef3802f78058417";
  const [city, setCity] = useState("");
  const [cords, setCords] = useState("");
  const [weather, setWeather] = useState([]);
  const [hours, setHours] = useState({
    hoursReal: "",
    days: "",
  });
  const router = useRouter();
  const { user, setUser } = useUserContext();

  //get cities options
  const callCities = async () => {
    try {
      if (city.length > 2) {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
        );
        const data = await res.json();
        setWeather(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callCities();
  }, [city]);

  //get weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (cords !== "") {
        const data = await getFormattedWeatherData(cords);
        setWeather(data);
      }
    };

    fetchWeatherData();
  }, [cords]);

  const handleSelect = (item) => {
    setCords(`lat=${item.lat}&lon=${item.lon}`);
  };

  // obtener la hora en la configuración regional de EE. UU.
  useEffect(() => {
    let today = new Date();
    let hoursReal = today.toLocaleTimeString("en-US");
    let days = today.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
    setHours({ hoursReal, days });
    if (user === null) {
      loadedUser(setUser);
    }
  }, []);

  const handleLogout = () => {
    if (user !== null) {
      logout();
      router.reload();
    }
  };

  // const saveWeather = () => {
  //   if (user !== null) {
  //     uploadCities(user, city);
  //   }else{
  //     router.push("/login");
  //   }
  // };
  return (
    <>
      <main>
        
        <div className="container">
          <div className="current-info">
            <div className="date-container">
              <p>
                {hours?.hoursReal.slice(0, -6)}
                <span> {hours?.hoursReal.slice(-2)} </span>
              </p>
              <div>{hours.days}</div>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                name="city"
                placeholder="Enter City..."
              />
              {weather.length > 1 && city.length > 2 && (
                <ListCities weather={weather} handleSelect={handleSelect} />
              )}
            </div>
            <div className="user-container" onClick={handleLogout}>
              <Link href={user === null ? "/login" : "/"}>
                <h1>{user === null ? "Login" : user?.displayName}</h1>
                {user === null ? (
                  <FaRegUserCircle className="user-icon" />
                ) : (
                  user?.photoURL !== null && (
                    <Image
                      className="user-img"
                      alt="user"
                      src={user?.photoURL}
                      width={800}
                      height={800}
                    />
                  )
                )}
              </Link>
            </div>
          </div>

          {weather?.temp !== undefined && (
            <Card
              name={weather.name}
              country={weather.country}
              iconURL={weather.iconURL}
              temp={weather.temp.toFixed()}
              temp_min={weather.temp_min}
              humidity={weather.humidity}
              feels_like={weather.feels_like.toFixed()}
              temp_max={weather.temp_max.toFixed()}
              speed={weather.speed.toFixed()}
              pressure={weather.pressure}
            />
          )}
        </div>

        <div className="saved-weathers">
          <div className="today" id="current-temp">
            <IoIosAddCircle className="icon__add" />
          </div>
        </div>
      </main>
    </>
  );
}
