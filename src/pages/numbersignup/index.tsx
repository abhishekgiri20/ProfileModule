import React, { useState } from "react";
import logo from "../../assets/logo.png";
import Link from "next/link";
import country from "../country.json";
import loginapi from "../loginapi";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPhoneAlt } from "react-icons/fa";
const index = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const router = useRouter();

  const handleNumberRegistration = async (e: any) => {
    e.preventDefault();
     debugger
    if (!countryCode || !mobileNumber) {
      return toast.error("Please fill all the fields first!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else if (!/^\d+$/.test(mobileNumber) || mobileNumber.length !== 10) {
      return toast.error("Mobile number should be exactly 10 digits", {
        position: "top-center",
        autoClose: 1000,
      });
    }
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        throw new Error("Access token not found in cookies");
      }
      const mobileData = {
        mobile_number: mobileNumber,
        country_code: countryCode,
      };
      const response = await loginapi.registorNumber(mobileData, token);
      toast.success("OTP sent successfully", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => {
          console.log("post data", response);
          router.push({
            pathname: "/verifyotp",
            query: {
              mobileNumber: `${mobileNumber}`,
              countryCode: `${countryCode}`,
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className="container h-100  ">
          <div className="row h-100">
            <div className="col-md-8  m-auto text-center ">
              <div className="welcome-card w-75 text-center m-auto bg-white p-4 rounded-3">
                <div className="welcome-logo">
                  <img className="mt-3 mb-4" src={logo.src} alt="" />
                </div>
                <div className="welcome-text d-flex">
                  <h3 className="mb-5 w-100">Sign Up</h3>
                </div>
                <form action="">
                  <div className="signUp-details ">
                    <select
                      className=" w-100 p-3  bg-white"
                      aria-label="Default select example"
                      onChange={(e) => setCountryCode(e.target.value)}
                     
                    >
                      <option value="" className="text-gray">Country/Region</option>
                      {country?.map((res) => (
                        <option value={res.emoji+res.code + res.dial_code} >{res.emoji+res.code + res.dial_code}</option>
                      ))}
                    </select>

                    <div className="password-container border d-flex justify-content-between align-items-center px-3 py-2 rounded">
                      <FaPhoneAlt />
                      <input
                        type="number"
                        placeholder="Mobile Number"
                        className="border-0 shadow-0 w-100 mx-2 "
                        onChange={(e: any) => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100 mt-3"
                    onClick={handleNumberRegistration}
                  >
                    Continue
                  </button>
                </form>
                <div className="sign-in d-flex justify-content-center mt-3">
                  <p>You have already account? </p>
                  <Link href="/signin" className="text-danger mx-1">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default index;
