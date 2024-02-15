"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Hotel from "@/components/Hotel";

function HotelDetail() {
  const [hotelDetail, setHotelDetail] = useState([]);
  const searchParams = useSearchParams();
  const hotelIdparam = searchParams.get("hotelId");
  const hotelIdArray = hotelIdparam.split("-");
  const hotelId = hotelIdArray[0];
  const hotelName = hotelIdArray[1];

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const capacity = searchParams.get("capacity");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };

    fetch(
      `http://localhost:3001/hotels/${hotelId}/rooms?from=${startDate}&to=${endDate}&capacity=${capacity}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => setHotelDetail(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mt-20 ml-20 flex  flex-wrap mt-20">
        <div className="w-400 m-20">
          {" "}
          <marquee behavior="" direction="">
            <h1>{hotelName}</h1>
          </marquee>
        </div>

        {hotelDetail.map((hotel, index) => (
          <div>
            <Hotel key={index} hotelData={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelDetail;
