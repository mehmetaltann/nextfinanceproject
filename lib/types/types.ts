export type BudgetItem = {
  title: string;
  amount: number;
  type: string;
  date: Date;
  categoryA: string;
  categoryB: string;
  description: string;
};

export type Parameter = {
  variant: string;
  content: { _id: string; title: string; value1: string; value2: string }[];
};

export type ParameterWithoutId = {
  variant: string;
  content: { _id: string; title: string; value1: string; value2: string }[];
};
