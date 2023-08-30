import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import "./assets/index.scss"
import Navbar from "./layouts/Navbar"
import Todos from "./pages/Todos"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ErrorPage from "./pages/ErrorPage"

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="" element={<Todos />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" errorElement={<ErrorPage/>} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App