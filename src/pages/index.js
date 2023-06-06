import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { Card } from "@/components/Card";
import { ListCities } from "@/components/ListCities";
import Link from "next/link";
import bg from "../assets/bg.jpg";
import { loadedUser, logout, uploadCities } from "@/firebase/auth";
import { useUserContext } from "@/context/context";
import { useRouter } from "next/router";
import { useCitiesService } from "@/hooks/useCitiesService";
import { useWeatherService } from "@/hooks/useWeatherService";

export default function Home() {
  const city = useRef("");
  const [cords, setCords] = useState("");
  const [cordSave, setCordSave] = useState("");
  const [hours, setHours] = useState({
    hoursReal: "",
    days: "",
  });
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const { weather, setWeather } = useWeatherService(cords);
  const { onQueryChange } = useCitiesService(city, setWeather);

  //get cities
  // const onQueryChange = (e) => {
  //   const { value } = e.target;
  //   if (city.current) clearTimeout(city.current);
  //   city.current = setTimeout(() => {
  //     value.length > 2 && citiesService(value, setWeather);
  //   }, 1000);
  // };

  //get weather data


  // Hour and day
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
      loadedUser(setUser, setCordSave);
    }
  }, []);

  const handleSelect = (item) => {
    setCords(`lat=${item.lat}&lon=${item.lon}`);
  };

  const handleLogout = () => {
    if (user !== null) {
      logout();
      router.reload();
    }
  };

  const saveWeather = () => {
    if (user !== null) {
      uploadCities(user, cords, setCordSave);
    } else {
      router.push("/login");
    }
  };

  return (
    <main>
      <Image src={bg} alt="bg" className="bg" />
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
              onChange={onQueryChange}
              name="city"
              ref={city}
              placeholder="Enter City..."
            />
            {weather.length > 1 && (
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
            saveWeather={saveWeather}
          />
        )}
      </div>

      <div className="saved-weathers">
        {cordSave !== "" ? (
          <div
            className="today"
            id="current-temp"
            onClick={() => useWeatherService(cordSave, setWeather)}
          >
            <GiModernCity className="icon__add" />
          </div>
        ) : (
          <div className="today" id="current-temp">
            <IoIosAddCircle className="icon__add" />
          </div>
        )}
      </div>
    </main>
  );
}
