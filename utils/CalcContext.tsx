"use client";
import { createContext, useState, useMemo, ReactNode } from "react";

interface TotalDataItem {
  [key: string]: number | string;
}

interface BankData {
  bank: string;
  costing: number;
  [key: string]: number | string;
}

interface CalcContextType {
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  data: TotalDataItem[];
  bankData: BankData[];
  totalData: TotalDataItem[];
  setBankData: (newData: BankData[]) => void;
  setData: (newData: TotalDataItem[]) => void;
  setTotalData: (newData: TotalDataItem[]) => void;
}

export const CalcContext = createContext<CalcContextType | null>(null);

interface CalcContextProviderProps {
  children: ReactNode;
}

export const CalcContextProvider: React.FC<CalcContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<TotalDataItem[]>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [bankData, setBankData] = useState<BankData[]>([]);
  const [totalData, setTotalData] = useState<TotalDataItem[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>("VB");

  const value = useMemo(
    () => ({
      data,
      setData,
      bankData,
      setBankData,
      totalData,
      setTotalData,
      selectedBank,
      setSelectedBank,
    }),
    [data, bankData, totalData, selectedBank]
  );

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
};
