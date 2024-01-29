import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import tokenAuth from "../api/tokenAuth";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export const Login = () => {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(dataLogin));
  };

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            required
            autoComplete="email"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            autoComplete="current-password"
            margin="normal"
            onChange={handleChange}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Log in
          </Button>
        </form>
      </div>
      <Grid container>
        <Grid item>
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
