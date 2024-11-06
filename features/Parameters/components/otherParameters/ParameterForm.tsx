import SendIcon from "@mui/icons-material/Send";
import FormTextField from "@/components/Ui/FormTextField";
import { Button, Stack } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { addParameterContent } from "@/app/actions/insertData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { Parameter } from "@/lib/types/types";

interface NewRecord {
  value1: string;
  title: string;
  value2: string;
}

const ParameterForm = ({ data }: { data: Parameter }) => {
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
    } catch (error) {
      toast.error("İşletme eklenemedi, bir hata oluştu");
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        value1: "",
      }}
      onSubmit={submitHandler}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Stack spacing={3} sx={{ p: 2 }}>
            <FormTextField
              sx={{ maxWidth: 250 }}
              name="title"
              label="İsim"
              size="small"
            />
            <FormTextField
              sx={{ maxWidth: 250 }}
              name="value1"
              label="Değer"
              size="small"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              size="large"
              sx={{ borderRadius: "5%", minWidth: 120 }}
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
  );
};

export default ParameterForm;
