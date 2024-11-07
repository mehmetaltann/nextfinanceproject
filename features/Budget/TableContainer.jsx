import BudgetDataTable from "./DataTable";
import AltanSelect from "../../UI/AltanSelect";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector, useDispatch } from "react-redux";
import { pickDate, pickBudgetType } from "../../../redux/slices/generalSlice";
import { DataTableWrapper } from "../../../layouts/Wrappers";
import { ToggleButton, ToggleButtonGroup, Paper, Stack } from "@mui/material";

export const historyPick = [
  { value: 1, label: "Son 1 Ay" },
  { value: 2, label: "Son 3 Ay" },
  { value: 3, label: "Son 6 Ay" },
  { value: 4, label: "Son 1 Yıl" },
  { value: 5, label: "Son 3 Yıl" },
  { value: 0, label: "Tümü" },
];

const TableContainer = () => {
  const { selectedDate, selectedBudgetType } = useSelector(
    (state) => state.general
  );
  const dispatch = useDispatch();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={{ xs: 1, sm: 1, md: 1 }}
        >
          <Grid xs={12} md={4}>
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <ToggleButtonGroup
                value={selectedBudgetType}
                exclusive
                onChange={(e) => dispatch(pickBudgetType(e.target.value))}
                aria-label="Platform"
              >
                <ToggleButton
                  color="success"
                  value="Gelir"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Gelir
                </ToggleButton>
                <ToggleButton
                  color="error"
                  value="Gider"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Gider
                </ToggleButton>
                <ToggleButton
                  color="primary"
                  value="Tümü"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Tümü
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Grid>
          <Grid
            container
            xs={12}
            md={8}
            spacing={{ xs: 0, md: 1 }}
            justifyContent={{ md: "flex-end", xs: "flex-start" }}
          >
            <AltanSelect
              id="tarih"
              defaultValue={2}
              value={selectedDate}
              minWidth="20ch"
              onChange={pickDate}
              data={historyPick}
              dataTextAttr="label"
              dataValueAttr="value"
            />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <DataTableWrapper
            tableHeight={"68vh"}
            sxProps={{ p: { xs: 0, md: 1 } }}
          >
            <BudgetDataTable />
          </DataTableWrapper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TableContainer;
