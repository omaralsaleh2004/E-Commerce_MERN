import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../Constants/BaseUrt";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check submitted data !");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to register user , please different credientials !");
      return;
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect token !");
      return;
    }
    login(email, token);
    navigate("/");
    console.log(token);
    setError("");
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Typography variant="h5">Login to Your Account</Typography>
        <Box
          sx={{
            minWidth: "35%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: "12%",
            border: 1,
            p: 4,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField inputRef={passwordRef} label="Password" name="password" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              pt: 6,
            }}
          >
            <Button
              onClick={onSubmit}
              variant="contained"
              style={{ width: "100%" }}
            >
              Login
            </Button>
            {error && (
              <Typography style={{ color: "red", marginTop: 7 }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
