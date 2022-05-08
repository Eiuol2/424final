import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignupForm(props) {
  const [user, setUser] = useState({
    username: "",
    pwd: "",
  });

  const history = useHistory();

  const [message, setMsg] = useState("");

  function submitForm() {
    makeSignupCall(user).then((response) => {
      console.log("this is response: " + response.status);
      if (response && response.status === 201) {
        const token = response.data;
        setUser({ username: "", pwd: "" });
        setMsg("");
        props.setToken(token);
        // once sign up, then go to home page
        history.push("/createprofile");
        console.log("THis is after creating profile");
      } else {
        console.log(response);
        setMsg("Invalid signup credentials, username already taken!");
      }
    });
  }

  async function makeSignupCall(user) {
    try {
      const signupObject = {
        username: user.username,
        pwd: user.pwd,
      };
      const response = await axios.post(
        "https://resumixapi.herokuapp.com/users/signup",
        signupObject
      );
      props.setToken(response.data);
      console.log("This is backend response: " + response.data);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <form>
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(event) => setUser({ ...user, username: event.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="pwd"
        id="pwd"
        value={user.pwd}
        onChange={(event) => setUser({ ...user, pwd: event.target.value })}
      />
      <input type="button" value="Submit" onClick={submitForm} />
      <i> {message} </i>
    </form>
  );
}

export default SignupForm;
