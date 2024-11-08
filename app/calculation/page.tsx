import Header from "@/components/Layouts/Header";
import CalcMain from "@/features/Calculation/CalcMain";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import { fetchParameters } from "../actions/fetchData";
import { Parameter } from "@/lib/types/types";

export default async function Page() {
  try {
    const allParameters: Parameter[] = await fetchParameters();

    if (!allParameters || allParameters.length === 0) {
      return (
        <>
          <Header />
          <PageWrapper maxW="xl">
            <div>Veriler yüklenirken bir hata oluştu veya veri bulunamadı.</div>
          </PageWrapper>
        </>
      );
    }

    return (
      <>
        <Header />
        <PageWrapper maxW="xl">
          <CalcMain allParameters={allParameters} />
        </PageWrapper>
      </>
    );
  } catch (error) {
    console.error("Veri alınırken hata oluştu:", error);
    return (
      <>
        <Header />
        <PageWrapper maxW="xl">
          <div>
            Sunucu bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.
          </div>
        </PageWrapper>
      </>
    );
  }
}
