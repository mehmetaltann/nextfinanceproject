import { BudgetItem } from "@/lib/types/types";

interface row {
  label: string;
  value: number;
  up: string;
  date: any;
}

interface transformData {
  label: string;
  value: number;
  alt: row[];
}

type Month = { value: number; label: string };

const monthsTranslate: Month[] = [
  { value: 1, label: "Ocak" },
  { value: 2, label: "Şubat" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Nisan" },
  { value: 5, label: "Mayıs" },
  { value: 6, label: "Haziran" },
  { value: 7, label: "Temmuz" },
  { value: 8, label: "Ağustos" },
  { value: 9, label: "Eylül" },
  { value: 10, label: "Ekim" },
  { value: 11, label: "Kasım" },
  { value: 12, label: "Aralık" },
];

export function transformData(data: BudgetItem[]) {
  const catBlist = Object.values(
    data.reduce((agg: { [key: string]: row }, item) => {
      if (!agg[item.categoryB]) {
        agg[item.categoryB] = {
          label: item.categoryB,
          value: 0,
          up: item.categoryA,
          date: item.date,
        };
      }
      agg[item.categoryB].value += Number(item.amount);
      return agg;
    }, {})
  );

  const catAlist = Object.values(
    data.reduce((agg: { [key: string]: transformData }, item) => {
      if (!agg[item.categoryA]) {
        agg[item.categoryA] = { label: item.categoryA, value: 0, alt: [] };
      }
      agg[item.categoryA].value += Number(item.amount);
      return agg;
    }, {})
  );

  catAlist.forEach((itemA) => {
    catBlist.forEach((itemB) => {
      if (itemA.label === itemB.up) {
        itemA.alt.push(itemB);
      }
    });
  });

  return { catAlist, catBlist };
}

export const handleYearMonthLists = (months: number[], years: number[]) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const combined = years.flatMap((year) =>
    months
      .map((month) => monthsTranslate.find((m) => m.value === month)?.label)
      .filter(Boolean)
      .map((monthLabel) => ({
        year,
        month: months[0],
        label: `${monthLabel}-${year}`,
      }))
  );

  const sortedItems = combined
    .sort((a, b) => (a.year === b.year ? a.month - b.month : a.year - b.year))
    .map((item) => item.label);

  const currentYearMonth = `${
    monthsTranslate[currentMonth - 1].label
  }-${currentYear}`;
  return {
    sortedItems: sortedItems.filter((item) => item !== currentYearMonth),
  };
};

const parseYearMonth = (date: any) => {
  const d = new Date(date);
  return `${d.toLocaleString("default", { month: "long" })}-${d.getFullYear()}`;
};

export function filterAndSumDataByMonth(
  data: BudgetItem[],
  selectedType: string,
  selectedCategoryA: string,
  selectedCategoryB: string,
  selectedYearMonths: string[]
) {
  const filteredData = data.filter((item) => {
    const matchesType = selectedType === "Tümü" || item.type === selectedType;
    const matchesCategoryA =
      selectedCategoryA === "Tümü" || item.categoryA === selectedCategoryA;
    const matchesCategoryB =
      selectedCategoryB === "Tümü" || item.categoryB === selectedCategoryB;
    return matchesType && matchesCategoryA && matchesCategoryB;
  });

  return selectedYearMonths.map((yearMonth) => {
    const monthData = filteredData.filter(
      (item) => parseYearMonth(item.date) === yearMonth
    );
    return monthData.reduce((total, item) => total + item.amount, 0);
  });
}
