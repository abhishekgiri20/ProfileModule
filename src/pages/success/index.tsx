import React from "react";
import checkImage from "../../assets/verfied@3x.png"
import Link from "next/link";
const index = () => {
  return (
    <>
      <section>
        <div className="container   h-100 ">
          <div className="row h-100">
            <div className="col-md-8  m-auto  ">
              <div className="welcome-card w-50 text-center m-auto bg-white p-3 rounded">
                <div className="success-box d-flex align-items-center justify-content-center rounded-circle m-auto " >
                  <img src={checkImage.src} alt="" className="w-100  h-100" />
                </div>
                <p className="mt-2"> Your Number is successfully verified!</p>
                <Link href= "/imageupload" className="btn btn-primary">Continue</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
