import { useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type FormDatePickerProps = TextFieldProps & {
  name: string;
};

const FormDatePicker = ({ name, ...otherProps }: FormDatePickerProps) => {
  const [field] = useField(name);

  const configTextField: TextFieldProps = {
    type: "date",
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...otherProps,
  };

  return <TextField {...configTextField} />;
};

export default FormDatePicker;
