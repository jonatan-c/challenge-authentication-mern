import { Provider } from "react-redux";
import "./App.css";
import { Login } from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";
import tokenAuth from "./api/tokenAuth";
import { useEffect } from "react";
import Home from "./pages/Home";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useAppDispatch } from "./hooks/redux";
import { checkAuth } from "./store/authentication/authenticationSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <Container>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Box style={{ padding: "150px 0 0 0" }}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </Provider>
      </Container>
    </>
  );
}

export default App;
