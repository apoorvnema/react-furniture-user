import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import theme from "./assets/theme"
import { Box, Button, ThemeProvider } from "@mui/material"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import { authAction } from './store/auth'
import Signup from './pages/Signup'

function App() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    dispatch(authAction.logout());
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
