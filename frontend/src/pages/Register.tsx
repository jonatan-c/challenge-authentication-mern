import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import  { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {  register } from "../store/authentication/authenticationSlice";
import { useAppDispatch } from "../hooks/redux";
import tokenAuth from "../api/tokenAuth";

const Register = () => {
  const dispatch = useAppDispatch();

  const [dataRegister, setDataRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(dataRegister);
    dispatch(register(dataRegister));
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
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          {/* <Avatar></Avatar> */}
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              type="text"
              required
              margin="normal"
              onChange={handleChange}
            />
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
              Register
            </Button>
          </form>
        </div>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
