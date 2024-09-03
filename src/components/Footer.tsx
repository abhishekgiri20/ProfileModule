import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import applebutton from "../assets/apple.png"
import playbutton from "../assets/googleplay.png"
const Footer = () => {
  return (
    <>

        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="footer d-flex flex-column justify-content-center align-items-center bg-red ">
                <div className="footer-items d-flex flex-column justify-content-center align-items-center">
                  <div className="social-media d-flex  mb-2 ">
                    <div className="icons p-2  mb-2">
                      <FaFacebookF className="text-white w-100 h-100" />
                    </div>
                    <div className="icons p-2  mb-2">
                      <FaInstagram className="text-white w-100 h-100" />
                    </div>
                    <div className="icons p-2  mb-2">
                      <FaTwitter className="text-white w-100 h-100" />
                    </div>
                    <div className="icons p-2  mb-2">
                      <FaYoutube className="text-white w-100 h-100" />
                    </div>
                  </div>
                  <div className="copyright-text text-white text-center ">
                   <p>@Copyright 2024 Arjun Award - All rightts reserved. Terms &
                    Conditions</p> 
                  </div>
                  <div className="footer-buttons d-flex align-items-center mt-3">
                    <div className="play-btn  ">
                      <img src={playbutton.src} alt="" className=" w-100 h-100 " />
                    </div>
                    <div className="google-btn ">
                      <img src={applebutton.src} alt="" className=" w-100 h-100 " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  );
};

export default Footer;
