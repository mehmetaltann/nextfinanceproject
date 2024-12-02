import AltanSelect from "@/components/Ui/AltanSelect";
import Grid from "@mui/material/Grid2";
import { BudgetItem } from "@/lib/types/types";
import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { filterAndSumDataByMonth, transformData } from "./helperFunctions";
import { LineChart } from "@mui/x-charts";

interface StaticsChartProps {
  data: BudgetItem[];
  dateString: string[];
}

interface row {
  label: string;
  value: number;
  up: string;
}

interface transformData {
  label: string;
  value: number;
  alt: row[];
}

const StaticsChart = ({ data, dateString }: StaticsChartProps) => {
  const [type, setType] = useState<string>("Gelir");
  const [categoryA, setCategoryA] = useState<string>("Tümü");
  const [categoryB, setCategoryB] = useState<string>("Tümü");
  const [categoryAList, setCategoryAList] = useState<any>([]);
  const [categoryBList, setCategoryBList] = useState<any>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const isTypeMatch = item.type === type;
      const isCategoryAMatch =
        categoryA === "Tümü" || item.categoryA === categoryA;
      const isCategoryBMatch =
        categoryB === "Tümü" || item.categoryB === categoryB;
      return isTypeMatch && isCategoryAMatch && isCategoryBMatch;
    });
  }, [data, type, categoryA, categoryB]);

  useEffect(() => {
    if (categoryA !== "Tümü" || categoryB !== "Tümü") {
      setCategoryA("Tümü");
      setCategoryB("Tümü");
    }
  }, [type]);

  useEffect(() => {
    const { catAlist, catBlist } = transformData(filteredData);
    setCategoryAList(catAlist);
    setCategoryBList(catBlist);
  }, [filteredData]);

  const filteredChartData = useMemo(() => {
    return filterAndSumDataByMonth(
      data,
      type,
      categoryA,
      categoryB,
      dateString
    );
  }, [data, type, categoryA, categoryB, dateString]);

  return (
    <Grid container>
      <Grid>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
          spacing={2}
        >
          <AltanSelect
            id="type"
            defaultValue="Gelir"
            value={type}
            minWidth="20ch"
            onChange={setType}
            data={[{ type: "Gelir" }, { type: "Gider" }]}
            dataTextAttr="type"
            dataValueAttr="type"
          />
          <AltanSelect
            id="categoryA"
            defaultValue="Tümü"
            value={categoryA}
            minWidth="20ch"
            onChange={setCategoryA}
            data={categoryAList}
            dataTextAttr="label"
            isAll={true}
            dataValueAttr="label"
          />

          <AltanSelect
            id="categoryB"
            defaultValue="Tümü"
            value={categoryB}
            minWidth="20ch"
            isAll={true}
            onChange={setCategoryB}
            data={categoryBList}
            dataTextAttr="label"
            dataValueAttr="label"
          />
        </Stack>
      </Grid>
      <Grid>
        <LineChart
          xAxis={[{ scaleType: "point", data: dateString }]}
          series={[
            {
              data: filteredChartData,
              label: type,
              area: true,
            },
          ]}
          width={700}
          height={500}
        />
      </Grid>
    </Grid>
  );
};

export default StaticsChart;
