"use client";
import Grid from "@mui/material/Grid2";
import StatisticsTable from "./StatisticsTable";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useMemo } from "react";
import { generateArrayOfYears, thisMonth, thisYear } from "@/utils/helpers";
import { BudgetItem } from "@/lib/types/types";
import {
  Paper,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Box,
  Button,
  Stack,
  SelectChangeEvent,
} from "@mui/material";

type Month = { value: number; label: string };

const monthsTranslate: Month[] = [
  { value: 1, label: "Ocak" },
  { value: 2, label: "Şubat" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Nisan" },
  { value: 5, label: "Mayıs" },
  { value: 6, label: "Haziran" },
  { value: 7, label: "Temmuz" },
  { value: 8, label: "Ağustos" },
  { value: 9, label: "Eylül" },
  { value: 10, label: "Ekim" },
  { value: 11, label: "Kasım" },
  { value: 12, label: "Aralık" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

function getStyles(name: number, personName: number[], theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const StatisticsMain = ({
  allBudgetItems: budgetItems,
}: {
  allBudgetItems: BudgetItem[];
}) => {
  const [years, setYears] = useState<number[]>([thisYear]);
  const [months, setMonths] = useState<number[]>([thisMonth]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  if (!budgetItems) return <PageConnectionWait title="Veriler Bekleniyor" />;

  const budgetObjectList = useMemo(() => budgetItems, [budgetItems]);

  useEffect(() => {
    setFilteredData(
      budgetObjectList.filter((item) => {
        const [year, month] = item.date.toISOString().split("-").map(Number);
        return year === thisYear && month === thisMonth;
      })
    );
  }, [budgetObjectList, thisYear, thisMonth]);

  const theme = useTheme();
  const yearsList = useMemo(() => generateArrayOfYears(), []);
  const monthsList = useMemo(() => monthsTranslate, []);

  const handleMonthChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target;
    setMonths(typeof value === "string" ? value.split(",").map(Number) : value);
  };

  const handleYearChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target;
    setYears(typeof value === "string" ? value.split(",").map(Number) : value);
  };

  function handleQuery() {
    const filtData = budgetObjectList.filter((item) => {
      const [year, month] = item.date.toISOString().split("-").map(Number);
      const isYearMatch = years.includes(year);
      const isMonthMatch = months.length === 0 || months.includes(month);

      return isYearMatch && isMonthMatch;
    });

    setFilteredData(filtData);
  }

  return (
    <Stack spacing={1}>
      <Paper>
        <Grid container sx={{ p: 2 }} alignItems={"center"} spacing={1}>
          <Grid>
            <InputLabel id="year">Yıl</InputLabel>
            <Select
              labelId="year"
              id="years"
              multiple
              size="small"
              sx={{ minWidth: "30ch", p: 1, borderColor: "primary.main" }}
              value={years}
              label="Yıl"
              onChange={handleYearChange}
              input={<OutlinedInput label="Years" />}
              MenuProps={MenuProps}
            >
              {yearsList.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  style={getStyles(item, years, theme)}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Stack
              spacing={1}
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ ml: 1, mr: 1 }}
            >
              <FormHelperText>Çoklu Seçilebilir</FormHelperText>

              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setYears(yearsList);
                }}
              >
                Tüm Yıllar
              </Button>
              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setYears([thisYear]);
                }}
              >
                Sıfırla
              </Button>
            </Stack>
          </Grid>
          <Grid>
            <InputLabel id="ay">Ay</InputLabel>
            <Select
              labelId="ay"
              id="demo-multiple-name"
              disabled={years.length === 0}
              multiple
              size="small"
              sx={{ minWidth: "30ch", p: 1, borderColor: "primary.main" }}
              value={months}
              label="Ay"
              onChange={handleMonthChange}
              input={<OutlinedInput label="Month" />}
              MenuProps={MenuProps}
            >
              {monthsList.map(({ label, value }) => (
                <MenuItem
                  key={value}
                  value={value}
                  style={getStyles(value, months, theme)}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
            <Stack
              spacing={1}
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ ml: 1, mr: 1 }}
            >
              <FormHelperText>Çoklu Seçilebilir</FormHelperText>

              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setMonths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                }}
              >
                Tüm Aylar
              </Button>
              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setMonths([thisMonth]);
                }}
              >
                Sıfırla
              </Button>
            </Stack>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              sx={{ p: 1.8, minWidth: "20ch" }}
              size="large"
              onClick={handleQuery}
            >
              Sorgula
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Box sx={{ p: 2 }}>
          <StatisticsTable
            data={filteredData}
            monthNumber={months.length * years.length}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

export default StatisticsMain;
