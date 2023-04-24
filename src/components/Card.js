import { BiHappy } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

export const Card = ({
  name,
  country,
  iconURL,
  temp,
  temp_min,
  humidity,
  feels_like,
  temp_max,
  speed,
  pressure,
  saveWeather,
}) => {
  return (
    <div className="card-container">
      <div className="card-weather">
        <h2>{`${name}, ${country}`}</h2>
        <div className="temp">
          <img src={iconURL} alt="weatherIcon" />
          <h1>{temp}°C</h1>
        </div>
        <div className="card-sats">
          <ul>
            <li>
              <BsArrowDownShort />
              {temp_min}°C
            </li>
            <li>
              <MdOutlineWaterDrop />
              {humidity}
            </li>
            <li>
              <BiHappy />
              {feels_like}
            </li>
          </ul>
          <ul>
            <li>
              <BsArrowUpShort />
              {temp_max}°C
            </li>
            <li>
              <FaWind />
              {speed}
            </li>
            <li>
              <MdCompress />
              {pressure}
            </li>
          </ul>
        </div>
        <button onClick={saveWeather}>+</button>
      </div>
    </div>
  );
};
