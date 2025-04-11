import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface createCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: createCartForUser) => {
  const userCart = await cartModel.create({ userId, totalAmount: 0 });
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

interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const userCart = await getActiveCart({ userId });

  const exitstInCart = userCart.items.find(
    (p) => p.product.toString() === productId
  );

  if (exitstInCart) {
    return { data: "item already exist in cart !", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "product not found !", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: " Low stock for item", statusCode: 400 };
  }

  userCart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  userCart.totalAmount += product.price * quantity;
  const updatedCart = await userCart.save();
  return { data: updatedCart, statusCode: 200 };
};
