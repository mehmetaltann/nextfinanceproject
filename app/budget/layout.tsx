import { BudgetContextProvider } from "@/utils/BudgetContext";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <BudgetContextProvider>{children}</BudgetContextProvider>;
};

export default Layout;
