import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormSelect from "./UI/FormSelect";
import FormTextField from "@/components/FormElements/FormTextField";
import FormDatePicker from "@/components/FormElements/FormDatePicker";
import { useMemo, Fragment } from "react";
import { Form, Formik, FieldArray, Field } from "formik";
import { MenuItem, Button, IconButton, Box, Stack } from "@mui/material";
import { todayDateInput, uniqListFunc } from "@/utils/helpers";
import { BudgetItemWithoutId, Parameter } from "@/lib/types/types";
import { addBudgetItems } from "@/app/actions/insertData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";

interface DataFormProps {
  categories: Parameter | undefined;
  openType: string;
  closeModel: () => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BudgetInfo {
  title: string;
  date: string;
  amount: number;
  description: string;
  categoryB: string;
}

interface FormValues {
  categoryA: string;
  infos: BudgetInfo[];
}

const initialButceData: BudgetInfo = {
  title: "",
  date: todayDateInput,
  amount: 0,
  description: "",
  categoryB: "",
};

const DataForm = ({
  openType,
  categories,
  closeModel,
  setUpdate,
}: DataFormProps) => {
  const initialButceDataMemo = useMemo(() => initialButceData, []);

  const submitHandler = async (values: FormValues) => {
    const category_a = values.categoryA;
    const yeniKayitListesi: BudgetItemWithoutId[] = values.infos.map(
      (info) => ({
        title: info.title,
        amount: info.amount,
        type: openType,
        date: info.date,
        categoryA: category_a,
        categoryB: info.categoryB,
        description: info.description,
      })
    );

    try {
      const res = await addBudgetItems(yeniKayitListesi);
      handleResponseMsg(res);
      closeModel();
      setUpdate(true);
    } catch (error) {
      toast.error("Bütçe Kalemi Eklenemedi, Bir hata oluştu: " + error);
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
    <Formik<FormValues>
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
                  categories?.content.filter(
                    ({ title }) => title === openType
                  ) || [],
                  "value1"
                ).map(({ _id, value1 }) => (
                  <MenuItem value={value1} key={_id}>
                    {value1}
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
                    {values.infos.map((_, index) => (
                      <Grid
                        container
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
                              {categories?.content
                                .filter(({ title }) => title === openType)
                                .filter(
                                  ({ value1 }) => value1 === values.categoryA
                                )
                                .map(({ _id, value2 }) => (
                                  <MenuItem value={value2} key={_id}>
                                    {value2}
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
                              <MenuItem value="">Seçiniz</MenuItem>
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
