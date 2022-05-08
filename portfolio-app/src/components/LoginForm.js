import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LoginForm(props) {
  const [user, setUser] = useState({
    username: "",
    pwd: "",
  });

  const history = useHistory();

  const [message, setMsg] = useState("");

  function submitForm() {
    makeLoginCall(user).then((response) => {
      if (response && response.status === 200) {
        const token = response.data;
        setUser({ username: "", pwd: "" });
        setMsg("");
        props.setToken(token);
        //once logged in, go to home or the posts list
        history.push("/");
      } else {
        setMsg("Invalid login credentials!");
      }
    });
  }

  async function makeLoginCall(user) {
    try {
      const loginObject = { username: user.username, pwd: user.pwd };
      const response = await axios.post(
        "https://resumixapi.herokuapp.com/users/login",
        loginObject
      );
      props.setToken(response.data);
      console.log("This is the login response token: " + response.data);
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

export default LoginForm;
