"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Hotel = ({ hotelData }) => {
  const [useremail, setUseremail] = useState("");

  const params = useSearchParams();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUseremail(localStorage.getItem("username"));
    }
  }, []);
  const srcdata = `/${hotelData.name}.jpeg`;
  const handleBooking = (hotelData) => {};
  return (
    <div className="flex  flex-grow max-w-full h-full">
      <div className=" flex hotel flex-col  p-2">
        <Image
          className="rounded-sm bgimage"
          src={srcdata}
          alt={hotelData.name}
          width={200}
          height={200}
          style={{ width: "200px", height: "150px" }}
        />
        <h2>{hotelData.name}</h2>
        <p>Capacity: {hotelData.capacity}</p>
        <p>Price: {hotelData.price}</p>
        <div>
          {useremail ? (
            <div>
              <span>
                <Link
                  href={`/Pay?id=${hotelData._id}&hotelname=${
                    hotelData.name
                  }&capacity=${hotelData.capacity}&price=${
                    hotelData.price
                  }&startDate=${params.get("startDate")}&endDate=${params.get(
                    "endDate",
                  )}&hotelId=${params.get("hotelId")}`}
                >
                  <button className="btn"> Book </button>
                </Link>
              </span>
            </div>
          ) : (
            <div>
              <Link
                href={`/Login?booking_in_progress=${encodeURIComponent(
                  `Pay?id=${hotelData._id}&hotelname=${
                    hotelData.name
                  }&capacity=${hotelData.capacity}&price=${
                    hotelData.price
                  }&startDate=${params.get("startDate")}&endDate=${params.get(
                    "endDate",
                  )}&hotelId=${params.get("hotelId")}`,
                )}`}
              >
                <button className="btn"> Book </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
