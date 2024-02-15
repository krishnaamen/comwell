import React from "react";

function Byebye() {
  return (
    <div className="login flex flex-col items-start  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mt-20 ml-20 flex  flex-wrap mt-20">
        <marquee className="text-white" behavior="" direction="">
          <h1>Have a nice Day!!!</h1>
        </marquee>
        <div>
          You are landed to the Gdpr reject page <br />
          please kindly exit the page.
        </div>
      </div>
    </div>
  );
}

export default Byebye;
