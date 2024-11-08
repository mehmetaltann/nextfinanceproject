
import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useCallback } from "react";


import { IconButton } from "@mui/material";

import OnayBox from "@/components/Ui/OnayBox";
import { BudgetItemWithoutId, OnayBoxInf } from "@/lib/types/types";
import { toast } from "react-toastify";
import { handleResponseMsg } from "@/utils/toast-helper";
import iconMapper from "@/utils/iconmapper";
import DataTableFrame from "@/components/Tables/DataTableFrame";
import { actionColumn, dateColumn, priceColumn, stringColumn } from "@/components/Tables/columns";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";

const useFakeMutation = () => {
  return useCallback(
    (item: BudgetItemWithoutId) =>
      new Promise<BudgetItemWithoutId>((resolve, reject) => {
        setTimeout(() => {
          if (item.?title.trim() === "") {
            reject(new Error("Gider Adı No Boş Olamaz"));
          } else {
            resolve({
              ...item,
            });
          }
        }, 200);
      }),
    []
  );
};

const DataTable = () => {
  const [onayBoxInf, setOnayBoxInf] = useState<OnayBoxInf>({
    isOpen: false,
    content: "",
    onClickHandler: async () => {},
    functionData: {},
  });

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const { selectedDate, selectedBudgetType } = useSelector(
    (state) => state.general
  );

  const mutateRow = useFakeMutation();

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
    [mutateRow]
  );

  const budgetItemDeleteHandler = async ({
    budgetItemId
  }: {
    budgetItemId: string;
  }) => {
    try {
      const res = await deleteBudgetItem (budgetItemId);
      handleResponseMsg(res);
      setOnayBoxInf((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      toast.error(`Bütçe Kalemi Silinemedi, Bir hata oluştu : ${error}`);
    }
  };

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    toast.error(error.message);
  }, []);


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
      renderCell: (params) =>
        (iconMapper[params.row.categoryB] || iconMapper.default)(),
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
    dateColumn("date", "Tarih", 100),
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
              size="small"
              color="primary"
              onClick={() => {
                setOnayBoxInf({
                  isOpen: true,
                  content: "Bütçe Kalemi silinsin mi?",
                  onClickHandler: () =>
                    budgetItemDeleteHandler({ params.row.id }),
                  functionData: { params.row.id },
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
        );
      },
    }),
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
    {onayBoxInf.isOpen && (
      <OnayBox onayBoxInf={onayBoxInf} setOnayBoxInf={setOnayBoxInf} />
    )}
    <DataTableFrame
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 100}
      density="standard"
      columns={columns}
      data={filteredData}
      disableColumnResize
      disableDensitySelector
      disableColumnFilter
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
    />
    </div>
  );
};

export default DataTable;
