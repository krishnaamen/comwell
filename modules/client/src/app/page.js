"use client";
import Image from "next/image";
import Display from "@/components/Locations";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <>
      <CookieConsent />
      <div className=" login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="mt-20 ml-20 w-64">
          <span>
            <strong>
              Comwell represents a collection of 16 hotels situated in Denmark,
              alongside one in Sweden. Additionally, we oversee the locations
              Centraleværkstedet and Smedien nestled in the heart of Aarhus.
              Each of our accommodations possesses its own unique
              characteristics and ambiance. Nevertheless, they all share a
              common thread - a welcoming host, exceptional service, and a team
              of skilled professionals.
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}
