import { useSelector, useDispatch } from "react-redux";
import { setTotalData } from "../../redux/slices/calculateSlice";
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  textColumn,
} from "react-datasheet-grid";

const TotalCalculateSheets = ({ expenseList }) => {
  const dispatch = useDispatch();
  const { totalData } = useSelector((state) => state.calculate);
  const columnsList = expenseList.content.map((item) => {
    return { ...keyColumn(item.value, floatColumn), title: item.title };
  });

  const columns = [
    ...columnsList,
    { ...keyColumn("costing", textColumn), title: "Toplam" },
  ];

  return (
    <DataSheetGrid
      value={totalData}
      onChange={(e) => dispatch(setTotalData(e))}
      columns={columns}
      rowHeight={35}
      headerRowHeight={50}
      lockRows
    />
  );
};

export default TotalCalculateSheets;
