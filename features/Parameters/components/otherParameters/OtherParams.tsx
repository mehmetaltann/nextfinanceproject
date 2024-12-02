import ParameterForm from "./ParameterForm";
import ParameterTable from "./ParameterTable";
import Grid from "@mui/material/Grid2";
import { Paper, Typography } from "@mui/material";
import { Parameter } from "@/lib/types/types";

interface OtherParamsProps {
  data: Parameter;
}

const OtherParams = ({ data }: OtherParamsProps) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid>
        <Typography variant="subtitle1" textAlign="center" sx={{ p: 1, mb: 1 }}>
          {`${data.variant} Ekle`}
        </Typography>
        <Paper>
          <ParameterForm data={data} />
        </Paper>
      </Grid>
      <Grid>
        <Typography variant="subtitle1" textAlign="center" sx={{ p: 1, mb: 1 }}>
          {`${data.variant} Listesi`}
        </Typography>
        <Paper>
          <ParameterTable tableWidth={"400"} data={data} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OtherParams;
