import ParameterMain from "./UI/ParameterMain";
import PageConnectionWait from "../UI/PageConnectionWait";
import { useSelector } from "react-redux";
import { useGetParametersQuery } from "../../redux/apis/parameterApi";
import { Box } from "@mui/material";

const OtherParameters = () => {
  const { data: parameters, isLoading, isFetching } = useGetParametersQuery();

  const { parameterType } = useSelector((state) => state.parameter);

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData = parameters.filter(
    (item) => item.variant === parameterType
  );

  return (
    <Box>
      {filteredData.map((item) => (
        <ParameterMain
          key={item.id}
          title1={`${item.variant} Ekle`}
          title2={`${item.variant} Listesi`}
          formName={item.variant}
          tableWidth={400}
          data={item}
        />
      ))}
    </Box>
  );
};

export default OtherParameters;
