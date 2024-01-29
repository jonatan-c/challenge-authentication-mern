import { useEffect } from "react";

import { AppBar, Box, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/authentication/authenticationSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);

  const logoutF = () => {
    dispatch(logout());
  };

  return (
    <>
      <Container>
        <AppBar color="default" position="fixed">
          <Box
            height={"64px"}
            display="flex"
            flexDirection="row"
            alignItems="center"
            style={{ backgroundColor: "white" }}
            paddingLeft={3}
          >
            <Typography variant="h6" paddingLeft={2}>
              MERN Authentication
            </Typography>

            <Box flexGrow={1} />
            <Button
              component={Link}
              to="/home"
              style={{
                color: "white",
                backgroundColor: "red",
                marginLeft: "auto",
                marginRight: "25px",
              }}
            >
              Home
            </Button>
            {!isAuth && (
              <Button
                component={Link}
                to="/register"
                style={{
                  color: "white",
                  backgroundColor: "red",
                  marginLeft: "auto",
                  marginRight: "25px",
                }}
              >
                Register
              </Button>
            )}
            {isAuth && (
              <Button
                component={Link}
                to="/profile"
                style={{
                  color: "white",
                  backgroundColor: "red",
                  marginLeft: "auto",
                  marginRight: "25px",
                }}
              >
                Profile
              </Button>
            )}
            {isAuth ? (
              <Button
                onClick={logoutF}
                style={{
                  color: "white",
                  backgroundColor: "red",
                  marginLeft: "auto",
                  marginRight: "25px",
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                style={{
                  color: "white",
                  backgroundColor: "red",
                  marginLeft: "auto",
                  marginRight: "25px",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </AppBar>
      </Container>
    </>
  );
};

export default Navbar;
