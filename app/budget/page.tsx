import Header from "@/components/Layouts/Header";
import BudgetHeader from "@/features/Budget/BudgetHeader";
import BudgetTable from "@/features/Budget/BudgetTable";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import { Stack, Typography, Paper } from "@mui/material";

export default async function page() {
  return (
    <>
      <Header />
      <PageWrapper>
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
              <BudgetHeader />
            </Stack>
          </Paper>
          <BudgetTable />
        </Stack>
      </PageWrapper>
    </>
  );
}
