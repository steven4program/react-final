import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './assets/index.scss'
import Main from './layouts/main.jsx'
import Todos from './pages/Todos.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="todos" element={<Todos />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App