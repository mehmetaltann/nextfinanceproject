"use server";
import dbConnect from "@/lib/db/dbConnect";
import ParameterModel from "@/lib/models/ParameterModel";
import { revalidatePath } from "next/cache";

interface DeleteResponse {
  msg: string;
  status: boolean;
}

export const deleteParameter = async (
  parameterId: string
): Promise<DeleteResponse> => {
  try {
    await dbConnect();
    const result = await ParameterModel.findByIdAndDelete(parameterId);
    if (!result) {
      return { msg: `Parametre bulunamadı`, status: false };
    }
    revalidatePath(`/parameters`);
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
