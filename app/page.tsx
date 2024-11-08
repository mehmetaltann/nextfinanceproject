import Header from "@/components/Layouts/Header";
import BudgetMain from "@/features/Budget/BudgetMain";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import { Parameter } from "@/lib/types/types";
import { fetchParameters } from "./actions/fetchData";

export default async function page() {
  const allParameters: Parameter[] = await fetchParameters();

  return (
    <>
      <Header />
      <PageWrapper maxW="lg">
        <BudgetMain allParameters={allParameters} />
      </PageWrapper>
    </>
  );
}
