import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

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
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.get("/my-orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { data, statusCode } = await getMyOrders({ userId });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

export default router;
