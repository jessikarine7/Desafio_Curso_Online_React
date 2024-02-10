import React from "react"
import App from "./App"
import Form from "./Form/Form"
import Home from "./Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes