import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../redux/slices/calculateSlice";
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  createAddRowsComponent,
} from "react-datasheet-grid";

const BaseCalculateSheet = ({ expenseList }) => {
  const { data } = useSelector((state) => state.calculate);
  const dispatch = useDispatch();

  const columns = expenseList.content.map((item) => {
    return { ...keyColumn(item.value, floatColumn), title: item.title };
  });

  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });

  return (
    <DataSheetGrid
      value={data}
      onChange={(e) => dispatch(setData(e))}
      columns={columns}
      addRowsComponent={AddRows}
      height={700}
      rowHeight={35}
      headerRowHeight={50}
      autoAddRow
    />
  );
};

export default BaseCalculateSheet;
