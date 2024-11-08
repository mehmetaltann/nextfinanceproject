import { useField } from "formik";
import { TextField } from "@mui/material";

const FormDatePicker = ({ name, ...otherProps }) => {
  const [field] = useField(name);

  const configTextField = {
    type: "date",
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...otherProps,
  };

  return <TextField {...configTextField}/>;
};

export default FormDatePicker;
