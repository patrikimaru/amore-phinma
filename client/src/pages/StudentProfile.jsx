import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/css/studentprofile.css";
import profile from "../assets/svg/student.svg";
import "react-multi-date-picker/styles/colors/red.css";
import { genderData, deptData, courseData, majorData } from "../layout/Data";
import Selected from "../assets/component/Selected";

const StudentProfile = () => {
  const handleChange = (e) => {
    console.log("e", e);
    const value = e.target.value;
    const name = e.target.name;
    console.log("value " + value, "name " + name);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    image: "",
    student_id: "",
    student_bday: "",
    student_gender: "",
    student_dept: "",
    student_course: "",
    student_major: "",
  });
  const handleSubmit = () => {
    console.log("submitted");
  };
  const handleDropdownChange = (name) => (selectedOption) => {
    console.log("Name: ", name);
    console.log("Label: ", selectedOption.label);

    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.label,
    }));
  };
  const handleDateChange = (name, date) => {
    let formattedDate = "";

    if (date instanceof Date) {
      formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date
        .getFullYear()
        .toString()
        .substr(-2)}`;
    }

    console.log("Name: ", name);
    console.log("Value: ", formattedDate);

    setFormData((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  console.log(formData);

  return (
    <div className="student flex">
      <div className="student_color"></div>
      <div className="student_intro flex">
        <h1>Student Profile</h1>
        <h3>
          You can choose to keep your data a secret on the profile settings
        </h3>
        <img src={profile} alt="profile" />
      </div>
      <div className="student_container flex">
        <form className="student_form" onSubmit={handleSubmit}>
          <h3>Student Data</h3>
          <div className="student_divform flex">
            <div className="student_detail flex">
              <label className="student_name" htmlFor="name">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required={true}
                  placeholder="Lastname, Firstname M.I."
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label className="student_id" htmlFor="student_id">
                <input
                  id="student_id"
                  type="text"
                  name="student_id"
                  required={true}
                  placeholder="I.D. Number"
                  value={formData.student_id}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col1 flex">
              <label className="student_bday" htmlFor="student_bday">
                <DatePicker
                  id="student_bday"
                  name="student_bday"
                  selected={formData.student_bday}
                  onChange={(date) => handleDateChange("student_bday", date)}
                  className="red"
                />
              </label>
              <label className="student_gender" htmlFor="student_gender">
                <Selected
                  id="student_gender"
                  name="student_gender"
                  options={genderData.map(({ value, label }) => ({
                    value: value,
                    label: label,
                  }))}
                  search={false}
                  label="Select Gender"
                  onChange={handleDropdownChange("student_gender")}
                />
              </label>
            </div>
            <label className="student_dept" htmlFor="student_dept">
              <Selected
                id="student_dept"
                name="student_dept"
                options={deptData.map(({ value, label }) => ({
                  value: value,
                  label: label,
                }))}
                width="42rem"
                menu="42rem"
                option="41.9687rem"
                search={false}
                label="Department"
                onChange={handleDropdownChange("student_dept")}
              />
            </label>
            <label className="student_course" htmlFor="student_course">
              <Selected
                id="student_course"
                name="student_course"
                options={courseData.map(({ value, label }) => ({
                  value: value,
                  label: label,
                }))}
                width="42rem"
                menu="42rem"
                option="41.9687rem"
                search={false}
                label="Course"
                onChange={handleDropdownChange("student_course")}
              />
            </label>
            <label className="student_major" htmlFor="student_major">
              <Selected
                id="student_major"
                name="student_major"
                options={majorData.map(({ value, label }) => ({
                  value: value,
                  label: label,
                }))}
                width="42rem"
                menu="42rem"
                option="41.9687rem"
                search={false}
                label="Major"
                onChange={handleDropdownChange("student_major")}
              />
            </label>
          </div>
          <Link to="/stage/interest">
            <button
              id="submit"
              type="submit"
              value="submit"
              className="student_submit"
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
