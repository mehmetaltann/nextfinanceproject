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
