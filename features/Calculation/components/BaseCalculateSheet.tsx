import { CalcContext } from "@/utils/CalcContext";
import { useContext } from "react";
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  createAddRowsComponent,
  Column,
} from "react-datasheet-grid";

interface RowData {
  [key: string]: number;
}

interface ExpenseItem {
  title: string;
  value1: string;
}

interface BaseCalculateSheetProps {
  expenseList: {
    content: ExpenseItem[];
  };
}

const BaseCalculateSheet: React.FC<BaseCalculateSheetProps> = ({
  expenseList,
}) => {
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error("CalcContext must be used within a CalcContextProvider");
  }

  const { data, setData } = context;

  const columns: Column<any>[] = expenseList.content.map((item) => ({
    ...keyColumn(item.value1, floatColumn),
    title: item.title,
    id: item.title,
  }));

  const addRows = (count?: number) => {
    const newRows: RowData[] = Array(count || 1).fill({ costing: 0 });
    setData([...data, ...newRows]);
  };

  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });

  return (
    <DataSheetGrid
      value={data}
      onChange={(e) => setData(e)}
      columns={columns}
      addRowsComponent={() => <AddRows addRows={addRows} />}
      height={700}
      rowHeight={35}
      headerRowHeight={50}
      autoAddRow
    />
  );
};

export default BaseCalculateSheet;
