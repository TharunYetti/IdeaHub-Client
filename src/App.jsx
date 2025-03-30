import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Auth from './components/Auth'
import Feed from './components/Feed'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Auth />} />
          <Route path="feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
