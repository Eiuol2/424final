import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateProfile(props) {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    year: "",
    major: "",
    desiredRole: "",
    bio: "",
    username: "",
  });

  function submitForm() {
    makeProfileCall(user).then((response) => {
      console.log("this is response: " + response.status);
      if (response && response.status === 201) {
        setUser({
          name: "",
          year: "",
          major: "",
          desiredRole: "",
          bio: "",
          username: "",
        });
        // once sign up, then go to home page
        history.push("/");
      } else {
        console.log(response);
      }
    });
  }

  async function makeProfileCall(user) {
    try {
      const profileObject = {
        name: user.name,
        year: user.year,
        major: user.major,
        desiredRole: user.desiredRole,
        bio: user.bio,
        username: user.username,
      };
      const response = await axios.post(
        "https://resumixapi.herokuapp.com/profile/createprofile",
        profileObject
      );
      console.log("This is backend response: " + JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const myComponentStyle = {
    display: "flex",
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    textDecorationLine: "underline",
    padding: 15,
  };

  return (
    <form>
      <p style={myComponentStyle}>
        Please don't exit this page without filling out the form otherwise your
        account will be corrupted!
      </p>
      <br />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(event) => setUser({ ...user, username: event.target.value })}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={user.name}
        onChange={(event) => setUser({ ...user, name: event.target.value })}
      />
      <label htmlFor="year">Year</label>
      <input
        type="text"
        name="year"
        id="year"
        value={user.year}
        onChange={(event) => setUser({ ...user, year: event.target.value })}
      />
      <label htmlFor="major">Major</label>
      <input
        type="text"
        name="major"
        id="major"
        value={user.major}
        onChange={(event) => setUser({ ...user, major: event.target.value })}
      />
      <label htmlFor="desiredRole">Desired Role</label>
      <input
        type="text"
        name="desiredRole"
        id="desiredRole"
        value={user.desiredRole}
        onChange={(event) =>
          setUser({ ...user, desiredRole: event.target.value })
        }
      />
      <label htmlFor="bio">Bio</label>
      <input
        type="text"
        name="bio"
        id="bio"
        value={user.bio}
        onChange={(event) => setUser({ ...user, bio: event.target.value })}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default CreateProfile;
