import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./styling/index.css"
import MyApp from "./MyApp"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <BrowserRouter>
    <MyApp />
  </BrowserRouter>,
  document.getElementById("root")
)

serviceWorker.unregister()
