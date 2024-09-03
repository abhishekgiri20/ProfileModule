import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import logo from "../../assets/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import loginapi from "../loginapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
const Index = () => {
  const router = useRouter();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);

  const mobileNumber = router.query.mobileNumber;
  const countryCode = router.query.countryCode;

 
  function handleChange(value: any, index: any) {
   
    if (/^[0-9]*$/.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
      if (value && index < 4 - 1) {
        otpBoxReference.current[index + 1]?.focus();
      }
    }
  }
  
  function handleBackspaceAndEnter(e: any, index: any) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && e.target.value && index < 4 - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }



  const handleNumberVerification = async (e: any) => {
    e.preventDefault();
    try {
      const verifyData = {
        mobile_number: mobileNumber,
        otp: otp.join(""),
      };
      const response = await loginapi.verifyNumber(verifyData);
      console.log("Verification response", response);
      response.error_description
        ? toast.error(`${response.error_description}`, {
            position: "top-center",
            autoClose: 3000,
          })
        : router.push("/success");
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = async () => {
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
      const response = await loginapi.registorNumber(mobileData, token );
      toast.success("OTP resend successfully!");
      setMinutes(0);
      setSeconds(30);
    } catch (error) {
      console.log("Error in resending otp",error)
    }
  
  
  
  };

  return (
    <>
      <div className="container  h-100 ">
        <div className="row h-100">
          <div className="col-md-8  m-auto ">
            <div className="welcome-card w-75 text-center m-auto bg-white p-4 rounded-3">
              <div className="welcome-logo">
                <img className="mt-3 mb-4" src={logo.src} alt="" />
              </div>
              <div className="welcome-text d-flex">
                <Link href="/numbersignup">
                  <span className="text-dark">
                    <FaArrowLeft />
                  </span>
                </Link>
                <h3 className="mb-5 w-100">Confirm your number</h3>
              </div>
              <form action="" className="">
                <div className="number-field">
                  <p>
                    Enter the code just sent to: <span>{mobileNumber}</span>
                  </p>
                </div>
                <div className="otp-field d-flex  justify-content-center ">
                  {otp.map((digit, index) => (
                    <input
          
                      key={index}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                      ref={(reference) =>
                        (otpBoxReference.current[index] = reference)
                      }
                    />
                  ))}
                </div>
                <button
                  className="btn btn-outline-success mt-2"
                  onClick={handleNumberVerification}
                >
                  Verify OTP
                </button>
              </form>

              <div className="sign-in d-flex align-items-center justify-content-center mt-3 w-100">
                {seconds > 0 || minutes > 0 ? (
                  <p className="m-0">
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <p className="m-0">Didn't recieve code?</p>
                )}
                <button
                  className="btn bg-white m-2 border-0 "
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    color: seconds > 0 || minutes > 0 ? "" : "#FF5630",
                  }}
                  onClick={resendOTP}
                >
                  Resend OTP
                </button>
                <Link href="/imageupload" className="text-dark text-decoration-none">Skip</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Index;
