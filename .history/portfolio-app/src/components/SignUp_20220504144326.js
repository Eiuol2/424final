import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import SignupForm from "./SignupForm";

function SignUp() {
  const [cookies, setCookie] = useCookies(["auth_token"]);

  function setToken(token) {
    setCookie("auth_token", token, { maxAge: 1800, path: "/" });
  }

  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) {
  //       console.log("successfully fetched users!");
  //     } else {
  //       console.log("error couldnt fetch user list.");
  //     }
  //   });
  // }, [cookies]);

  // async function fetchAll() {
  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${cookies.auth_token}` },
  //     };
  //     const response = await axios.get("http://localhost:5016/users/", config);
  //     console.log(response);
  //     return response.data.users;
  //   } catch (error) {
  //     // We're not handling errors. Just logging into the console.
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async function makePostCall(person) {
  //   try {
  //     const response = await axios.post("http://localhost:5016/users/", person);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async function makeDeleteCall(id) {
  //   try {
  //     const response = await axios.delete("http://localhost:5016/users/" + id);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  return (
    <div>
      <p>React Sign up page!</p>
      <SignupForm setToken={setToken} />
    </div>
  );
}

export default SignUp;
