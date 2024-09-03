import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import loginapi from "../loginapi";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Index = () => {

  const [image, setImage] = useState(null);
  const router = useRouter();
  const handleImageChange = (e:any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
    console.log(e.target.files, "imagefile...........");
  };

  const handleImagePost = async (e: any) => {
    e.preventDefault();

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
        onClose: () => {
          router.push("/signin");
        },
      });
    } catch (error) {
      console.log("error in uploading image");
    }
  };

  return (
    <>
      <section>
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-md-8 m-auto">
              <div className="welcome-card w-75 text-center m-auto bg-white p-3 rounded-2">
                <div className="welcome-logo">
                  <img className="mt-3 mb-4" src={logo.src} alt="" />
                </div>
                <div className="welcome-text d-flex">
                  <Link href="/">
                    <span className="text-dark">
                      <FaArrowLeft />
                    </span>
                  </Link>
                  <h3 className="mb-4 w-100">Finish Signing Up</h3>
                </div>
                <div className="steps">
                  <h6 className="mb-2 text-danger">Step 3 of 3</h6>
                </div>
                <form onSubmit={handleImagePost} className="text-center">
                  <div className="image-box m-auto rounded-circle">
                    {image && (
                      <img src={URL.createObjectURL(image)} alt="Uploaded" />
                    )}
                  </div>

                  <div className="image text-center">
                    <label htmlFor="upload_image" className="w-100 my-3">
                      Upload your picture
                    </label>
                    <input
                      id="upload_image"
                      type="file"
                      name="image"
                      className="border-0 shadow-0 d-none"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-danger w-100">
                    Sign Up
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
