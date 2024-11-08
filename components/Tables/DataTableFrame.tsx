import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { trTR } from "@mui/x-data-grid/locales";

const DataTableFrame = (props: any) => {
  const {
    columns,
    data,
    sxProps = {},
    slotsProps = {},
    slotPropsOverrides = {},
    ...rest
  } = props;

  return (
    <DataGrid
      columns={columns}
      rows={data}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText || {}}
      density="compact"
      initialState={{
        pagination: { paginationModel: { pageSize: 30 } },
        ...data?.initialState,
      }}
      pageSizeOptions={[30, 60, 90]}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        toolbar: GridToolbar,
        ...slotsProps,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
        ...slotPropsOverrides,
      }}
      sx={{
        boxShadow: 2,
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
        "& .boldandcolorcell": {
          color: "primary.main",
          fontWeight: "600",
        },
        "& .header": {
          color: "primary.main",
          fontWeight: "600",
          py: 1,
        },
        ".highlight": {
          bgcolor: "#DDDDDD",
          "&:hover": {
            bgcolor: "#EEEEEE",
          },
        },
        "&.MuiDataGrid-root--densityCompact .asdasdasd": {
          py: 1,
        },

        ...sxProps,
      }}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      {...rest}
    />
  );
};

export default DataTableFrame;
