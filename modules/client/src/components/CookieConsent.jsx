import React from "react";
import { hasCookie, setCookie } from "cookies-next";
import Link from "next/link";

const CookieConsent = (props) => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className="  fixed inset-0 bg-white bg-opacity-70">
      <div className="fixed  consent text-align-right flex-column items-center justify-between mt-200 text-white px-4 py-8 bg-gray-100">
        <h1>
          <marquee behavior="" direction="">
            {" "}
            <strong>GDPR consent from Group 10</strong>
          </marquee>
        </h1>
        <span className=" text-white 	 text-base mr-16">
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Cookie
          Policy.Along with the cookies, your username, email, and password in a
          secure manner so that your data security is our concern. If you want
          to change your concent please email us in kkk@gmail.com.
        </span>
        <button
          className=" consentBtn bg-green-500 py-2 px-8 rounded text-white"
          onClick={() => acceptCookie()}
        >
          Accept
        </button>

        <Link href={"/Byebye"}>
          <button className=" consentBtn bg-green-500 py-2 px-8 rounded text-white">
            Reject{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CookieConsent;
