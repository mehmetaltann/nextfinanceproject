"use server";
import dbConnect from "@/lib/db/dbConnect";
import BudgetItemModel from "@/lib/models/BudgetItemModel";
import ParameterModel from "@/lib/models/ParameterModel";
import { BudgetItem, Parameter } from "@/lib/types/types";
import {
  prevSixMonthFirstDay,
  prevThreeMonthFirstDay,
  prevThreeYearFirstDay,
  prevYearFirstDay,
  thisMonthFirstDay,
} from "@/utils/helpers";

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

export const fetchBudgetItems = async (
  dateData: string
): Promise<BudgetItem[]> => {
  const getQuery = (date: string) => {
    switch (date) {
      case "1":
        return { date: { $gte: thisMonthFirstDay } };
      case "2":
        return { date: { $gte: prevThreeMonthFirstDay } };
      case "3":
        return { date: { $gte: prevSixMonthFirstDay } };
      case "4":
        return { date: { $gte: prevYearFirstDay } };
      case "5":
        return { date: { $gte: prevThreeYearFirstDay } };
      case "0":
        return {};
      default:
        return {};
    }
  };
  try {
    await dbConnect();
    const query = getQuery(dateData);
    const allItems = await BudgetItemModel.aggregate([
      { $match: query },
      {
        $project: {
          _id: 0,
          id: "$_id",
          title: 1,
          amount: 1,
          type: 1,
          date: 1,
          categoryA: 1,
          categoryB: 1,
          description: 1,
        },
      },
      { $sort: { date: -1 } },
    ]);
    const filteredAllItems: BudgetItem[] = JSON.parse(JSON.stringify(allItems));

    return filteredAllItems as BudgetItem[];
  } catch (error) {
    console.error("Error fetching from model", error);
    return [];
  }
};
