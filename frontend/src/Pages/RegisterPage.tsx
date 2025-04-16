import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../Constants/BaseUrt";
import { useAuth } from "../Context/Auth/AuthContext";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const {login} = useAuth();
  const onSubmit = async () => {
    const firstName = firstnameRef.current?.value;
    const lastName = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;


    if(!firstName || !lastName || !email || !password) {
      setError("Check submitted data !");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
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
    login(email , token);
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
        <Typography variant="h5">Register New Account</Typography>
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
          <TextField
            inputRef={firstnameRef}
            label="FirstName"
            name="firstName"
          />
          <TextField inputRef={lastnameRef} label="LastName" name="lastName" />
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
              Register
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

export default RegisterPage;
