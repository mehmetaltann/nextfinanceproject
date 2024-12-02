"use client";
import DataFormContainers from "@/features/Budget/DataFormContainers";
import DataTableContainer from "@/features/Budget/DataTableContainer";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import { Stack, Typography, Paper } from "@mui/material";
import { BudgetItem, Parameter } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { fetchBudgetItems } from "@/app/actions/fetchData";

interface BudgetMainProps {
  allParameters: Parameter[];
}

const BudgetMain = ({ allParameters }: BudgetMainProps) => {
  const categoriesData: Parameter | undefined = allParameters.find(
    (item) => item.variant === "Bütçe Kategori"
  );
  const [selectedDate, setSelectedDate] = useState("2");
  const [selectedBudgetType, setSelectedBudgetType] = useState("Tümü");
  const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: BudgetItem[] = await fetchBudgetItems(selectedDate);
        setBudgetItems(response);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setUpdate(false);
  }, [selectedDate, update]);

  if (loading) {
    return <PageConnectionWait title="Veriler Bekleniyor" />;
  }

  if (!budgetItems || budgetItems.length === 0) {
    return <PageConnectionWait title="Veri Bulunamadı" />;
  }

  return (
    <Stack spacing={1}>
      <Paper sx={{ p: 2 }}>
        <Stack
          spacing={{ xs: 4, md: 4 }}
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ ml: 3, xs: { width: "100%" } }}
        >
          <Typography variant="h6" color="info.main">
            Bütçe İşlemleri
          </Typography>
          <DataFormContainers
            categoriesData={categoriesData}
            setUpdate={setUpdate}
          />
        </Stack>
      </Paper>
      <DataTableContainer
        selectedBudgetType={selectedBudgetType}
        selectedDate={selectedDate}
        setSelectedBudgetType={setSelectedBudgetType}
        setSelectedDate={setSelectedDate}
        budgetItems={budgetItems}
        setUpdate={setUpdate}
      />
    </Stack>
  );
};

export default BudgetMain;
