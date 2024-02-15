"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
function Pay() {
  const [user, setUser] = useState();
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState();
  const amount = searchParams.get("price");
  const id = searchParams.get("id");
  const roomType = searchParams.get("hotelname");
  const capacity = searchParams.get("capacity");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const hotelId = searchParams.get("hotelId");
  const idArray = hotelId.split("-");
  const hotelName = idArray[1];
  const cookies = useCookies();
  const token = cookies.get("jwt");
  let payLoad = undefined;
  const days = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24;

  useEffect(() => {
    const headers1 = new Headers();
    headers1.append("Authorization", `Bearer ${token}`);

    var requestOptions1 = {
      method: "GET",
      headers: headers1,
    };

    fetch("http://localhost:3001/auth/profile", requestOptions1)
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.log("error", error));
  }, []);

  const handleBooking = () => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    payLoad = JSON.stringify({
      roomType: roomType,
      from: startDate,
      to: endDate,
    });

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: payLoad,
    };

    fetch(`http://localhost:3001/hotels/${id}/book`, requestOptions)
      .then((response) => response.text())
      .then((result) => setBooking(result))
      .catch((error) => console.log("error", error));
  };
  console.log("bookings", booking ? booking : "");
  console.log("user", user ? user : "");

  if (booking) {
    window.localStorage.setItem("currentBooking", booking);
  }

  return (
    <div className=" login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mt-20 ml-5 search">
        <h1 className="p-3 text-decoration-line: underline text-slate-950	">
          Your Booking Details:
        </h1>

        <div className="borderbox">
          <h1>
            Email: <strong>{user ? user.email : ""}</strong>
          </h1>
          <h1>
            First Name: <strong>{user ? user.firstName : ""}</strong>
          </h1>
          <h1>
            Last Name: <strong>{user ? user.lastName : ""}</strong>
          </h1>
          <h1>
            Hotel: <strong>{hotelName}</strong>
          </h1>
          <h1>
            Room Type: <strong>{roomType}</strong>
          </h1>
          <h1>
            From: <strong>{startDate}</strong>
          </h1>
          <h1>
            To: <strong>{endDate}</strong>
          </h1>
          <h1>
            No of guest: <strong>{capacity}</strong>
          </h1>
          <h1>
            Your payment amount is: <strong>{amount * days}DKK</strong>
          </h1>

          <Link href={`/Final?price=${amount * days}`}>
            <button
              className="w-20 h-50 rounded signupbtn"
              onClick={() => {
                const confirmBox = window.confirm(
                  "Are you sure to proceed this booking?",
                );

                if (confirmBox === true) {
                  handleBooking();
                }
              }}
            >
              confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pay;
