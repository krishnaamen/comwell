"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function Final() {
  const searchParams = useSearchParams();
  const booking = JSON.parse(window.localStorage.getItem("currentBooking"));
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = today.getDate().toString().padStart(2, "0");

  // Format the date as "yyyy-MM-dd"
  const formattedDate = year + "-" + month + "-" + day;

  const amount = searchParams.get("price");
  return (
    <div className="login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mt-20 ml-2 flex  flex-col mt-20">
        <h1>Your booking confirmation details:</h1>
        <hr />
        <h1>
          Room Id: <strong>{booking.room}</strong>
        </h1>
        <h1>
          From: <strong>{booking.from}</strong>
        </h1>
        <h1>
          To: <strong>{booking.to}</strong>
        </h1>
        <h1>
          Booking Id: <strong>{booking._id}</strong>
        </h1>
        <h1>
          Paid Amount: <strong>{amount} DKK</strong>
        </h1>
        <h1>
          Booking Date: <strong>{formattedDate}</strong>
        </h1>
      </div>
    </div>
  );
}

export default Final;
