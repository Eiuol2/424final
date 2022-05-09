import React from "react"
import "./Home.css"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Button, Grid } from "@mui/material"
import { useHistory } from "react-router-dom"
import WebFont from "webfontloader"

const useStyles = makeStyles({
  customButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    textColor: "#ffffff",
    text: "white",
  },
})

function Home() {
  const classes = useStyles()

  const styleObj = {
    fontSize: 80,
    color: "#6464DE",
    textAlign: "center",
    paddingTop: "100px",
    fontWeight: "bold",
    fontFamily: "Bungee Inline",
  }

  const history = useHistory()

  const routeChangeSignUp = () => {
    let path = "/signup"
    history.push(path)
  }

  const routeChangeSignIn = () => {
    let path = "/signin"
    history.push(path)
  }

  return (
    <div>
      <main>
        <h1 style={styleObj}> Welcome to Resumix! </h1>
        <p
          style={{
            fontFamily: "Raleway",
            color: "white",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          {" "}
          Here at Resumix, we provide a superior technology tool that allows you
          to quickly and easily show off your career focused portfolio.
          <br></br>
          <br></br>
          Please sign up or sign in to get started!
        </p>
        <Grid
          container
          justifyContent="center"
          columnSpacing={3}
          display="flex"
          direction="row"
          alignItems="center"
        >
          <Grid item>
            <Button
              size="large"
              className={classes.customButton}
              onClick={routeChangeSignUp}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              className={classes.customButton}
              onClick={routeChangeSignIn}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Home
