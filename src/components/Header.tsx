import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/profilelogo.png";
import { UserContext } from "./Layout";

const Header = () => {
  const userdata = useContext(UserContext);
  return (
    <>
      <header>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="header d-flex justify-content-between align-items-center shadow bg-body-tertiary">
                <div className="logo">
                  <img
                    src={logo.src}
                    alt=""
                    className="w-100 h-100 object-fit-cover img-fluid"
                  />
                </div>
                <div className="profile d-flex justify-content-around align-items-center rounded">
                  <div className="profile-img  ">
                  
                     <img src={`http://139.59.47.49:4004/${userdata?.profile_image}`}alt="profile image"   className="w-100 h-100 rounded-circle"/>
                  </div>
                  <div className="profile-name">
                    <h6 className="m-0">Abhishek Giri</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
function setProfileData(profile: any) {
  throw new Error("Function not implemented.");
}

