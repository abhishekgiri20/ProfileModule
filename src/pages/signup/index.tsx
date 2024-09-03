import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";
import loginapi from "../loginapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleCheckBox = () => {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
  };
  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupData({ ...signupData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const nameValidation = (value: any) => {
    const nameCheck = /^[A-Za-z]{4,}$/;
    if (value.length === 0) {
      return "Name is required";
    }
    if (!nameCheck.test(value)) {
      return "Please enter a name with at least 4 letters and no spaces, numbers, or special characters.";
    }
    return "";
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
      return "password is required";
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

    const nameError = nameValidation(signupData.name);
    const emailError = emailValidation(signupData.email);
    const passwordError = passwordValidation(signupData.password);

    if (nameError) {
      newErrors.name = nameError;
      valid = false;
    }

    if (emailError) {
      newErrors.email = emailError;
      valid = false;
    }

    if (passwordError) {
      newErrors.password = passwordError;
      valid = false;
    }

    if (valid) {
      await handelPostRequest();
    }

    setErrors(newErrors);
  };



  const handelPostRequest = async () => {
    try {
      const postData = {
        email: signupData.email,
        password: signupData.password,
        device_type: 1,
      };
      if (!checkbox) return toast.error("Please accept terms & conditions");

      const response = await loginapi.registor(postData);
      console.log("post data", response);
    
      ((response.message && !response.token)? toast.error(`${response.message}`): toast.success(`${response.message}`,{
         autoClose:3000,
         onClose :()=>{
            router.push("/numbersignup");
         }
      }))
     
    
    } catch (error) {
      console.log("error", error);
    }
  };






  return (
    <>
      <section>
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-md-8 m-auto">
              <div className="welcome-card w-75 text-center m-auto bg-white p-4 rounded-3">
                <div className="welcome-logo">
                  <img className="mt-3 mb-4" src={logo.src} alt="" />
                </div>
                <div className="welcome-text">
                  <h3 className="mb-5">Sign Up</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="signUp-details">
                    <div className="name-container border d-flex justify-content-between px-3 py-2 rounded">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={signupData.name}
                        onChange={handleInput}
                        autoComplete="off"
                        className="border-0 shadow-0 w-100"
                      />
                      <span>
                        <FaUserAlt />
                      </span>
                    </div>
                    {errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}

                    <div className="email-container border d-flex justify-content-between px-3 py-2 my-3 rounded">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={signupData.email}
                        onChange={handleInput}
                        className="border-0 shadow-0 w-100 "
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
                        name="password"
                        value={signupData.password}
                        onChange={handleInput}
                        className="border-0 shadow-0 w-100 "
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

                  <div className="terms d-flex align-items-center my-3 ">
                    <input
                      type="checkbox"
                      onChange={handleCheckBox}
                    />
                    <p className="m-0 pt-4 p-0">
                      By clicking Create an Account you agree to the{' '}
                      <span className="text-danger border-bottom border-danger ">
                      Terms of service{' '}
                      </span>
                      and{' '}
                      <span className="text-danger border-bottom border-danger">
                        Privacy Policy
                      </span>
                    </p>
                  </div>

                  <button type="submit" className="btn btn-danger w-100">
                    Sign Up
                  </button>
                </form>

                <div className="sign-in d-flex justify-content-center mt-3">
                  <p>You already have an account?</p>
                  <Link href="/signin" className="text-danger mx-1">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Index;
