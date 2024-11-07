import { CalcContextProvider } from "@/utils/CalcContext";
import { ReactNode } from "react";
import "react-datasheet-grid/dist/style.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <CalcContextProvider>{children}</CalcContextProvider>;
};

export default Layout;
