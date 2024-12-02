"use client";
import Grid from "@mui/material/Grid2";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import BaseCalculateSheet from "./components/BaseCalculateSheet";
import BanksCalculateSheets from "./components/BanksCalculateSheets";
import TotalCalculateSheets from "./components/TotalCalculateSheets";
import AltanSelect from "@/components/Ui/AltanSelect";
import { useContext } from "react";
import { CalcContext } from "@/utils/CalcContext";
import { Box, Button, Stack, Typography } from "@mui/material";

interface ContentItem {
  _id: string;
  title: string;
  value1: string;
  value2: string;
}

interface TotalDataItem {
  [key: string]: number;
}

interface Parameter {
  _id: string;
  variant: string;
  content: ContentItem[];
}

interface BankData {
  bank: string;
  costing: number;
  [key: string]: any;
}

interface CalcMainProps {
  allParameters: Parameter[];
}

function sumByList(attrList: ContentItem[], dataList: any): TotalDataItem[] {
  let totalList = attrList.map((item) => ({
    value1: item.value1,
    total: 0,
  }));

  dataList.forEach((item: any) => {
    for (let keyItem in item) {
      totalList.forEach((element, index) => {
        if (element.value1 === keyItem) {
          totalList[index].total += item[keyItem] as number;
        }
      });
    }
  });

  return totalList.map((item) => ({ [item.value1]: item.total }));
}

const CalcMain = ({ allParameters: parameterData }: CalcMainProps) => {
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error("CalcContext must be used within a CalcContextProvider");
  }

  const {
    selectedBank,
    setSelectedBank,
    data,
    bankData,
    setBankData,
    setData,
    setTotalData,
  } = context;

  if (!parameterData)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const expenseList: any = parameterData.find(
    (item) => item.variant === "Gider Türleri"
  );
  const banksList: any = parameterData.find((item) => item.variant === "Banka");

  if (!expenseList || !banksList || !banksList.content) {
    return <PageConnectionWait title="Veriler Yüklenemedi" />;
  }

  async function handleTotalData(bankDATAS: TotalDataItem[]): Promise<void> {
    const newTotalObject = Object.assign(
      {},
      ...sumByList(expenseList.content, bankDATAS)
    );
    newTotalObject["costing"] = +(Object.values(newTotalObject) as number[])
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    setTotalData([newTotalObject]);
  }

  async function calculateHandle(): Promise<void> {
    const newBankObject: any = Object.assign(
      {},
      ...sumByList(expenseList.content, data)
    );
    newBankObject["costing"] = +(Object.values(newBankObject) as number[])
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const bankName: string = banksList.content.filter(
      (item: any) => item.value1 === selectedBank
    )[0]?.title;

    newBankObject["bank"] = bankName;

    const bankObject = bankData
      .filter((item) => item.bank === newBankObject.bank)
      .shift();

    if (!bankObject) {
      const newBankData = [newBankObject, ...bankData];
      setBankData(newBankData);
      handleTotalData(newBankData);
      setData([{}, {}, {}, {}, {}, {}, {}, {}]);
    } else {
      const mergedObject = [
        ...Object.entries(newBankObject),
        ...Object.entries(bankObject),
      ].reduce(
        (acc, [key, val]) => ({ ...acc, [key]: (acc[key] || 0) + val }),
        {} as BankData
      );
      mergedObject["bank"] = bankName;

      const newBankData: BankData[] = bankData.filter(
        (item) => item.bank !== bankName
      );

      newBankData.push(mergedObject);
      setBankData(newBankData);
      handleTotalData(newBankData);
      setData([{}, {}, {}, {}, {}, {}, {}, {}]);
    }
  }
  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AltanSelect
            id="bank"
            defaultValue="VB"
            value={selectedBank}
            minWidth="20ch"
            onChange={setSelectedBank}
            data={banksList.content}
            dataTextAttr="title"
            dataValueAttr="value1"
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
      <Grid size={{ xs: 12 }}>
        <Box sx={{ p: 1 }}>
          <BaseCalculateSheet expenseList={expenseList} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ p: 1 }}>
          <BanksCalculateSheets expenseList={expenseList} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography>Toplam</Typography>
        <Box sx={{ p: 1 }}>
          <TotalCalculateSheets expenseList={expenseList} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CalcMain;
