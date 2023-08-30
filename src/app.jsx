import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import "./assets/index.scss"
import Navbar from "./layouts/Navbar"
import Todos from "./pages/Todos"
import Login from "./pages/Login"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/" element={<Todos />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App