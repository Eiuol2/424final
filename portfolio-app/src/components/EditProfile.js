import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styling/box.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

  function EditProfile(props) {
    console.log("THIS IS PROPS: " + JSON.stringify(props));
    let history = useHistory();




    const [profile, setProfile] = useState({
      name: "",
      year: "",
      major: "",
      desiredRole: "",
      bio: "",
      username: "",
    });

    const [newProfile, setnewProfile] = useState({
        name: "",
        year: "",
        major: "",
        desireRole: "",
        bio: "",
        username: "",
    });

    var url;
    if (process.env.NODE_ENV == "production") {
      url = "https://resumixapi.herokuapp.com"
    } else {
      url = "http://localhost:5016"
    }
  
      const location = useLocation();
      


    useEffect(() => {
      console.log(location.pathname);
      console.log(location.state.detail);


      const config = {
        headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
      };
      axios
      .get(url + "/profile/getprofile/", config)
      // .get("https://resumixapi.herokuapp.com/profile/getprofile/", config)
      .then((res) => {
        console.log("THIS IS PROFILE: " + JSON.stringify(res.data[0]));
        setProfile(res.data[0]);
      })
        .catch((error) => {
          console.log(error);
        });
    }, [setProfile]);

    //console.log("THIS IS POSTS:" + JSON.stringify(posts.title));
   // console.log("THIS IS POSTS:" + JSON.stringify(postObject));
  
    function submitForm() {
      const posting = {
        _id: profile._id,
        name: profile.name,
        year: profile.year,
        major: profile.major,
        desiredRole: profile.desiredRole,
        bio: profile.bio,
        username: profile.username
      };
      const config = {
        headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
      };
      console.log(
        "This is authorization before passing in: " + config.headers.Authorization
      );
      axios
        .post(url + "/profile/update-profile", posting, config)
        // .post("https://resumixapi.herokuapp.com/posts/create-post", posting, config)
        .then((res) => console.log(res.data));

        history.push("/");


    }
  

    return (
      <form>
        <label htmlFor="title">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={profile.name}
          onChange={(event) =>
            setProfile({ ...profile, name: event.target.value })
          }
        />
        <label htmlFor="description">Year</label>
        <input
          type="text"
          name="year"
          id="year"
          value={profile.year}
          onChange={(event) =>
            setProfile({ ...profile, year: event.target.value })
          }
        />
        <label htmlFor="content">Major</label>
        <input
          type="text"
          name="major"
          id="major"
          value={profile.major}
          onChange={(event) =>
            setProfile({ ...profile, major: event.target.value })
          }
        />
        <label htmlFor="description">Desired Role</label>
        <input
          type="text"
          name="desiredRole"
          id="desiredRole"
          value={profile.desiredRole}
          onChange={(event) =>
            setProfile({ ...profile, desiredRole: event.target.value })
          }
        />
        <label htmlFor="description">Bio</label>
        <input
          type="text"
          name="bio"
          id="bio"
          value={profile.bio}
          onChange={(event) =>
            setProfile({ ...profile, bio: event.target.value })
          }
        />

        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    );
  }
  


export default EditProfile;

  
