import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

type FormTextFieldProps = TextFieldProps & {
  name: string;
};

const FormTextField = ({ name, ...otherProps }: FormTextFieldProps) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    error: Boolean(meta && meta.touched && meta.error),
    helperText: meta && meta.touched && meta.error ? meta.error : undefined,
  };

  return <TextField {...configTextField} />;
};

export default FormTextField;
