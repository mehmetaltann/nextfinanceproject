"use server";
import dbConnect from "@/lib/db/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import ParameterModel from "@/lib/models/ParameterModel";
import { revalidatePath } from "next/cache";
import { Parameter } from "@/lib/types/types";

interface InsertResponse {
  msg: string;
  status: boolean;
}

export const addUser = async (
  prevState: any,
  formData: any
): Promise<InsertResponse> => {
  try {
    const isim = formData.get("isim")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!isim || !email || !password) {
      return { msg: "Tüm alanları doldurun", status: false };
    }
    await dbConnect();
    const existingUser = await UserModel.findOne({ email }).select("_id");
    if (existingUser) {
      return { msg: "Bu kullanıcı zaten kayıtlıdır", status: false };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { isim, email, password: hashedPassword };
    await UserModel.create(userData);
    return { msg: "Kullanıcı başarıyla kaydedildi", status: true };
  } catch (error) {
    console.error(`Kullanıcı eklenemedi: ${error}`);
    return {
      msg: `Kullanıcı eklenemedi: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addParameter = async (formData: {
  value1: string;
  title: string;
  value2: string;
}): Promise<InsertResponse> => {
  try {
    await dbConnect();
    await ParameterModel.create(formData);
    revalidatePath("/parameters");
    return { msg: "Parametre Başarıyla Eklendi", status: true };
  } catch (error) {
    return {
      msg: `Parametre eklenemedi: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
