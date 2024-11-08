"use server";
import dbConnect from "@/lib/db/dbConnect";
import BudgetItemModel from "@/lib/models/BudgetItemModel";
import { revalidatePath } from "next/cache";

interface UpdateResponse {
  msg: string;
  status: boolean;
}

export const updateBudgetItem = async (
  budegetItemId: string,
  formData: any
): Promise<UpdateResponse> => {
  try {
    await dbConnect();
    const result = await BudgetItemModel.findByIdAndUpdate(
      budegetItemId,
      formData
    );
    if (!result) {
      return { msg: `Bütçe Kalemi bulunamadı`, status: false };
    }
    revalidatePath("/");
    return { msg: `Bütçe Kalemi başarıyla güncellendi`, status: true };
  } catch (error) {
    console.error(`Silme hatası: ${error}`);
    return {
      msg: `Bütçe Kalemi güncellenemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};
