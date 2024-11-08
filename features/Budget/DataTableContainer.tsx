import Grid from "@mui/material/Grid2";
import DataTable from "./DataTable";
import AltanSelect from "@/components/Ui/AltanSelect";
import { ToggleButton, ToggleButtonGroup, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { DataTableWrapper } from "@/components/Layouts/Wrappers";

export const historyPick = [
  { value: "1", label: "Son 1 Ay" },
  { value: "2", label: "Son 3 Ay" },
  { value: "3", label: "Son 6 Ay" },
  { value: "4", label: "Son 1 Yıl" },
  { value: "5", label: "Son 3 Yıl" },
  { value: "0", label: "Tümü" },
];

const DataTableContainer = () => {
  const [selectedDate, setSelectedDate] = useState("2");
  const [selectedBudgetType, setSelectedBudgetType] = useState("Tümü");

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid
          container
          size={{ xs: 12 }}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={{ xs: 1, sm: 1, md: 1 }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <ToggleButtonGroup
                value={selectedBudgetType}
                exclusive
                onChange={(e) => setSelectedBudgetType(e.target.value)}
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
            size={{ xs: 12, md: 8 }}
            spacing={{ xs: 0, md: 1 }}
            justifyContent={{ md: "flex-end", xs: "flex-start" }}
          >
            <AltanSelect
              id="tarih"
              defaultValue={"2"}
              value={selectedDate}
              minWidth="20ch"
              onChange={setSelectedDate}
              data={historyPick}
              dataTextAttr="label"
              dataValueAttr="value"
            />
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12 }}>
          <DataTableWrapper tableHeight={"68vh"} sx={{ p: { xs: 0, md: 1 } }}>
            <DataTable />
          </DataTableWrapper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DataTableContainer;
