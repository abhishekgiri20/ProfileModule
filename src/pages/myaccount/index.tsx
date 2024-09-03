import React from "react";
import Link from "next/link";
import personalInfoImg from "../../assets/personal_info.png";
import passwordImg from "../../assets/change_password.png";
import notificationImg from "../../assets/notification_setting.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import { destroyCookie, parseCookies } from "nookies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const Index = () => {
  const router = useRouter();

  const handleLogout = () => {
   
    destroyCookie(null, 'accessToken');
    toast.success("Logout Successfully", {
      
      onClose: () => {
        router.push("/");
      }
    });
  };
  
  return (
    <>
      <section>
        <div className="container mt-3 p-5">
          <div className="row">
            <h4 className="mb-4">My Account</h4>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 pl-0">
              <div className="cards d-flex flex-column  p-4 ">
                <div className="card-top d-flex mb-3">
                  <div className="card-logo">
                    <img src={personalInfoImg.src} alt="" className="w-100 h-100" />
                  </div>
                  <Link href="/personalinfo" className="text-dark mx-4">
                    Personal info
                    <span>
                      <MdOutlineKeyboardArrowRight className="card-arrow" />
                    </span>
                  </Link>
                </div>
                <div className="card-bottom">
                  <h6>Personal details</h6>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="cards d-flex flex-column  p-4 ">
                <div className="card-top d-flex align-items-center mb-3">
                  <div className="card-logo">
                    <img src={passwordImg.src} alt="" className="w-100 h-100" />
                  </div>
                  <Link href="/changepassword" className="text-dark mx-4">
                    Change Password
                    <span>
                      <MdOutlineKeyboardArrowRight className="card-arrow" />
                    </span>
                  </Link>
                </div>
                <div className="card-bottom">
                  <h6>Update your password and secure your account</h6>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 pr-0">
              <div className="cards d-flex flex-column  p-4 ">
                <div className="card-top d-flex mb-3">
                  <div className="card-logo">
                    <img src={notificationImg.src} alt="" className="w-100 h-100" />
                  </div>
                  <Link href="/notification" className="text-dark mx-2">
                    Notification Settings
                    <span>
                      <MdOutlineKeyboardArrowRight className="card-arrow" />
                    </span>
                  </Link>
                </div>
                <div className="card-bottom">
                  <h6>Review payments, payouts, coupons, Gift cards, and taxes</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="logout-container mt-5 d-flex justify-content-between align-items-center w-100 p-2">
              <div>
                <h6 className="ml-3 mb-0" > Log out</h6>
              </div>
              <div>
                <FaArrowCircleRight className="rightarrow" onClick={handleLogout}/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

Index.getLayout = function getLayout(page:any) {
  return <Layout>{page}</Layout>;
};

export default Index;
