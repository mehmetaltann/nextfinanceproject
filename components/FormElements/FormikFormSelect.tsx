import { TextField } from "@mui/material";
import { FieldProps, FormikProps } from "formik";

interface FormikFormSelectProps {
  children: React.ReactNode;
  minW: string | number;
  label: string;
  form: FormikProps<any>;
  field: FieldProps<any>["field"];
}

const FormikFormSelect = ({
  children,
  minW,
  label,
  form,
  field,
}: FormikFormSelectProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      sx={{ minWidth: minW }}
      name={name}
      size="small"
    >
      {children}
    </TextField>
  );
};

export default FormikFormSelect;
