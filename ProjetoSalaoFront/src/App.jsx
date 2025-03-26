import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../src/pages/Home/Home"

function App() {

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter> */}
      <Home />
    </>
  )
}

export default App
