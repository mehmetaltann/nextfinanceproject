import PageConnectionWait from "../UI/PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FormTextField from "../UI/formElements/FormTextField";
import FormikFormSelect from "../../components/investments/form/UI/FormikFormSelect";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/apis/categoryApi.js";
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
  MenuItem,
} from "@mui/material";

const CategoryParameters = () => {
  const { data: categories, isLoading, isFetching } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!categories)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  async function submitHandler(values, { resetForm }) {
    const newRecord = {
      type: values.type,
      categoryA: values.categoryA,
      categoryB: values.categoryB,
    };
    try {
      const res = await addCategory(newRecord).unwrap();
      resetForm();
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
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid>
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          sx={{ p: 1, mb: 1 }}
        >
          Kategori Ekle
        </Typography>
        <Paper>
          <Formik
            initialValues={{
              type: "",
              categoryA: "",
              categoryB: "",
            }}
            onSubmit={submitHandler}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Stack spacing={3} sx={{ p: 2 }}>
                  <Field
                    name="type"
                    component={FormikFormSelect}
                    label="Tip"
                    minW={150}
                  >
                    <MenuItem value="Gelir">Gelir</MenuItem>
                    <MenuItem value="Gider">Gider</MenuItem>
                  </Field>
                  <FormTextField
                    sx={{ maxWidth: 250 }}
                    name="categoryA"
                    label="Kategori A"
                    size="small"
                  />
                  <FormTextField
                    sx={{ maxWidth: 250 }}
                    name="categoryB"
                    label="Kategori B"
                    size="small"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ borderRadius: "5%", minWidth: 120 }}
                    size="large"
                    variant="contained"
                    color={"success"}
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
      <Grid>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{ p: 1, mb: 1 }}
        >
          Kategori Listesi
        </Typography>
        <TableContainer component={Paper} sx={{ width: 600 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Tip</TableCell>
                <TableCell align="left">Kategori A</TableCell>
                <TableCell align="left">Kategori B</TableCell>
                <TableCell align="center">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="left">{row.categoryA}</TableCell>
                  <TableCell align="left">{row.categoryB}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={async () => {
                        try {
                          const res = await deleteCategory(row.id).unwrap();
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

export default CategoryParameters;
