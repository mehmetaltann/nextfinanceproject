import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import OnayBox from "@/components/Ui/OnayBox";
import FormTextField from "@/components/Ui/FormTextField";
import { Form, Formik, FormikHelpers } from "formik";
import { OnayBoxInf, Parameter } from "@/lib/types/types";
import { deleteParameterContent } from "@/app/actions/deleteData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { addParameterContent } from "@/app/actions/insertData";
import { useState } from "react";
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
  IconButton,
} from "@mui/material";

interface NewRecord {
  value1: string;
  title: string;
  value2: string;
}

const PortfolioParameters = ({
  data,
  setParameterType,
}: {
  data: Parameter;
  setParameterType: (data: any) => void;
}) => {
  const [onayBoxInf, setOnayBoxInf] = useState<OnayBoxInf>({
    isOpen: false,
    content: "",
    onClickHandler: async () => {},
    functionData: {},
  });

  if (!data) return <PageConnectionWait title="Veriler Bekleniyor" />;

  const submitHandler = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    const newRecord: NewRecord = {
      value1: values.value1,
      title: values.title,
      value2: "",
    };

    try {
      const response = await addParameterContent(data.variant, newRecord);
      handleResponseMsg(response);
      resetForm();
      setParameterType(data.variant);
    } catch (error) {
      toast.error("İşletme eklenemedi, bir hata oluştu");
    }
  };

  const deleteHandler = async ({ parameterId }: { parameterId: string }) => {
    try {
      const res = await deleteParameterContent(data.variant, parameterId);
      handleResponseMsg(res);
      setOnayBoxInf((prev) => ({ ...prev, isOpen: false }));
      setParameterType(data.variant);
    } catch (error) {
      toast.error("Parametre Silinemedi, bir hata oluştu");
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {onayBoxInf.isOpen && (
        <OnayBox onayBoxInf={onayBoxInf} setOnayBoxInf={setOnayBoxInf} />
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle1" textAlign="center" sx={{ p: 1, mb: 1 }}>
          Portföy Ekle
        </Typography>
        <Paper>
          <Formik
            initialValues={{
              value1: "",
              title: "",
            }}
            onSubmit={submitHandler}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Stack spacing={3} sx={{ p: 2 }}>
                  <FormTextField name="value1" label="Kod" size="small" />
                  <FormTextField name="title" label="İsim" size="small" />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ borderRadius: "5%", minWidth: 120 }}
                    size="large"
                    variant="contained"
                    color="success"
                    endIcon={<SendIcon />}
                  >
                    Ekle
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography textAlign="center" variant="subtitle1" sx={{ p: 1, mb: 1 }}>
          Portföy Listesi
        </Typography>
        <TableContainer component={Paper} sx={{ width: 400 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Kod</TableCell>
                <TableCell align="left">İsim</TableCell>
                <TableCell align="center">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.content.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.value1}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
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
      </Grid>
    </Grid>
  );
};

export default PortfolioParameters;
