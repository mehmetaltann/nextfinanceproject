import Header from "@/components/Layouts/Header";
import PrmMain from "@/features/Parameters/PrmMain";
import { PageWrapper } from "@/components/Layouts/Wrappers";

export default async function page() {
  return (
    <>
      <Header />
      <PageWrapper maxW="lg">
        <PrmMain />
      </PageWrapper>
    </>
  );
}
