import express from "express";
import { getActiveCart } from "../services/cartService";
import { validateJWT } from "../middlewares/validateJWT";
import { Response, Request } from "express";

interface ExtendRequest extends Request {
  user?: any;
}

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  const userId = req.user._id;
  const userCart = await getActiveCart({ userId });
  res.status(200).send(userCart);
});

export default router;
