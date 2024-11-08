export type BudgetItem = {
  id: string;
  title: string;
  amount: number;
  type: string;
  date: string;
  categoryA: string;
  categoryB: string;
  description: string;
};

export type BudgetItemWithoutId = {
  title: string;
  amount: number;
  type: string;
  date: string;
  categoryA: string;
  categoryB: string;
  description: string;
};

export type Parameter = {
  type: string;
  _id: string;
  variant: string;
  content: { _id: string; title: string; value1: string; value2: string }[];
};

export type ParameterWithoutId = {
  variant: string;
  content: { _id: string; title: string; value1: string; value2: string }[];
};

export interface OnayBoxInf {
  isOpen: boolean;
  content: string;
  onClickHandler: (data: { parameterId: string }) => Promise<void>;
  functionData: {
    parameterId?: string;
  };
}
