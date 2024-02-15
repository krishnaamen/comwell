"use client";
import React from "react";
import Hotel from "@/components/Hotel";
import Link from "next/link";
import CookieConsent from "@/components/CookieConsent";

// remove this code if the backend gets ready

const handleBooking = (hotel) => {
  console.log("hotel clicked");
};
const hotelsData = [
  {
    id: 1,
    img: "/room.jpg",
    name: "Hotel One",
    location: "Location One",
    price: "$100",
    handleBooking: handleBooking(this),
  },
  {
    id: 2,
    img: "/room.jpg",
    name: "Hotel Two",
    location: "Location Two",
    price: "$200",
    handleBooking: handleBooking(this),
  },
  {
    id: 3,
    img: "/room.jpg",
    name: "Hotel One",
    location: "Location One",
    price: "$100",
    handleBooking: handleBooking(this),
  },
  {
    id: 4,
    img: "/room.jpg",
    name: "Hotel Two",
    location: "Location Two",
    price: "$200",
    handleBooking: handleBooking(this),
  },
  {
    id: 5,
    img: "/room.jpg",
    name: "Hotel One",
    location: "Location One",
    price: "$100",
    handleBooking: handleBooking(this),
  },
  {
    id: 6,
    img: "/room.jpg",
    name: "Hotel Two",
    location: "Location Two",
    price: "$200",
    handleBooking: handleBooking(this),
  },
  {
    id: 7,
    img: "/room.jpg",
    name: "Hotel One",
    location: "Location One",
    price: "$100",
    handleBooking: handleBooking(this),
  },
  {
    id: 8,
    img: "/room.jpg",
    name: "Hotel Two",
    location: "Location Two",
    price: "$200",
    handleBooking: handleBooking(this),
  },
  // Add more hotel data here
];

const Hotels = () => {
  return (
    <>
      <CookieConsent />
      <div className="login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="mt-20 ml-20 flex  flex-wrap mt-20">
          {hotelsData.map((hotel, index) => (
            <div>
              <Hotel key={index} hotelData={hotel} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hotels;
