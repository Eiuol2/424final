import React, { useEffect } from "react";
import LoginForm from "./LoginForm";

function SignIn(props) {
  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) {
  //       console.log("successfully fetched users!")
  //     }
  //   })
  // }, [])

  // async function fetchAll() {
  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${cookies.auth_token}` },
  //     }
  //     const response = await axios.get("http://localhost:5016/users", config)
  //     console.log(response)
  //     return response.data.users
  //   } catch (error) {
  //     // We're not handling errors. Just logging into the console.
  //     console.log(error)
  //     return false
  //   }
  // }

  return (
    <div>
      <p>React Sign in page!</p>
      <LoginForm setToken={props.setToken} />
    </div>
  );
}

export default SignIn;
