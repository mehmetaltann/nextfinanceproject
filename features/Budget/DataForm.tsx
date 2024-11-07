import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormSelect from "./UI/FormSelect";

import { useMemo, Fragment } from "react";
import { uniqListFunc } from "../../../utils/help-functions";
import { Form, Formik, FieldArray, Field } from "formik";
import { materialDateInput } from "../../../utils/help-functions";
import { useAddBudgetItemMutation } from "../../../redux/apis/budgetApi";
import { MenuItem, Button, IconButton, Box, Stack } from "@mui/material";

const DataForm = ({ openType, categories, closeModel }) => {

  const initialButceData = {
    title: "",
    date: materialDateInput,
    amount: 0,
    description: "",
    categoryB: "",
  };
  const initialButceDataMemo = useMemo(() => initialButceData, []);

  const submitHandler = async (values) => {
    let category_a = values.categoryA;
    const yeniKayitListesi = values.infos.map((info) => {
      return {
        title: info.title,
        amount: info.amount,
        type: openType,
        date: info.date,
        categoryA: category_a,
        categoryB: info.categoryB,
        description: info.description,
      };
    });
    try {
      const res = await addBudgetItem(yeniKayitListesi).unwrap();
      closeModel();
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
  };

  const validateSchema = Yup.object().shape({
    categoryA: Yup.string().required("Gerekli"),
    infos: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Boş Olamaz"),
        amount: Yup.number()
          .required("Gerekli")
          .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
        categoryB: Yup.string().required("Gerekli"),
      })
    ),
  });
  return (
    <Formik
      initialValues={{
        categoryA: "",
        infos: [initialButceDataMemo],
      }}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Stack spacing={3}>
            <Stack direction="row" spacing={1}>
              <Field
                name="categoryA"
                component={FormSelect}
                label="Kategori A"
                minW={200}
              >
                {uniqListFunc(
                  categories.filter((cat) => cat.type === openType),
                  "categoryA"
                ).map((catA, index) => (
                  <MenuItem value={catA.categoryA} key={index}>
                    {catA.categoryA}
                  </MenuItem>
                ))}
              </Field>
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{ borderRadius: "5%", minWidth: 150 }}
                variant="contained"
                color={openType === "Gelir" ? "success" : "error"}
                endIcon={<SendIcon />}
              >
                Ekle
              </Button>
            </Stack>

            <Box>
              <FieldArray name="infos">
                {({ push, remove }) => (
                  <Fragment>
                    {values.infos.map((i, index) => (
                      <Grid
                        container="true"
                        spacing={{ xs: 2, md: 1 }}
                        sx={{ mb: 1 }}
                        key={index}
                      >
                        <Grid>
                          <FormDatePicker
                            name={`infos.${index}.date`}
                            label="Tarih"
                            size="small"
                          />
                        </Grid>
                        <Grid>
                          {values.categoryA ? (
                            <Field
                              name={`infos.${index}.categoryB`}
                              component={FormSelect}
                              label="Kategori B"
                              name2={`infos.${index}.title`}
                              minW={150}
                            >
                              {categories
                                .filter((cat) => cat.type === openType)
                                .filter(
                                  (cat) => cat.categoryA === values.categoryA
                                )
                                .map((catA, index) => (
                                  <MenuItem value={catA.categoryB} key={index}>
                                    {catA.categoryB}
                                  </MenuItem>
                                ))}
                            </Field>
                          ) : (
                            <Field
                              name={`infos.${index}.categoryB`}
                              component={FormSelect}
                              label="Kategori B"
                              disabled
                              minW={150}
                            >
                              <MenuItem value="Seçiniz">"Seçiniz"</MenuItem>
                            </Field>
                          )}
                        </Grid>
                        <Grid>
                          <FormTextField
                            sx={{ maxWidth: 180 }}
                            name={`infos.${index}.title`}
                            label={`${openType} adı`}
                            size="small"
                          />
                        </Grid>
                        <Grid>
                          <FormTextField
                            sx={{ maxWidth: 120 }}
                            name={`infos.${index}.amount`}
                            label="Tutar"
                            type="number"
                            size="small"
                          />
                        </Grid>
                        <Grid>
                          <FormTextField
                            name={`infos.${index}.description`}
                            label="Açıklama"
                            multiline
                            type="text"
                            size="small"
                          />
                        </Grid>
                        <Grid>
                          <IconButton
                            aria-label="delete"
                            onClick={() => remove(index)}
                            size="small"
                            type="button"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <IconButton
                      onClick={() => push(initialButceDataMemo)}
                      variant="contained"
                      size="small"
                      type="button"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Fragment>
                )}
              </FieldArray>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default DataForm;
