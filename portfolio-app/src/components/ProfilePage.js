import axios from "axios"
import { useEffect, useState } from "react"
import Particle from "../Particle"
import { Container, Row, Col } from "react-bootstrap"
import { makeStyles } from "@material-ui/core"
import "../style.css"

// var url;
// if (process.env.NODE_ENV == "production") {
//   url = "https://resumixapi.herokuapp.com"
// } else {
//   url = "http://localhost:5016"
// }
// const useStyles = makeStyles({
//   homeSection: {
//     position: "relative",
//     zIndex: -1,
//     backgroundImage: `url(${"../assets/profilepage-bg.jpg"})`,
//     backgroundPosition: "top",

// position: relative;
// z-index: -1;
// background-image: var(--image-gradient), url(./assets/profilepage-bg.jpg);
// background-position: top center;
// background-repeat: no-repeat;
// padding-bottom: 30px !important;
// padding-top: 30px !important;
//   },
// })

function ProfilePage(props) {
  //const classes = useStyles()
  const [profile, setProfile] = useState([])
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
    }
    axios
      .get("http://localhost:5016/profile/getprofile/", config)
      .then((res) => {
        setProfile(res.data[0])
      })
      .catch((error) => {
        console.log("There's an error: " + error)
      })
  }, [setProfile])

  return (
    <section>
      <Container className="" fluid>
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>{" "}
              <h1 className="heading-name">
                My name is
                <strong className="main-name"> {profile.name} </strong>
              </h1>
            </Col>
            <Col md={5} style={{ paddingBottom: 20 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path
                  d="M128,32A96.00088,96.00088,0,0,0,63.79883,199.375v-.001A71.99731,71.99731,0,0,1,128,160a40,40,0,1,1,40-40,40.0001,40.0001,0,0,1-40,40,71.99731,71.99731,0,0,1,64.20117,39.374A96.0002,96.0002,0,0,0,128,32Z"
                  opacity=".2"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="96"
                  fill="none"
                  stroke="#000"
                  stroke-miterlimit="10"
                  stroke-width="16"
                />
                <circle
                  cx="128"
                  cy="120"
                  r="40"
                  fill="none"
                  stroke="#000"
                  stroke-miterlimit="10"
                  stroke-width="16"
                />
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                  d="M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026"
                />
              </svg>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row>
          <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
            More about me...
          </h1>
          <Col>
            <h1 className="heading-name">
              <h1 style={{ textDecorationLine: "underline" }}>YEAR</h1>{" "}
              <div></div>
              <strong className="main-name"> {profile.year} </strong>
            </h1>

            <h1 className="heading-name">
              <h1 style={{ textDecorationLine: "underline" }}>MAJOR</h1>{" "}
              <div></div>
              <strong className="main-name"> {profile.major} </strong>
            </h1>
            <h1 className="heading-name">
              <h1 style={{ textDecorationLine: "underline" }}>DESIRED ROLE</h1>{" "}
              <div></div>
              <strong className="main-name"> {profile.desiredRole} </strong>
            </h1>
          </Col>

          <Col>
            <h1 className="heading-name">
              <h1 style={{ textDecorationLine: "underline" }}>BIO</h1>
              <div></div>
              <strong className="main-name"> {profile.bio} </strong>
            </h1>
          </Col>
        </Row>
      </Container>
      {/* <p>Name: {profile.name}</p>
      
      <p>Username: {profile.username}</p>
      <p>Bio: {profile.bio}</p> */}
    </section>
  )
}

export default ProfilePage
