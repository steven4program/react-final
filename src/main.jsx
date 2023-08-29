import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElement, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElement(
    <>
      <Route path="/" element={<Todos />} />
      <Route path="/about" component={<Login />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
