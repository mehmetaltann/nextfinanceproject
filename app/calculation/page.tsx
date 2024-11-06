import Header from "@/components/Layouts/Header";
import CalcMain from "@/features/Calculation/CalcMain";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import { fetchParameters } from "../actions/fetchData";
import { Parameter } from "@/lib/types/types";

export default async function page() {
  try {
    const allParameters = (await fetchParameters()) as Parameter[];

    if (!allParameters || allParameters.length === 0) {
      return (
        <>
          <Header />
          <PageWrapper>
            <div>Veriler yüklenirken bir hata oluştu veya veri bulunamadı.</div>
          </PageWrapper>
        </>
      );
    }

    const bankData = allParameters.find((item) => item.variant === "Banka");
    const giderTypeData = allParameters.find(
      (item) => item.variant === "Gider Türleri"
    );

    return (
      <>
        <Header />
        <PageWrapper>
          <CalcMain
            bankaData={bankData ?? { _id: "", variant: "Banka", content: [] }}
            giderTypeData={
              giderTypeData ?? {
                _id: "",
                variant: "Gider Türleri",
                content: [],
              }
            }
          />
        </PageWrapper>
      </>
    );
  } catch (error) {
    console.error("Veri alınırken hata oluştu:", error);
    return (
      <>
        <Header />
        <PageWrapper>
          <div>
            Sunucu bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.
          </div>
        </PageWrapper>
      </>
    );
  }
}
