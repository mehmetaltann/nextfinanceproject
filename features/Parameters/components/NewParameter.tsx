import PageConnectionWait from "../UI/PageConnectionWait";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";
import {
  useGetParametersQuery,
  useAddParameterMutation,
  useDeleteParameterMutation,
} from "../../redux/apis/parameterApi";
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

const NewParameter = () => {
  const { data: parameters, isLoading, isFetching } = useGetParametersQuery();
  const [variant, setVariant] = useState("");
  const [deleteParameter] = useDeleteParameterMutation();
  const [addParameter] = useAddParameterMutation();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  async function handleSubmit() {
    const newRecord = { variant, content: [] };
    try {
      const res = await addParameter(newRecord).unwrap();
      dispatch(
        setSnackbar({
          children: res.message,
          severity: "success",
        })
      );
      setVariant("");
    } catch (error) {
      dispatch(
        setSnackbar({
          children: error,
          severity: "error",
        })
      );
    }
  }

  return (
    <Grid container sx={{ width: 800, mt: 2 }} spacing={2}>
      <Grid>
        {" "}
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
              {parameters.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.variant}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={async () => {
                        try {
                          const res = await deleteParameter(row.id).unwrap();
                          dispatch(
                            setSnackbar({
                              children: res.message,
                              severity: "success",
                            })
                          );
                        } catch (error) {
                          dispatch(
                            setSnackbar({
                              children: error,
                              severity: "error",
                            })
                          );
                        }
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

export default NewParameter;
