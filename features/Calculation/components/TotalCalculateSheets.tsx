import { CalcContext } from "@/utils/CalcContext";
import { useContext } from "react";
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  textColumn,
  Column,
} from "react-datasheet-grid";

interface ExpenseItem {
  title: string;
  value1: string;
}

interface TotalCalculateSheetsProps {
  expenseList: {
    content: ExpenseItem[];
  };
}

interface TotalDataItem {
  [key: string]: number | string;
}

const TotalCalculateSheets: React.FC<TotalCalculateSheetsProps> = ({
  expenseList,
}) => {
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error("CalcContext must be used within a CalcContextProvider");
  }

  const { totalData, setTotalData } = context;

  // Explicit typing for totalData and setTotalData
  const columnsList: Column<any>[] = expenseList.content.map((item) => ({
    ...keyColumn(item.value1, floatColumn),
    title: item.title,
    id: item.title,
  }));

  const columns: Column<any>[] = [
    ...columnsList,
    { ...keyColumn("costing", textColumn), title: "Toplam", id: "Toplam" },
  ];

  // Ensure `totalData` is typed correctly
  return (
    <DataSheetGrid
      value={totalData as TotalDataItem[]}
      onChange={(e) => setTotalData(e)}
      columns={columns}
      rowHeight={35}
      headerRowHeight={50}
      lockRows
    />
  );
};

export default TotalCalculateSheets;
