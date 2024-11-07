"use client";
import { createContext, useState, useMemo, ReactNode } from "react";

interface TotalDataItem {
  [key: string]: number | string;
}

interface CalcContextType {
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  data: TotalDataItem[];
  bankData: TotalDataItem[];
  totalData: TotalDataItem[];
  setBankData: (newData: any[]) => void;
  setData: (newData: any[]) => void;
  setTotalData: (newData: TotalDataItem[]) => void;
}

export const BudgetContext = createContext<CalcContextType | null>(null);

interface CalcContextProviderProps {
  children: ReactNode;
}

export const BudgetContextProvider: React.FC<CalcContextProviderProps> = ({
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
  const [bankData, setBankData] = useState<TotalDataItem[]>([]);
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

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
