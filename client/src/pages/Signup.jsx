import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import "../assets/css/signup.css";
import couple from "../assets/svg/couple.svg";
import bg from "../assets/svg/bg.svg";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { authenticated } = useAuth();
  const [id, setId] = useState(""); 
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [gender, setGender] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectDepartment, setSelectDepartment] = useState('');
  const [selectCourse, setSelectCourse] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectDepartment === 'CITE') {
      setAvailableCourses(['BSIT']);
    } else if (selectDepartment === 'CEA') {
      setAvailableCourses(['BSCPE', 'BSCE', 'BSEE']);
    } else {
      setAvailableCourses([]);
    }
  }, [selectDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      department: selectDepartment,
      course: selectCourse,
      password:password,
      gender: gender,
    };

    try {
      await axios.post("http://localhost:5000/api/users/register", userData);
      alert("You have created an account!")
      navigate("/stage/login");
    } catch (error) {
      alert("Registration error");
    }
  };

  return (
    <>
    {authenticated ? 
      <Navigate to="/user/home"/> :
      <div className="signup_main grid">
        <img src={bg} alt="bg" className="signup_bg" />
        <div className="container grid">
          <div className="signup_color"></div>
          <div className="heading_signup flex">
            <div>
              <h1>Create Account</h1>
              <h3>Find the match that fits you</h3>
            </div>
            <img src={couple} alt="couple" />
          </div>
          <form className="form_signup flex" onSubmit={handleSubmit}>
            <h2>SIGN UP</h2>
            <div className="inputs flex">
            <label>
                <input
                  type="number"
                  name="id"
                  placeholder="Student Number"
                  required
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </label>
            <label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
              <label>
                <select
                  name="gender"
                  required
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
              <label className="user">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label>
                <select
                  value={selectDepartment}
                  onChange={e => setSelectDepartment(e.target.value)}
                >
                <option value=''>Filter by Department</option>
                <option value='CITE'>CITE</option>
                <option value='CEA'>CEA</option>
                </select>
              </label>
              <label>
                <select
                  value={selectCourse}
                  onChange={e => setSelectCourse(e.target.value)}
                >
                  <option value=''>Filter by Course</option>
                  {availableCourses.map(course => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
              </select>
              </label>
              <label className="pass">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$"
                  title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, %, ^, &, *, or !)"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <label className="confirm pass">
                <input
                  id="confirmpassword"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </label>
              
              <p className="signup__terms">
                By signing you agree to our <span>Terms and Conditions</span>
              </p>
              <button type="submit">Sign Up</button>
              <div className="signup flex">
                <h5>Already a member?</h5>
                <Link to="/stage/login" className="signup-txt">
                  <h5>Sign In</h5>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>}
    </>
  );
};

export default Signup;
