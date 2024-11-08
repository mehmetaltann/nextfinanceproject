"use server";
import dbConnect from "@/lib/db/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import ParameterModel from "@/lib/models/ParameterModel";
import { revalidatePath } from "next/cache";
import {
  BudgetItemWithoutId,
  Parameter,
  ParameterWithoutId,
} from "@/lib/types/types";
import BudgetItemModel from "@/lib/models/BudgetItemModel";

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

export const addParameterContent = async (
  variant: string,
  formData: {
    value1: string;
    title: string;
    value2: string;
  }
): Promise<InsertResponse> => {
  try {
    await dbConnect();
    await ParameterModel.updateOne(
      { variant },
      { $push: { content: formData } },
      { upsert: true }
    );
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

export const addParameter = async (
  formData: ParameterWithoutId
): Promise<InsertResponse> => {
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

export const addBudgetItems = async (
  formData: BudgetItemWithoutId[]
): Promise<InsertResponse> => {
  try {
    await dbConnect();
    await BudgetItemModel.insertMany(formData);
    revalidatePath("/budget");
    return { msg: "Bütçe Kalemleri Başarıyla Eklendi", status: true };
  } catch (error) {
    return {
      msg: `Bütçe Kalemleri eklenemedi: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
