import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styling/box.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

var url;
if (process.env.NODE_ENV == "production") {
  url = "https://resumixapi.herokuapp.com"
} else {
  url = "http://localhost:5016"
}

function ProfilePage(props) {
  let history = useHistory();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
    };
    axios
      .get(url + "/profile/getprofile/", config)
      // .get("https://resumixapi.herokuapp.com/profile/getprofile/", config)
      .then((res) => {
        setProfile(res.data[0]);
      })
      .catch((error) => {
        console.log("There's an error: " + error);
      });
  }, [setProfile]);

  async function editProfile() {
    console.log("THIS IS PROPS COOKIES: " + props.cookies.auth_token);
    

    
     
       history.push({
          pathname: '/edit-profile',
          state: { detail: profile}

        });

      
  }


  return (
    <div> 
       <input type="button" value="Edit" onClick={editProfile} />
      <p>Name: {profile.name}</p>
      <p>Year: {profile.year}</p>
      <p>Major: {profile.major}</p>
      <p>Desired Role: {profile.desiredRole}</p>
      <p>Username: {profile.username}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
}

export default ProfilePage;
