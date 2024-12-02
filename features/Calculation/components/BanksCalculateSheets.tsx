import { CalcContext } from "@/utils/CalcContext";
import { useContext } from "react";

import {
  DataSheetGrid,
  floatColumn,
  textColumn,
  keyColumn,
  Column,
} from "react-datasheet-grid";

interface ExpenseItem {
  title: string;
  value1: string;
}

interface BanksCalculateSheetsProps {
  expenseList: {
    content: ExpenseItem[];
  };
}

const BanksCalculateSheets = ({ expenseList }: BanksCalculateSheetsProps) => {
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error("CalcContext must be used within a CalcContextProvider");
  }

  const { bankData, setBankData } = context;

  const columnsList: Column<any>[] = expenseList.content.map((item) => ({
    ...keyColumn(item.value1, floatColumn),
    title: item.title,
    id: item.title,
  }));

  const columns: Column<any>[] = [
    { ...keyColumn("bank", textColumn), title: "Banka", id: "Banka" },
    ...columnsList,
    { ...keyColumn("costing", textColumn), title: "Toplam", id: "Toplam" },
  ];

  return (
    <DataSheetGrid
      value={bankData}
      onChange={(e) => setBankData(e)}
      columns={columns}
      rowHeight={35}
      headerRowHeight={50}
      lockRows
    />
  );
};

export default BanksCalculateSheets;
