import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import axios from "axios"
import useAuthStore from "./store/useAuthStore"
import Profile from './pages/user/Profile'
import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"
import CreatePosts from "./pages/create/CreatePosts"
import PostDetail from "./pages/posts/PostDetail"
import EditPost from "./pages/posts/EditPost"
import Main from "./pages/messenger/Main"

const App = () => {
  axios.defaults.baseURL = "http://localhost:5000"
  axios.defaults.withCredentials = true
  const { authUser } = useAuthStore()
  return (

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/:id" element={authUser ? <Profile /> : <Navigate to={'/login'} />} />
        <Route path="/create" element={authUser ? <CreatePosts /> : <Navigate to={'/login'} />} />
        <Route path="/post/:postID" element={authUser ? <PostDetail /> : <Navigate to={'/login'} />} />
        <Route path="/edit/:postID" element={authUser ? <EditPost /> : <Navigate to={'/login'} />} />
        <Route path="/messenger" element={authUser ? <Main /> : <Navigate to={'/login'} />} />
      </Route>


      <Route path="/" element={<AuthLayout />}>
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={'/'} />} />
      </Route>


    </Routes>

  )
}
export default App