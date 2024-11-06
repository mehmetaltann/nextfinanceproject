"use server";
import dbConnect from "@/lib/db/dbConnect";
import ParameterModel from "@/lib/models/ParameterModel";
import { Parameter } from "@/lib/types/types";

export const fetchParameters = async (): Promise<Parameter[]> => {
  try {
    await dbConnect();
    const allItems = await ParameterModel.find({}).lean();
    const filteredAllItems: Parameter[] = JSON.parse(JSON.stringify(allItems));
    return filteredAllItems as Parameter[];
  } catch (error) {
    console.error(`Error fetching from model`, error);
    return [];
  }
};
