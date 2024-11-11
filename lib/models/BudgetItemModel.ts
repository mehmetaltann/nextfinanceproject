import mongoose, { Model, Schema } from "mongoose";
import { BudgetItem } from "../types/types";

const BudgetItemSchema = new Schema<BudgetItem>(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    categoryA: {
      type: String,
      required: true,
      trim: true,
    },
    categoryB: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const BudgetItemModel: Model<BudgetItem> =
  mongoose.models?.budgetitem ||
  mongoose.model<BudgetItem>("budgetitem", BudgetItemSchema);

export default BudgetItemModel;
