import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitSignup = async (event) => {
    event.preventDefault();
    const res = await Axios.post(
      "http://localhost:3001/users/signup",
      { username, firstname, lastname, email, password },
      { crossdomain: true }
    );

    if (res.status < 300) {
      navigate("/");
    }
  };

  const formElement = (fieldName, fieldLabel, handleChangeFunction) => {
    return (
      <div>
        <label
          htmlFor={fieldName}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {fieldLabel}
        </label>
        <div className="mt-2">
          <input
            id={fieldName}
            name={fieldName}
            required
            type={fieldName === "password" ? "password" : "text"}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            onChange={handleChangeFunction}
          />
        </div>
      </div>
    );
  };

  const fields = [
    {
      fieldName: "username",
      fieldLabel: "Username",
      handleChangeFunction: handleUsernameChange,
    },
    {
      fieldName: "firstname",
      fieldLabel: "Firstname",
      handleChangeFunction: handleFirstnameChange,
    },
    {
      fieldName: "lastname",
      fieldLabel: "Lastname",
      handleChangeFunction: handleLastnameChange,
    },
    {
      fieldName: "email",
      fieldLabel: "Email",
      handleChangeFunction: handleEmailChange,
    },
    {
      fieldName: "password",
      fieldLabel: "Password",
      handleChangeFunction: handlePasswordChange,
    },
  ];

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt="Sociobook"
          style={{ height: 150, width: 200 }}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-4"
          action="#"
          method="POST"
          onSubmit={submitSignup}
        >
          {fields.map((field) =>
            formElement(
              field.fieldName,
              field.fieldLabel,
              field.handleChangeFunction
            )
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="flex w-full justify-center block text-sm font-medium leading-10 text-gray-900 pt-5">
          Click{" "}
          <Link to="/" className="px-1">
            here{" "}
          </Link>{" "}
          to login to existing account
        </div>
      </div>
    </div>
  );
};

export default Signup;
