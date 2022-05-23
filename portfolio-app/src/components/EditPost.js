import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styling/box.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

  function EditPost(props) {
    console.log("THIS IS PROPS: " + JSON.stringify(props));
    let history = useHistory();
    const [posts, setPost] = useState([]);
  
      const location = useLocation();
      


    useEffect(() => {
      console.log(location.pathname);
      console.log(location.state.detail);


      const config = {
        headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
      };
      axios
         .get("http://localhost:5016/posts/edit-post/" + location.state.detail, config)
        .then((res) => {
          setPost(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

  

  const renderCard = (res, index) => {
    return (
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Img variant="top" src="holder.js/100px180" src={res.content} />
        <Card.Body>
          <Card.Title>{res.title}</Card.Title>
          <Card.Text>{res.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  };



  return (
    <>
      <div className="grid">{posts.map(renderCard)}</div>
    </>
  );



}

export default EditPost;

  
