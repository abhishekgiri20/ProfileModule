import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import loginapi from "../loginapi";
import { parseCookies } from "nookies";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const index = () => {
  const [updateSetting, setUpdateSetting] = useState<any>(0);

  const handleSettingUpdation = async (e: any) => {
    try {
      setUpdateSetting((prevSetting: any) => (prevSetting ? 0 : 1));

      const cookies = parseCookies();
      const token = cookies.accessToken;

      if (!token) {
        throw new Error("Access token not found in cookies");
      }

      const response = await loginapi.settingUpdate(
        { is_notified: updateSetting },
        token
      );
      response && toast.success(`${response.message}`);
      console.log("Setting updated", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
  

        <section>
          <div className="container p-5">
            <div className="row">
              <div className="password-heading d-flex align-items-center ">
                <Link href="/myaccount" className="text-decoration-none">
                  <h6 className="mb-0 text-secondary">My Account</h6>
                </Link>
                <MdOutlineKeyboardArrowRight className="card-arrow" />
                <h6 className="mb-0">Notification Settings</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 p-0 mt-5 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Notification Settings</h3>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input fs-4 bg-danger border-0"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    value={updateSetting}
                    onChange={handleSettingUpdation}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />

    </>
  );
};


index.getLayout =  function getLayout(page:any){
  return <Layout>{page}</Layout>
}

export default index;
