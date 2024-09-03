import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import loginapi from '../loginapi';
import { parseCookies } from 'nookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { GoEyeClosed } from "react-icons/go";
import { IoEyeSharp } from "react-icons/io5";
const index = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);





  const toggleOldPasswordVisibility = () => {
    setOldPasswordShown((prev) => !prev);
  };


  const toggleNewPasswordVisibility = () => {
    setNewPasswordShown((prev) => !prev);
  };


//handle change password
  const handleChangePassword = async (e: any) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!oldPassword || !newPassword) {
      return toast.error('Please fill all the fields!');
    }

    if (oldPassword === newPassword) {
      return toast.error('New password cannot be the same as the old password!');
    }

    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(
        'Password should be 8 characters or longer and include an uppercase letter, a number, and a special character.'
      );
      return ""
    }

    try {
      setNewPasswordError(''); 
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        throw new Error('Access token not found in cookies');
      }

      const response = await loginapi.changePassword(
        { old_password: oldPassword, new_password: newPassword },
        token
      );
      !response ? toast.error(`Please enter current correct password`): toast.success(`${response.message}`);
       console.log("Password change response.........", response);
       setOldPassword("");
       setNewPassword("");  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <section>
          <div className="container p-5">
            <div className="row">
              <div className="password-heading d-flex align-items-center  ">
                <Link href="/myaccount" className="text-decoration-none">
                  <h6 className="mb-0 text-secondary">My Account</h6>
                </Link>
                <MdOutlineKeyboardArrowRight className="card-arrow" />
                <h6 className="mb-0">Change Password</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 p-0 mt-5">
                <h3>Change Password</h3>
                <div className="password-container  rounded mt-4 p-3">
                  <form onSubmit={handleChangePassword}>
                    <div className="input-container d-flex flex-column ">
                      <label htmlFor="old_password">Old Password</label>
                      <div className='d-flex justify-content-between border rounded-2 align-items-center w-100 px-3 py-2 '>
                      <input
                        type={oldPasswordShown ? "text" : "password"}
                        placeholder="Enter old password"
                        className=" border-0 w-100"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                       <span>
                        {oldPasswordShown ? (
                          <IoEyeSharp onClick={toggleOldPasswordVisibility} />
                        ) : (
                          <GoEyeClosed onClick={toggleOldPasswordVisibility} />
                        )}
                      </span>
                      </div>
                 
                    </div>
                    
                    <div className="input-container d-flex flex-column ">
                      <label htmlFor="old_password">New Password</label>
                      <div className='d-flex justify-content-between border rounded-2 align-items-center w-100 px-3 py-2 '>
                      <input
                        type={newPasswordShown ? "text" : "password"}
                        placeholder="Enter old password"
                        className=" border-0 w-100"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                       <span>
                        {newPasswordShown ? (
                          <IoEyeSharp onClick={toggleNewPasswordVisibility} />
                        ) : (
                          <GoEyeClosed onClick={toggleNewPasswordVisibility} />
                        )}
                      </span>
                      </div>
                      {newPasswordError && (
                        <p className="text-danger mt-1">{newPasswordError}</p>
                      )}
                    </div>
                    <button type="submit" className="btn btn-danger mt-2">
                      Update Password
                    </button>
                  </form>
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
