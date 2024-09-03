import React, { useState, useEffect, createContext } from "react";
import { parseCookies } from "nookies";
import loginapi from "@/pages/loginapi";
import Header from "./Header";
import Footer from "./Footer";

export const UserContext = createContext({} as any);

const Layout = ({ children }: any) => {

  const [profileData, setProfileData] = useState<any>();

  const getUserProfileData = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        throw new Error("Access token not found in cookies");
      }
      const response = await loginapi.getUserData(token);
      console.log("user data...........", response);
      setProfileData(response?.profile);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
       
        <UserContext.Provider value={profileData }>
        <Header/>
          <main>{children }</main>
        </UserContext.Provider>
         <Footer/>
      </div>
    </>
  );
};

export default Layout;


