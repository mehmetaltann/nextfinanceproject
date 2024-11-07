import BudgetDataTableFooter from "./DataTableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import PoolIcon from "@mui/icons-material/Pool";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PageConnectionWait from "../../UI/PageConnectionWait";
import { useState, useCallback } from "react";
import { dateFormatNormal } from "../../../utils/help-functions";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/slices/generalSlice";
import { IconButton } from "@mui/material";
import {
  useGetBudgetItemsQuery,
  useDeleteBudgetItemMutation,
  useUpdateBudgetItemMutation,
} from "../../../redux/apis/budgetApi";
import {
  stringColumn,
  dateColumn,
  priceColumn,
  actionColumn,
} from "../../UI/table/columns";

const useFakeMutation = () => {
  return useCallback(
    (item) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (item.title?.trim() === "") {
            reject(new Error("İşlem Konusu Boş Olamaz"));
          } else {
            resolve({ ...item, title: item.title });
          }
        }, 200);
      }),
    []
  );
};

const DataTable = () => {
  const dispatch = useDispatch();

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [deleteBudgetItem] = useDeleteBudgetItemMutation();
  const [updateBudgetItem] = useUpdateBudgetItemMutation();
  const { selectedDate, selectedBudgetType } = useSelector(
    (state) => state.general
  );

  const mutateRow = useFakeMutation();

  const {
    data: budgetItems,
    isLoading,
    isFetching,
  } = useGetBudgetItemsQuery(selectedDate);

  const processRowUpdate = useCallback(
    async (newRow) => {
      newRow.date = dateFormatNormal(newRow.date);
      try {
        const res = await updateBudgetItem(newRow).unwrap();
        const response = await mutateRow(newRow);
        dispatch(
          setSnackbar({
            children: res.message,
            severity: "success",
          })
        );

        return response;
      } catch (error) {
        dispatch(
          setSnackbar({
            children: error,
            severity: "error",
          })
        );
      }
    },
    [mutateRow, dispatch, updateBudgetItem]
  );

  const handleProcessRowUpdateError = useCallback(
    (error) => {
      dispatch(setSnackbar({ children: error.message, severity: "error" }));
    },
    [dispatch]
  );

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!budgetItems)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData =
    selectedBudgetType !== "Tümü"
      ? budgetItems.filter((item) => item.type === selectedBudgetType)
      : budgetItems;

  const columns = [
    {
      field: ":)",
      headerAlign: "center",
      headerClassName: "header",
      align: "left",
      filterable: false,
      width: 10,
      renderCell: (params) => {
        if (params.row.categoryA === "Aylık Gelirler") {
          return <PaidIcon color="success" />;
        } else if (params.row.categoryB === "Sena") {
          return <FavoriteIcon color="success" />;
        } else if (params.row.categoryA === "İlave Gelirler") {
          return <AttachMoneyIcon color="success" />;
        } else if (params.row.categoryB === "Araç") {
          return <CarRepairIcon color="error" />;
        } else if (params.row.categoryB === "Giyim") {
          return <CheckroomIcon color="error" />;
        } else if (params.row.categoryB === "Market") {
          return <ShoppingCartIcon color="error" />;
        } else if (params.row.categoryB === "Telefon") {
          return <PhoneIphoneIcon color="error" />;
        } else if (params.row.categoryA === "Birikim") {
          return <AddBusinessIcon color="error" />;
        } else if (params.row.categoryB === "Kredi") {
          return <AccountBalanceIcon color="error" />;
        } else if (params.row.categoryB === "Sağlık") {
          return <MonitorHeartIcon color="error" />;
        } else if (params.row.categoryB === "Hazır Yemek") {
          return <LocalDiningIcon color="error" />;
        } else if (params.row.categoryB === "Su") {
          return <WaterDropIcon color="error" />;
        } else if (params.row.categoryB === "Elektrik") {
          return <ElectricalServicesIcon color="error" />;
        } else if (params.row.categoryB === "Doğalgaz") {
          return <PropaneTankIcon color="error" />;
        } else if (
          params.row.categoryB === "Eğitim-Kitap" ||
          params.row.categoryB === "Okul Aidatı"
        ) {
          return <SchoolIcon color="error" />;
        } else if (params.row.categoryB === "İnternet-TV") {
          return <ConnectedTvIcon color="error" />;
        } else if (params.row.categoryB === "Tatil") {
          return <PoolIcon color="error" />;
        } else if (
          params.row.categoryB === "Ev Eşyası" ||
          params.row.categoryB === "Ev Tadilat" ||
          params.row.categoryB === "Site Yakıt" ||
          params.row.categoryB === "Site Aidat"
        ) {
          return <OtherHousesIcon color="error" />;
        } else if (
          params.row.categoryB === "Borç" ||
          params.row.categoryB === "Diğer" ||
          params.row.categoryB === "Kira"
        ) {
          return <AttachMoneyIcon color="error" />;
        } else if (params.row.categoryB === "ATM Nakit") {
          return <LocalAtmIcon color="error" />;
        } else if (params.row.categoryB === "Eğlence-Oyun") {
          return <NightlifeIcon color="error" />;
        } else {
          return <EventRepeatIcon color="error" />;
        }
      },
    },
    stringColumn("title", "İşlem", 170, {
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    stringColumn("categoryA", "Kategori A", 130),
    stringColumn("categoryB", "Kategori B", 130),
    dateColumn("date", "Tarih", 100 ),
    priceColumn("amount", "Tutar", 150, {
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    stringColumn("description", "Açıklama", 200, { editable: true }),
    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={async () => {
              try {
                const res = await deleteBudgetItem(params.row.id).unwrap();
                dispatch(
                  setSnackbar({
                    children: res.message,
                    severity: "success",
                  })
                );
              } catch (error) {
                dispatch(
                  setSnackbar({
                    children: error,
                    severity: "success",
                  })
                );
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    }),
  ];

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      slotsProps={{
        footer: BudgetDataTableFooter,
      }}
      slotSPropProps={{
        footer: { filteredData, rowSelectionModel },
      }}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      checkboxSelection
    />
  );
};

export default DataTable;
