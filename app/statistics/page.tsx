import Header from "@/components/Layouts/Header";
import StatisticsMain from "@/features/Statictics/StatisticsMain";
import { fetchBudgetItems } from "../actions/fetchData";
import { BudgetItem } from "@/lib/types/types";
import { PageWrapper } from "@/components/Layouts/Wrappers";

export default async function page() {
  const allBudgetItems: BudgetItem[] = await fetchBudgetItems("0");

  return (
    <>
      <Header />
      <PageWrapper maxW="lg">
        <StatisticsMain allBudgetItems={allBudgetItems} />
      </PageWrapper>
    </>
  );
}
