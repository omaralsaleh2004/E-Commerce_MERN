import { cartModel } from "../models/cartModel";

interface createCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: createCartForUser) => {
  const userCart = await cartModel.create({ userId , totalAmount : 0 });
  await userCart.save();
  return userCart;
};

interface getActiveCart {
  userId: string;
}

export const getActiveCart = async ({ userId }: getActiveCart) => {
  let userCart = await cartModel.findOne({ userId, status: "active" });
  if (!userCart) {
    userCart = await createCartForUser({ userId });
  }

  return userCart;
};
