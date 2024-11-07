import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import OnayBox from "@/components/Ui/OnayBox";
import { useState } from "react";
import { OnayBoxInf, Parameter, ParameterWithoutId } from "@/lib/types/types";
import { addParameter } from "@/app/actions/insertData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { deleteParameter } from "@/app/actions/deleteData";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Stack,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

const NewParameter = ({ data }: { data: Parameter[] }) => {
  const [variant, setVariant] = useState("");
  const [onayBoxInf, setOnayBoxInf] = useState<OnayBoxInf>({
    isOpen: false,
    content: "",
    onClickHandler: async () => {},
    functionData: {},
  });

  const handleSubmit = async () => {
    const newRecord: ParameterWithoutId = {
      variant,
      content: [],
    };

    try {
      const response = await addParameter(newRecord);
      handleResponseMsg(response);
    } catch (error) {
      toast.error("İşletme eklenemedi, bir hata oluştu");
    }
  };

  const deleteHandler = async ({ parameterId }: { parameterId: string }) => {
    try {
      const res = await deleteParameter(parameterId);
      handleResponseMsg(res);
      setOnayBoxInf((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      toast.error("Parametre Silinemedi, bir hata oluştu");
    }
  };

  return (
    <Grid container spacing={2}>
      {onayBoxInf.isOpen && (
        <OnayBox onayBoxInf={onayBoxInf} setOnayBoxInf={setOnayBoxInf} />
      )}
      <Grid>
        <Stack spacing={2}>
          <Typography>Yeni Parametre</Typography>
          <TextField
            sx={{ minWidth: 120, maxWidth: 200 }}
            size="small"
            label="İsim"
            onChange={(e) => setVariant(e.target.value)}
          />
          <Button
            type="submit"
            sx={{ borderRadius: "5%", minWidth: 120, maxWidth: 200 }}
            variant="contained"
            color={"success"}
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Ekle
          </Button>
        </Stack>
      </Grid>
      <Grid>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{ p: 1, mb: 1 }}
        >
          Portföy Listesi
        </Typography>
        <TableContainer component={Paper} sx={{ width: 400 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">İsim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.variant}</TableCell>
                  <TableCell align="center">
                    {!row.content ||
                      (row.content.length === 0 && (
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
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default NewParameter;
