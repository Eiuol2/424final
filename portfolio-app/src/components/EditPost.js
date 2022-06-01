import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styling/box.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

  function EditPost(props) {
    console.log("THIS IS PROPS: " + JSON.stringify(props));
    let history = useHistory();


    const [posts, setPost] = useState({
      title: "",
      description: "",
      content: "",
    });

    const [newposts, setnewPost] = useState({
      title: "",
      description: "",
      content: "",
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
         .get("http://localhost:5016/posts/edit-post/" + location.state.detail, config)
        .then((res) => {


      //    console.log("THIS IS POSTS:" + JSON.stringify(res.data));


          setPost(res.data);

  //        axios.delete(
    //        "http://localhost:5016/posts/delete-post/" + location.state.detail,
      //      config
        //  );
        })
        .catch((error) => {
          console.log(error);
        });
    });

    //console.log("THIS IS POSTS:" + JSON.stringify(posts.title));
   // console.log("THIS IS POSTS:" + JSON.stringify(postObject));
  
    function submitForm() {
      const posting = {
        title: posts.title,
        description: posts.description,
        content: posts.content,
      };
      const config = {
        headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
      };
      console.log(
        "This is authorization before passing in: " + config.headers.Authorization
      );
      axios
        .post(url + "/posts/create-post", posting, config)
        // .post("https://resumixapi.herokuapp.com/posts/create-post", posting, config)
        .then((res) => console.log(res.data));
      setPost({ title: "", description: "", content: "" });



    }
  

    return (
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={posts.title}
          onChange={(event) =>
            setPost({ ...posts, title: event.target.value })
          }
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={newposts.description}
          onChange={(event) =>
            setPost({ ...posts, description: event.target.value })
          }
        />
        <br />
        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          id="content"
          value={newposts.content}
          onChange={(event) =>
            setPost({ ...posts, content: event.target.value })
          }
        />
        <br />
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    );
  }
  


export default EditPost;

  
