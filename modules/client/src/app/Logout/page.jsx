"use client";
import React from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useEffect } from "react";

function Logout() {
  const cookie = useCookies();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      location.reload();
    }
    //location.reload();
    cookie.remove("jwt");
    localStorage.clear();
    cookie.remove("localConsent");
  }, []);

  return (
    <div className=" login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mt-20 ml-20">
        <div> Successfully logged out </div>
        <Link
          href={"/Login"}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Go to login page
        </Link>
      </div>
    </div>
  );
}

export default Logout;
