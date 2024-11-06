import { useState } from "react";
import Grid from "@mui/material/Grid2";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import AltanSelect from "@/components/Ui/AltanSelect";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Parameter } from "@/lib/types/types";
import { PageWrapper } from "@/components/Layouts/Wrappers";

// Tip Tanımlamaları
type Attr = {
  value: string;
  [key: string]: string; // Bu, diğer tüm alanları da kabul etmesine izin verir
};
type DataItem = {
  [key: string]: number; // key'i string olan ve değeri number olan bir nesne
};

interface BankItem {
  bank: string;
  [key: string]: number | string;
}

interface expenseList {
  value: string;
  title1: string;
  title2: string;
  _id: string;
}

function sumByList(
  attrList: Attr[],
  dataList: DataItem[]
): { [key: string]: number }[] {
  // Tüm attrList değerlerini bir harita oluştur
  const totalMap = new Map<string, number>(
    attrList.map((item) => [item.value, 0])
  );

  // dataList'i dolaş ve eşleşen anahtarları haritada güncelle
  dataList.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (totalMap.has(key)) {
        totalMap.set(key, totalMap.get(key)! + item[key]); // '!' null veya undefined olmadığını belirtir
      }
    });
  });

  // Haritayı { key: value } formatında bir nesne dizisine dönüştür
  return Array.from(totalMap.entries()).map(([key, total]) => ({
    [key]: total,
  }));
}

const CalcMain = ({
  bankaData,
  giderTypeData,
}: {
  bankaData: Parameter;
  giderTypeData: Parameter;
}) => {
  const [data, setData] = useState<DataItem[]>(Array(8).fill({}));
  const [investmentData, setInvestmentData] = useState<DataItem[]>([{}, {}]);
  const [budgetData, setBudgetData] = useState<DataItem[]>([{}, {}]);
  const [bankData, setBankData] = useState<BankItem[]>([]);
  const [totalData, setTotalData] = useState<DataItem[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>("VB");

  // Veriler gelmediyse loading ekranını göster
  if (!bankaData || !giderTypeData)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  // Parametre verisini almak
  const expenseList = giderTypeData.content;
  const banksList = bankaData.content;

  // Banka verilerini güncelleme
  async function handleTotalData(bankDATAS: DataItem[]) {
    const summedList = sumByList(expenseList, bankDATAS);

    const newTotalObject: DataItem & { costing: number } = {
      ...Object.assign({}, ...summedList),
    };

    // "costing" değeri hesaplanıyor
    newTotalObject["costing"] = +Object.values(newTotalObject)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    setTotalData([newTotalObject]); // Total verisini güncelle
  }

  // Hesaplama işlemini yapma
  async function calculateHandle() {
    const newBankObject: DataItem & { costing: number; bank: string } =
      Object.assign({}, ...sumByList(expenseList, data));

    newBankObject["costing"] = +Object.values(newBankObject)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const bankName =
      banksList.find((item) => item.value === selectedBank)?.title ||
      "Unknown Bank"; // Seçili banka adı

    newBankObject["bank"] = bankName;

    const bankObject = bankData.find(
      (item) => item.bank === newBankObject.bank
    );

    if (!bankObject) {
      const newBankData = [newBankObject, ...bankData];
      setBankData(newBankData);
      handleTotalData(newBankData);
      setData(Array(8).fill({}));
    } else {
      const mergedObject = [
        ...Object.entries(newBankObject),
        ...Object.entries(bankObject),
      ].reduce(
        (acc, [key, val]) => ({ ...acc, [key]: (acc[key] || 0) + Number(val) }),
        {} as DataItem & { bank: string }
      );
      mergedObject["bank"] = bankName;

      const newBankData = bankData.filter((item) => item.bank !== bankName);
      newBankData.push(mergedObject);
      setBankData(newBankData);
      handleTotalData(newBankData);
      setData(Array(8).fill({}));
    }
  }

  return (
    <PageWrapper maxWidth="xl">
      <Grid container>
        <Grid>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <AltanSelect
              id="bank"
              defaultValue="VB"
              value={selectedBank}
              minWidth="20ch"
              onChange={setSelectedBank}
              data={banksList}
              dataTextAttr="title"
              dataValueAttr="value"
              label="Banka"
            />
            <Button
              variant="contained"
              onClick={calculateHandle}
              sx={{ minWidth: "15ch" }}
            >
              Ekle
            </Button>
          </Stack>
        </Grid>
        <Grid>
          <Box sx={{ p: 1 }}>
            {/* Burada BaseCalculateSheet, BanksCalculateSheets ve TotalCalculateSheets gibi bileşenler olmalı */}
          </Box>
        </Grid>
        <Grid>
          <Typography>Toplam</Typography>
          <Box sx={{ p: 1 }}>
            {/* Burada TotalCalculateSheets bileşeni olmalı */}
          </Box>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default CalcMain;
