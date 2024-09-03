import logo from "../assets/logo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";
const Index = () => {

  // useEffect(() =>{
  //      window.gapi.load('auth2', () => {
  //       window.gapi.auth2.init({
  //         client_id: '350025725033-fo35d6p242gkimgub0flkhurquu89c0m.apps.googleusercontent.com',
  //         scope: "email",

  //       });
  //     });
  //   }, []);

    const handleGoogleSignIn = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      console.log(auth2 , 'aurthsdfsd');
      debugger  
      auth2.signIn().then((googleUser: { getBasicProfile: () => any; }) => {
        const profile = googleUser.getBasicProfile();
        console.log(profile);

        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      });
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
                <div className="welcome-text">
                  <h3 className="mb-3">Welcome to App</h3>
                </div>
                <div className="btn-links d-flex flex-column">
                  <button className="btn btn-danger mb-2 border-0 d-flex ">
                    <FaPhoneAlt />
                    <Link href = "/signup" className="text-decoration-none"><span className="w-100 text-white">Continue with phone</span></Link>
                  </button>
                  <button className="btn btn-secondary mb-2 border-0 d-flex"  onClick={handleGoogleSignIn}>
                    <FaGoogle />
                    <span className="w-100" >Continue with Google</span>

                  </button>
                  <button className="btn btn-primary  mb-4 border-0 d-flex">
                    <FaFacebookF />
                    <span className="w-100">Continue with Facebook</span>
                  </button>
                </div>
                <div className="refer-link d-flex justify-content-center ">
                  <p className=" px-1">You have already account?</p>
                  <Link href="/signin" className="m-0 text-danger">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Index;
