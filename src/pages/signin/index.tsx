
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { MdEmail } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import Link from "next/link";
import loginapi from "../loginapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Index = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setSigninData({ ...signinData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const emailValidation = (email: any) => {
    const emailCheck = /^(?!.*\s)[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (email.length === 0) {
      return "Email is required";
    }
    if (!emailCheck.test(email)) {
      return "Invalid email address. Please enter a valid email with no spaces.";
    }
    return "";
  };

  const passwordValidation = (password: any) => {
    const passwordCheck =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@_!#$%^&*()<>?/\|}{~:])[A-Za-z0-9@_!#$%^&*()<>?/\|}{~:]{8,}$/;
    if (password.length === 0) {
      return "Password is required";
    }
    if (!passwordCheck.test(password)) {
      return "Password should be 8 characters or longer and include an uppercase letter, a number, and a special character";
    }
    return "";
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    const emailError = emailValidation(signinData.email);
    const passwordError = passwordValidation(signinData.password);

    if (emailError) {
      newErrors.email = emailError;
      valid = false;
    }

    if (passwordError) {
      newErrors.password = passwordError;
      valid = false;
    }

    if (valid) {
      await handleSignInRequest();
    }

    setErrors(newErrors);
  };

  const handleSignInRequest = async () => {
    try {
      const data = {
        email: signinData.email,
        password: signinData.password,
      };
      const response = await loginapi.signinEmail(data);

      !response
        ? toast.error("Enter valid email", {
            position: "top-center",
            autoClose: 3000,
          })
        : toast.success("Login Successfully",{
          onClose: () =>{
            router.push("/myaccount");
          }
        });
      console.log("signIn data......", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
     
      
        <section>
            <div className="container   h-100 ">
              <div className="row h-100">
                <div className="col-md-8  m-auto  ">
                  <div className="welcome-card w-75 text-center m-auto bg-white p-4 rounded-3">
                    <div className="welcome-logo">
                      <img className="mt-3 mb-4" src={logo.src} alt="" />
                    </div>
                    <div className="welcome-text d-flex">
                   
                      <h3 className="mb-5 w-100">Welcome Back</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="signUp-details ">
                        <div className="email-container border d-flex justify-content-between px-3 py-2 my-3 rounded">
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="border-0 shadow-0 w-100 "
                            value={signinData.email}
                            name="email"
                            onChange={handleInput}
                            autoComplete="off"
                          />
                          <span>
                            <MdEmail />
                          </span>
                        </div>
                        {errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                        <div className="password-container border d-flex justify-content-between px-3 py-2 rounded">
                          <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            className="border-0 shadow-0 w-100 "
                            value={signinData.password}
                            name="password"
                            onChange={handleInput}
                            autoComplete="off"
                          />
                          <span>
                            {passwordShown ? (
                              <IoEyeSharp onClick={togglePasswordVisibility} />
                            ) : (
                              <GoEyeClosed onClick={togglePasswordVisibility} />
                            )}
                          </span>
                        </div>
                        {errors.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                      </div>
                      <div className="terms d-flex justify-content-end align-items-center my-3 ">
                        <Link href="/forgetPassword" className="text-danger">
                          Forget Password?
                        </Link>
                      </div>
                      <button type="submit" className="btn btn-danger w-100">
                        Sign In
                      </button>
                    </form>
                    <div className="sign-in d-flex justify-content-center mt-3">
                      <p>Don't have an account? </p>
                      <Link href="/signup" className="text-danger mx-1">
                        Sign Up
                      </Link>
                    </div>
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
