import moment from "moment";

const DEFAULT_DATE_FORMAT = "DD.MM.YYYY";

export const dateFormat = (
  date: string | undefined,
  format: string = DEFAULT_DATE_FORMAT
): string => {
  const momentDate = moment(date);

  if (!momentDate.isValid()) {
    return "Invalid Date";
  }

  return momentDate.format(format);
};

export const dateFormatNormal = (date: string): string => {
  const momentDate = moment(date);

  if (!momentDate.isValid()) {
    return "Invalid Date";
  }

  return momentDate.format();
};



const dateNow = new Date();
const year = dateNow.getFullYear();
const month = (dateNow.getUTCMonth() + 1).toString().padStart(2, "0");
const date = dateNow.getUTCDate().toString().padStart(2, "0");

export const todayDateInput = `${year}-${month}-${date}`; // Formatted date string

export const getChangedValues = <T extends Record<string, any>>(
  values: T,
  initialValues: T
): Partial<T> => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (
      initialValues[key] !== value &&
      initialValues[key] !== "projeler" &&
      initialValues[key] !== "odemeler"
    ) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

export const uniqListFunc = <T extends Record<string, any>>(
  arr: T[],
  att: keyof T,
  track: Set<any> = new Set()
): T[] =>
  arr.filter((cat) => (track.has(cat[att]) ? false : track.add(cat[att])));

export const prevThreeYearFirstDay = moment()
  .subtract(36, "months")
  .startOf("month")
  .toDate();
export const prevYearFirstDay = moment()
  .subtract(12, "months")
  .startOf("month")
  .toDate();
export const prevSixMonthFirstDay = moment()
  .subtract(6, "months")
  .startOf("month")
  .toDate();
export const prevThreeMonthFirstDay = moment()
  .subtract(3, "months")
  .startOf("month")
  .toDate();
export const prevMonthLastDay = moment()
  .subtract(1, "months")
  .endOf("month")
  .toDate();
export const thisMonthFirstDay = moment().startOf("month").toDate();
export const thisMonthLastDay = moment().endOf("month").toDate();
export const birthday = new Date("1987-09-09T07:45:00Z");

export const generateArrayOfYears = () => {
  const thisYear = new Date().getFullYear(); // Get the current year
  const max = thisYear;
  const fark = thisYear - 2013;
  const min = max - fark;
  const years: number[] = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }

  return years;
};

export const today = moment();
export const thisDay = moment().format("DD");
export const thisMonth = moment().month() + 1;
export const thisYear = moment().year();