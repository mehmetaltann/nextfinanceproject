"use server";
import dbConnect from "@/lib/db/dbConnect";
import BudgetItemModel from "@/lib/models/BudgetItemModel";
import ParameterModel from "@/lib/models/ParameterModel";
import { revalidatePath } from "next/cache";

interface DeleteResponse {
  msg: string;
  status: boolean;
}

export const deleteParameterContent = async (
  variant: string,
  parameterId: string
): Promise<DeleteResponse> => {
  try {
    await dbConnect();
    const result = await ParameterModel.updateOne(
      { variant },
      { $pull: { content: { _id: parameterId } } }
    );
    if (!result) {
      return { msg: `Parametre bulunamadı`, status: false };
    }
    revalidatePath("/parameters");
    return { msg: `Parametre başarıyla silindi`, status: true };
  } catch (error) {
    console.error(`Silme hatası: ${error}`);
    return {
      msg: `Parametre silinemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};

export const deleteParameter = async (
  parameterId: string
): Promise<DeleteResponse> => {
  try {
    await dbConnect();
    const result = await ParameterModel.findByIdAndDelete(parameterId);
    if (!result) {
      return { msg: `Parametre bulunamadı`, status: false };
    }
    revalidatePath("/parameters");
    return { msg: `Parametre başarıyla silindi`, status: true };
  } catch (error) {
    console.error(`Silme hatası: ${error}`);
    return {
      msg: `Parametre silinemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};

export const deleteBudgetItem = async (
  budegetItemId: string
): Promise<DeleteResponse> => {
  try {
    await dbConnect();
    const result = await BudgetItemModel.findByIdAndDelete(budegetItemId);
    if (!result) {
      return { msg: `Bütçe Kalemi bulunamadı`, status: false };
    }
    revalidatePath("/");
    revalidatePath("/statistics");
    return { msg: `Bütçe Kalemi başarıyla silindi`, status: true };
  } catch (error) {
    console.error(`Silme hatası: ${error}`);
    return {
      msg: `Bütçe Kalemi silinemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};
