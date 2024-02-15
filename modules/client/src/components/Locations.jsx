"use client";
import React, { useState, useEffect } from "react";

function Locations() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/hotels")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {hotels.map((hotel, index) => (
        <div key={index} className="border rounded-lg p-4">
          <img src={hotel.picture} alt={hotel.name} className="mb-4" />
          <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
          <p className="mb-2">{hotel.address}</p>
          <p className="mb-2">Booked Date: {hotel.bookedDate}</p>
          <p className="mb-2">Available Dates: {hotel.availableDates}</p>
          <p className="mb-2">Price for One Room a Night: {hotel.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Locations;
