import { cartModel, ICartItems } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
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
  populateProduct?: boolean;
}

export const getActiveCart = async ({
  userId,
  populateProduct,
}: getActiveCart) => {
  let userCart;
  if (populateProduct) {
    userCart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    userCart = await cartModel.findOne({ userId, status: "active" });
  }
  if (!userCart) {
    userCart = await createCartForUser({ userId });
  }

  return userCart;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const userCart = await getActiveCart({ userId });
  userCart.items = [];
  userCart.totalAmount = 0;
  const updatedCart = await userCart.save();
  return { data: updatedCart, statusCode: 200 };
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
  await userCart.save();
  return {
    data: await getActiveCart({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
  const userCart = await getActiveCart({ userId });

  const exitstInCart = userCart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!exitstInCart) {
    return { data: "Item does not exist in cart !", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "product not found !", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: " Low stock for item", statusCode: 400 };
  }
  const otherCartItems = userCart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = CalculateCartTotalItems(otherCartItems);

  console.log(total);

  exitstInCart.quantity = quantity;
  total += exitstInCart.quantity * exitstInCart.unitPrice;
  userCart.totalAmount = total;
  await userCart.save();
  return {
    data: await getActiveCart({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface DeleteItemInCart {
  userId: string;
  productId: any;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const userCart = await getActiveCart({ userId });

  const exitstInCart = userCart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!exitstInCart) {
    return { data: "Item does not exist in cart !", statusCode: 400 };
  }

  const otherCartItems = userCart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = CalculateCartTotalItems(otherCartItems);

  userCart.items = otherCartItems;
  userCart.totalAmount = total;
  await userCart.save();

  return {
    data: await getActiveCart({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

const CalculateCartTotalItems = (cartItems: ICartItems[]) => {
  const total = cartItems.reduce((sum, p) => {
    sum += p.quantity * p.unitPrice;
    return sum;
  }, 0);

  return total;
};

interface checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: checkout) => {
  let orderItems = [];
  if (!address) {
    return { data: "please enter your address !", statusCode: 400 };
  }
  const userCart = await getActiveCart({ userId });

  for (const item of userCart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "product not found !", statusCode: 400 };
    }
    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    total: userCart.totalAmount,
    address,
    userId,
  });
  await order.save();

  userCart.status = "completed";

  await userCart.save();

  return { data: order, statusCode: 200 };
};
