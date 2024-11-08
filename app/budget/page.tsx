import DataFormContainers from "@/features/Budget/DataFormContainers";
import DataTableContainer from "@/features/Budget/DataTableContainer";
import Header from "@/components/Layouts/Header";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import { Stack, Typography, Paper } from "@mui/material";
import { fetchParameters } from "../actions/fetchData";
import { Parameter } from "@/lib/types/types";

export default async function page() {
  const allParameters: Parameter[] = await fetchParameters();

  const categoriesData: Parameter | undefined = allParameters.find(
    (item) => item.variant === "Bütçe Kategori"
  );

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
              <DataFormContainers categoriesData={categoriesData} />
            </Stack>
          </Paper>
          <DataTableContainer />
        </Stack>
      </PageWrapper>
    </>
  );
}
