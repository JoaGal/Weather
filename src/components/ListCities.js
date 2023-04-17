import React from "react";

export const ListCities = ({ weather, handleSelect }) => {
  return (
    <ul>
      {weather.map((item, i) => (
        <li key={i} onClick={() => handleSelect(item)}>
          📍 {`${item.state !== undefined && `${item.state}, `}`}
          {item.name}, {item.country}
        </li>
      ))}
    </ul>
  );
};
