import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

const theme = createTheme()

var url;
if (process.env.NODE_ENV == "production") {
  url = "https://resumixapi.herokuapp.com"
} else {
  url = "http://localhost:5016"
}

function LoginForm(props) {
  const [user, setUser] = useState({
    username: "",
    pwd: "",
  })
  const history = useHistory()

  const [message, setMsg] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setUser({
      username: data.get("username"),
      pwd: data.get("pwd"),
    })
    console.log("username is: " + JSON.stringify(user.username))

    console.log(JSON.stringify(user))

    makeLoginCall(user).then((response) => {
      if (response && response.status === 200) {
        const token = response.data
        setUser({ username: "", pwd: "" })
        setMsg("")
        props.setToken(token)
        //once logged in, go to home or the posts list
        history.push("/")
      } else {
        setMsg("Invalid login credentials!")
      }
    })
  }

  async function makeLoginCall(user) {
    try {
      const loginObject = { username: user.username, pwd: user.pwd }
      console.log("login object:" + JSON.stringify(loginObject))
      const response = await axios.post(
        // "https://resumixapi.herokuapp.com/users/login",
        url + "/users/login",
        loginObject
      )
      props.setToken(response.data)
      console.log("This is the login response token: " + response.data)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://media.istockphoto.com/vectors/welcome-back-banner-vector-id1248774227?k=20&m=1248774227&s=612x612&w=0&h=jXlJHT7q_jQEYSwjCM97eK3JRyRGIb5DfktWl0doSUQ=)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="pwd"
                label="Password"
                type="password"
                id="pwd"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default LoginForm

// import React, { useState } from "react"
// import axios from "axios"
// import { useHistory } from "react-router-dom"

// var url
// if (process.env.NODE_ENV == "production") {
//   url = "https://resumixapi.herokuapp.com"
// } else {
//   url = "http://localhost:5016"
// }

// function LoginForm(props) {
//   const [user, setUser] = useState({
//     username: "",
//     pwd: "",
//   })

//   const history = useHistory()

//   const [message, setMsg] = useState("")

//   function submitForm() {
//     makeLoginCall(user).then((response) => {
//       if (response && response.status === 200) {
//         const token = response.data
//         setUser({ username: "", pwd: "" })
//         setMsg("")
//         props.setToken(token)
//         //once logged in, go to home or the posts list
//         history.push("/")
//       } else {
//         setMsg("Invalid login credentials!")
//       }
//     })
//   }

//   async function makeLoginCall(user) {
//     try {
//       const loginObject = { username: user.username, pwd: user.pwd }
//       const response = await axios.post(
//         // "https://resumixapi.herokuapp.com/users/login",
//         url + "/users/login",
//         loginObject
//       )
//       props.setToken(response.data)
//       console.log("This is the login response token: " + response.data)
//       return response
//     } catch (error) {
//       console.log(error)
//       return false
//     }
//   }

//   return (
//     <form>
//       <label htmlFor="name">Username</label>
//       <input
//         type="text"
//         name="username"
//         id="username"
//         value={user.username}
//         onChange={(event) => setUser({ ...user, username: event.target.value })}
//       />
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         name="pwd"
//         id="pwd"
//         value={user.pwd}
//         onChange={(event) => setUser({ ...user, pwd: event.target.value })}
//       />
//       <input type="button" value="Submit" onClick={submitForm} />
//       <i> {message} </i>
//     </form>
//   )
// }

// export default LoginForm
