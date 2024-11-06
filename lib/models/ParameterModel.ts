import mongoose, { Model, Schema } from "mongoose";
import { Parameter } from "../types/types";

const ParameterSchema = new Schema<Parameter>({
  variant: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  content: [
    {
      title: String,
      value1: String,
      value2: String,
    },
  ],
});

const ParameterModel: Model<Parameter> =
  mongoose.models?.parameter ||
  mongoose.model<Parameter>("parameter", ParameterSchema);

export default ParameterModel;
