

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import loginapi from "../loginapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Index = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForgetPassword = async (e:any) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter email first");
    }
    try {
      const response = await loginapi.forgetPassword({ email: email });
      if (response) {
        toast.success("Reset Token Send Successfully");
        router.push("/password");
      } else {
        toast.error("Email is incorrect");
      }
    } catch (error) {
      console.log("error in sending token", error);
    }
  };

  return (
    <>
      <section>
        <div className="container h-100 ">
          <div className="row h-100">
            <div className="col-md-8 m-auto  ">
              <div className="welcome-card w-75 text-center m-auto bg-white p-4 rounded-3">
                <div className="welcome-logo">
                  <img className="mt-3 mb-4" src={logo.src} alt="" />
                </div>
                <div className="welcome-text d-flex">
                  <h4 className="mb-4 w-100">Forgotten Your password?</h4>
                </div>
                <form onSubmit={handleForgetPassword}>
                  <div className="signUp-details ">
                    <div className="email-container border d-flex justify-content-between px-3 py-2 my-3 rounded">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="border-0 shadow-0 w-100 "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger w-100 mb-2">
                    Send Reset Link
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Index;
