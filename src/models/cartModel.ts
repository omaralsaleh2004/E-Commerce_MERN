import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const statusEnum = ["active", "completed"];

interface ICartItems {
  product: IProduct;
  quantity: number;
  unitPrice: number;
}

interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItems[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemsSchema = new Schema<ICartItems>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [cartItemsSchema], required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: statusEnum, required: true, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
