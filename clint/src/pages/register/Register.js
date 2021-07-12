import React, { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";
import axios from "axios";
const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        // passwordAgain : passwordAgain.current.value,
      };
      try {
        axios.post("http://localhost:4000/api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">SocialMedia</h3>
          <span className="registerDesc">
            Connect with Friends and the world around you on SocialMedia
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              ref={username}
            />
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              ref={password}
            />
            <input
              type="password"
              placeholder="Password Again"
              className="registerInput"
              ref={passwordAgain}
              required
            />
            <button className="registerButton" type="submit">
              Sing Up
            </button>

            <button className="registerRegisterButton">
              Login into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
