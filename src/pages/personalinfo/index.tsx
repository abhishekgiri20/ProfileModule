import React, { useEffect, useState,useRef,useContext } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import country from "../country.json";
import { IoCameraOutline } from "react-icons/io5";
import { FaImages } from "react-icons/fa6";
import { IoCameraReverseOutline } from "react-icons/io5";
import { FcRemoveImage } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import loginapi from "../loginapi";
import { useRouter } from "next/router";
import Layout, { UserContext } from "@/components/Layout";


  const index = () => {

    const profiledata = useContext(UserContext);

    const [profileData, setProfileData] = useState<any>({profiledata});
    const [image, setImage] = useState(null);
    console.log("profile image......",image)
    const [locationEdit, setLocationEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [numberEdit, setNumberEdit] = useState(false);
    const [editNameMode, setEditNameMode] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
  
   
    useEffect(() => {
      setProfileData(profiledata);

    }, [profiledata]); 
  
    const handleEditMode = () => {
      if (!editNameMode) {
        setEditNameMode(true);
      } else {
        setEditNameMode(false);
      }
    };
  
    const handleEditLocation = () => {
      if (!locationEdit) {
        setLocationEdit(true);
      } else {
        setLocationEdit(false);
      }
    };
  
    const handleEditEmail = () => {
      if (!emailEdit) {
        setEmailEdit(true);
      } else {
        setEmailEdit(false);
      }
    };
  
    const handleEditNumber = () => {
      if (!numberEdit) {
        setNumberEdit(true);
      } else {
        setNumberEdit(false);
      }
    };
  
    const handleImageChange = (e: any) => {
      if (e.target.files) {
        setImage(e.target.files[0]);
      }
      console.log(e.target.files, "imagefile...........");
    };
  
    const handleImageUpload = async () => {
      if (!image) {
        return toast.error("Please upload image first", {
          position: "top-center",
          autoClose: 3000,
        });
      }
  
      try {
        const cookies = parseCookies();
        const token = cookies.accessToken;
        if (!token) {
          throw new Error("Access token not found in cookies");
        }
  
        const response = await loginapi.imageUpload(image, token);
        console.log("Image posted:", response);
        toast.success("Image uploaded successfully", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (error) {
        console.log("error in uploading image");
      }
    };
  

    //validation

    
  // Function to handle name input change and validation
  const handleNameChange = (e:any) => {
    const name = e.target.value;
    setProfileData({ ...profileData, first_name: name });
    setNameError(validateName(name));
  };


  const handleEmailChange = (e:any) => {
    const email = e.target.value;
    setProfileData({ ...profileData, email: email });
    setEmailError(validateEmail(email));
  };

  // Validation function for name
  const validateName = (name:any) => {
    const nameRegex = /^[A-Za-z]{4,}$/;
    return nameRegex.test(name) ? "" : "Please enter a name with at least 4 letters and no spaces, numbers, or special characters.";
  };

  // Validation function for email
  const validateEmail = (email:any) => {
    const emailRegex = /^(?!.*\s)[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email) ? "" : "Invalid email address. Please enter a valid email with no spaces.";
  };



  // const handleRemoveProfile = () => {
  //   // Remove the profile image from UI
  //   setImage(null);
  //   // Update the profile data with a null profile image
  //   setProfileData({ ...profileData, profile_image: null });
  //   // Hide the edit mode for the profile image
  //   handleEditProfile();
  //   // Show success message to the user
  //   toast.success("Profile picture removed successfully ", { 
  //     position: "top-center",
  //     autoClose: 3000,
  //   });
  // };

  
    const handleEditProfile = async () => {
 
      try {
        const cookies = parseCookies();
        const token = cookies.accessToken;
        if (!token) {
          throw new Error("Access token not found in cookies");
        }
  
        const editData = {
          ...profileData,
          first_name: profileData.first_name,
          mobile_number: profileData.mobile_number,
          address: profileData.address,
          profile_image: profileData.profile_image,
          email: profileData.email,
        };
        if(!editData.first_name || !editData.email || !editData.address)return toast.error("Input field can not be empty");
        const response = await loginapi.editProfile(editData, token);
        console.log("edit response.......", response);
        setEditNameMode(false);
        setLocationEdit(false);
        setEmailEdit(false);
        setNumberEdit(false);

      } catch (error) {
        console.log("Error in edit api", error);
      }
    };
  
    // const handleRemoveProfile = async() =>{
    // debugger
    //   try {
    //     const cookies = parseCookies();
    //     const token = cookies.accessToken;
    //     if (!token) {
    //       throw new Error("Access token not found in cookies");
    //     }
    //     setProfileData({...profileData, profile_image:null})
    //     setImage(null)
    //     const editData = {
    //       ...profileData,
    //       first_name: profileData.first_name,
    //       mobile_number: profileData.mobile_number,
    //       address: profileData.address,
    //       profile_image: "",
    //       email: profileData.email,
    //     };

    //     const response = await loginapi.editProfile(editData, token);
    //   } catch (error) {
    //     console.log("Error in edit api", error);
    //   }
    // }

    
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

  
    // number verification
    const handleNumberVerification = async (e: any) => {
      e.preventDefault();
      
      try {
        const verifyData = {
          mobile_number: profileData?.mobile_number,
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
      // setMinutes(0);
      // setSeconds(30);
  
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
    }, [seconds, minutes]);
  
    const resendOTP = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.accessToken;
        if (!token) {
          throw new Error("Access token not found in cookies");
        }
        const mobileData = {};
        const response = await loginapi.registorNumber(mobileData, token);
        toast.success("OTP resend successfully!");
        setMinutes(0);
        setSeconds(30);
      } catch (error) {
        console.log("Error in resending otp", error);
      }
    };

  return (
   
         <>
  
      <section className="h-100">
      <div className="container mt-4 ">
        <div className="row">
          <div className="password-heading d-flex align-items-center   ">
            <Link href="/myaccount" className="text-decoration-none">
              <h6 className="mb-0 text-secondary ">My Account</h6>
            </Link>
            <MdOutlineKeyboardArrowRight className="card-arrow" />
            <h6 className="mb-0">Personal info</h6>
          </div>
        </div>
        <div className="row gap-5 ">
          <div className="col-md-7 p-0 mt-5  ">
            <h3 className="mb-0 ">Personal info</h3>

            {editNameMode ? (
              <div className="userinfo_card p-3 mt-4">
                <div className="userinfo_top d-flex align-items-center justify-content-between">
                  <p>Name</p>
                  <p className="text-danger c-pointer" onClick={handleEditMode} style={{cursor:'pointer'}}>Cancel</p>
                 
                </div>
                <div className="useinfo_input w-100 ">
                  <input
                    type="text"
                    id="name"
                    value={profileData?.first_name}
                    autoComplete="off"
                    className="w-100 p-2 mb-3"
                    placeholder="Enter your name"
               
                    onChange={handleNameChange}
                  />
                  {nameError && <p className="text-danger">{nameError}</p>}
                </div>
                <button className="btn btn-danger" onClick={handleEditProfile}>
                  Save
                </button>
              </div>
            ) : (
              <div className="userinfo_card   p-3 mt-4">
                <div className="userinfo_top d-flex justify-content-between mb-3">
                  <p>First Name</p>
                  <p className="text-danger"  onClick={handleEditMode}  style={{cursor:'pointer'}}>Edit</p>
        
                </div>
                <div className=" mb-3">
                  <p>{profileData?.first_name}</p>
         
                </div>
              </div>
            )}

            {locationEdit ? (
              <div className="userinfo_card  p-3 mt-4">
                <div className="userinfo_top d-flex justify-content-between">
                  <p>Location</p>
                  <p className="text-danger" onClick={handleEditLocation} style={{cursor:'pointer'}}>Cancel</p>
                </div>
                <div className="useinfo_input w-100 ">
                  <input
                    type="text"
                    id="location"
                    value={profileData?.address}
                    autoComplete="off"
                    className="w-100 p-2 mb-3"
                    placeholder="Enter your Location"
                    onChange={(e: any) =>
                      setProfileData({
                        ...profileData,
                        address: e?.target?.value,
                      })
                    }
                  />
                </div>
                <button className="btn btn-danger"onClick={handleEditProfile} style={{cursor:'pointer'}}>Save</button>
              </div>
            ) : (
              <div className="userinfo_card  p-3 mt-4">
                <div className="userinfo_top d-flex justify-content-between mb-3">
                  <p>Location</p>
                  <p className="text-danger"  onClick={handleEditLocation} style={{cursor:'pointer'}}>Edit</p>
                </div>
                <div className=" mb-3">
                  <p>{profileData?.address}</p>
                 
                </div>
              </div>
            )}

              {
                emailEdit?
                <div className="userinfo_card  p-3 mt-4">
                  <div className="userinfo_top d-flex justify-content-between">
                    <p>Email</p>
                    <p className="text-danger" onClick={handleEditEmail} style={{cursor:'pointer'}}>Cancel</p>
                  </div>
                  <div className="useinfo_input w-100 ">
                    <input
                      type="text"
                      id="email"
                      value={profileData?.email}
                      autoComplete="off"
                      className="w-100 p-2 mb-3"
                      placeholder="Enter your email"
                      
                      onChange={handleEmailChange}
                    />
                      {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <button className="btn btn-danger" onClick={handleEditProfile} style={{cursor:'pointer'}}>Save</button>
                </div>
                :
                <div className="userinfo_card  p-3 mt-4">
                  <div className="userinfo_top d-flex justify-content-between">
                    <p >Email</p>
                    <p className="text-danger"  onClick={handleEditEmail} style={{cursor:'pointer'}}>Edit</p>
                  
                  </div>
                  <div className="mt-3">
                    <p>{profileData?.email}</p>
                    
                  </div>
             
                </div>

              }


              
              {
              numberEdit?
              <div className="userinfo_card  p-3 mt-4 mb-4">
              <div className="userinfo_top d-flex justify-content-between">
                <label htmlFor="number">Mobile Number</label>
                <p className="text-danger"  onClick={handleEditNumber} style={{cursor:'pointer'}}>Cancel</p>
 
              </div>
              <div className="useinfo_input w-100 ">
                <select
                  className="form-select  w-100 p-3 border bg-white mb-2 "
                  aria-label="Default select example"
                  onChange={(e) => setProfileData({...profileData,country_code:e.target.value})}
                     
                >
                  <option value="" className="text-gray">
                    Country/Region
                  </option>
                  {country?.map((res) => (
                    <option value={res.emoji + res.code + res.dial_code}>
                      {res.emoji + res.code + res.dial_code}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  id="number"
                  className="w-100 p-2 mb-3"
                  placeholder="Enter your Number"
                  value={profileData?.mobile_number}
                  onChange={(e:any) => setProfileData({...profileData, mobile_number: e?.target?.value})}
                />
              </div>
              <button
                className="btn btn-danger "
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Verify
              </button>
            </div>
            :
            <div className="userinfo_card  p-3 mt-4 mb-4">
            <div className="userinfo_top d-flex justify-content-between">
              <p >Mobile Number</p>
              <p className="text-danger"  onClick={handleEditNumber} style={{cursor:'pointer'}}>Edit</p>
             
            </div>
            <div className="mt-3">
             
              <p>{profileData?.mobile_number}</p>
            </div>
           
          </div>
          
              }
              

         
          </div>
          <div className="col-md-4 mt-5 p-4">
            <div className="profile-container  mt-4 ms-5  d-flex justify-content-center align-items-between">
              <div className="image-container  m-auto">
                {image ?(<img src={URL.createObjectURL(image)} alt="profile image" />):( <img src={`http://139.59.47.49:4004/${profileData?.profile_image}`}alt="profile image" />)}
                <div className="dropdown">
                  <span
                    className="image-icon rounded-circle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IoCameraOutline className="bg-white rounded-circle" />
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="selectImage" className="ms-4 "><span className="p-2 fs-4">  <FaImages /></span>  Select Photo</label><input  type="file"  id="selectImage"  name="image"  className="d-none"  onChange={handleImageChange}/>
                    </li>
                    <li><p  className="dropdown-item"  onClick={handleImageUpload}> <span className="p-2 fs-4"><IoCameraReverseOutline /> </span> Upload Photo</p>
                    </li>
                    {/* <li>
                     <p className="dropdown-item" onClick={handleRemoveProfile}><span className="p-2 fs-4">  <FcRemoveImage /></span>Remove Profile</p>
                    </li> */}
                  </ul>
                </div>
                
              </div>
             
            </div>
          </div>
        </div>
      </div>



      
      {/* verify number modal */}
      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Confirm your number
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
            <form action="" className="">
                <div className="number-field text-center">
                  <p>
                    Enter the code just sent to: <span>{profileData?.mobile_number}</span>
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
                  data-bs-dismiss="modal"
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
                  <p className="m-0">Didn't recieve otp?</p>
                )}
                <button
                  className="btn bg-white m-2 border-0 "
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    color: seconds > 0 || minutes > 0 ? "" : "#FF5630",
                  }}
                  onClick={resendOTP}
                >
                 Send again
                </button>
              </div>
            </div>
           
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
      </section>
    </>
   
 
  );
};

index.getLayout =  function getLayout(page:any){
  return <Layout>{page}</Layout>
}
export default index;






