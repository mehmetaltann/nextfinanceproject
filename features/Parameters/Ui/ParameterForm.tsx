import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../UI/formElements/FormTextField";
import { setSnackbar } from "../../../redux/slices/generalSlice";
import { useDispatch } from "react-redux";
import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useAddParameterContentMutation } from "../../../redux/apis/parameterApi";

const ParameterForm = ({ formName, addFunction }) => {
  const dispatch = useDispatch();
  const [addParameterContent] = useAddParameterContentMutation();

  async function submitHandler(values, { resetForm }) {
    const newRecord = {
      variant: formName,
      title: values.title,
      value: values.val,
    };
    try {
      const res = await addParameterContent(newRecord).unwrap();
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
    <Formik
      initialValues={{
        title: "",
        val: "",
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
              name="val"
              label="Değer"
              size="small"
            />
            <Button
              type="submit"
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
