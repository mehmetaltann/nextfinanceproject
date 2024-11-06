import { useSelector, useDispatch } from "react-redux";
import { setBankData } from "../../redux/slices/calculateSlice";
import {
  DataSheetGrid,
  floatColumn,
  textColumn,
  keyColumn,
} from "react-datasheet-grid";

const BanksCalculateSheets = ({ expenseList }) => {
  const { bankData } = useSelector((state) => state.calculate);
  const dispatch = useDispatch();

  const columnsList = expenseList.content.map((item) => {
    return { ...keyColumn(item.value, floatColumn), title: item.title };
  });

  const columns = [
    { ...keyColumn("bank", textColumn), title: "Banka" },
    ...columnsList,
    { ...keyColumn("costing", textColumn), title: "Toplam" },
  ];

  return (
    <DataSheetGrid
      value={bankData}
      onChange={(e) => dispatch(setBankData(e))}
      columns={columns}
      rowHeight={35}
      headerRowHeight={50}
      lockRows
    />
  );
};

export default BanksCalculateSheets;
