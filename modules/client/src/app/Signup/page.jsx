"use client";

import React from "react";
import { useState } from "react";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = year + "-" + month + "-" + day;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === repassword) {
      const signupdata = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthdate,
        email: email,
        password: password,
      };

      console.log(signupdata);
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupdata),
      });

      if (!response.ok) {
        alert("Sign up failed");
        throw new Error("response is not ok");
      }

      let body;
      try {
        body = await response.json();
      } catch {
        alert("Sign up failed");
        throw new Error("can't decode json");
      }

      const { token } = body;
      document.cookie = "jwt=" + token;
      location.href = "/";
    } else {
      alert("password do not match");
    }
  };

  return (
    <div className=" signup flex h-screen">
      <form onSubmit={handleSignup} className=" max-w-md m-20 w-full">
        <div className="mb-1">
          <h1 className=" font-bold mb-2 text-center ">Signup Page</h1>
          <input
            placeholder="Enter your firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-1">
          <input
            placeholder="Enter your lastname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-1">
          <input
            placeholder="enter your birthdate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            max={formattedDate}
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        <div className="mb-1">
          <input
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <input
            placeholder="Enter Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            placeholder="Repeate password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="repassword"
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className=" signupbtn mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
