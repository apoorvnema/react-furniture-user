import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import theme from "./assets/theme"
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home"
import Signup from './pages/Signup'
import ProductDetail from './pages/ProductDetail'
import Orders from "./pages/Orders";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
