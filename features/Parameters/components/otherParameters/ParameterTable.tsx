import DeleteIcon from "@mui/icons-material/Delete";
import OnayBox from "@/components/Ui/OnayBox";
import { deleteParameterContent } from "@/app/actions/deleteData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { useState } from "react";
import { toast } from "react-toastify";
import { OnayBoxInf, Parameter } from "@/lib/types/types";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
} from "@mui/material";


interface ParameterTableProps {
  tableWidth: string;
  data: Parameter;
  formName: string;
}

const ParameterTable: React.FC<ParameterTableProps> = ({
  tableWidth,
  data,
  formName,
}) => {
  const [onayBoxInf, setOnayBoxInf] = useState<OnayBoxInf>({
    isOpen: false,
    content: "",
    onClickHandler: async () => {},
    functionData: {},
  });

  const deleteHandler = async ({ parameterId }: { parameterId: string }) => {
    try {
      const res = await deleteParameterContent(data.variant, parameterId);
      handleResponseMsg(res);
      setOnayBoxInf((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      toast.error("Ödeme Silinemedi, bir hata oluştu");
    }
  };

  return (
    <TableContainer component={Paper} sx={{ width: tableWidth }}>
      {onayBoxInf.isOpen && (
        <OnayBox onayBoxInf={onayBoxInf} setOnayBoxInf={setOnayBoxInf} />
      )}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>İsim</TableCell>
            <TableCell align="left">Değer</TableCell>
            <TableCell align="center">İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.value1}</TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    setOnayBoxInf({
                      isOpen: true,
                      content: "Ödeme silinsin mi?",
                      onClickHandler: () =>
                        deleteHandler({ parameterId: row._id }),
                      functionData: { parameterId: row._id },
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParameterTable;
