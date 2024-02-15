import React from "react";
import { Redirect } from "react-router-dom";

const checkLoggedIn = () => {
  // Check if the JWT token is stored in the cookies
  const jwtToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );

  // Check if the user is logged in
  const isLoggedIn = !!jwtToken; // You can modify this check based on your authentication logic

  // If the user is logged in and the JWT token is present, proceed to the next page
  if (isLoggedIn && jwtToken) {
    return true;
  }

  // If the user is not logged in or the JWT token is not present, redirect the user to the login page
  return false;
};

export default checkLoggedIn;
