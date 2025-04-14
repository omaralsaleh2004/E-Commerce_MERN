import express from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      password,
      email,
    });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("something went wrong !");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({ email, password });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("something went wrong !");
  }
});

export default router;
