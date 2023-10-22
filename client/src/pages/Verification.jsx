import { Link } from "react-router-dom";
import React from "react";
import "../assets/css/verification.css";
import verify from "../assets/svg/person-verify.svg";
import bg from "../assets/svg/bg.svg";

const Verification = () => {
  return (
    <div className="verification_main grid">
      <img src={bg} alt="bg" className="verify_bg" />
      <div className="container grid">
        <div className="verify_color"></div>
        <div className="heading_verify flex">
          <img src={verify} alt="verify" />
          <div>
            <h1>Get Verified!</h1>
            <h3>
              We have send a one time verification code on your phinma email.
            </h3>
          </div>
        </div>
        <form className="form_verify flex">
          <h2>Enter 4-digit code</h2>
          <div className="inputs flex">
            <div className="box flex">
              <input placeholder="1" />
              <input placeholder="2" />
              <input placeholder="3" />
              <input placeholder="4" />
            </div>
            <Link to="/stage/studentprofile">
              <button value="submit">Verify Code</button>
            </Link>
            <div className="verify flex">
              <h5>Didn’t recieved the code?</h5>
              <Link to="/stage/verify" className="verify-txt">
                <h5>Resend Code</h5>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
