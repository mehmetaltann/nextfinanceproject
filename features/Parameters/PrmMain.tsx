"use client";
import AddIcon from "@mui/icons-material/Add";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import PortfolioParameters from "./components/PortfolioParameters";
import CategoryParameters from "./components/CategoryParameters";
import OtherParams from "./components/otherParameters/OtherParams";
import NewParameter from "./components/NewParameter";
import { useEffect, useState } from "react";
import { fetchParameters } from "@/app/actions/fetchData";
import { Parameter } from "@/lib/types/types";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";


const PrmMain = () => {
  const [parameters, setParameters] = useState<Parameter[] | null>(null);
  const [filteredData, setFilteredData] = useState<Parameter | undefined>(
    undefined
  );
  const [parameterType, setParameterType] = useState<string>("Portfolio");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: Parameter[] = await fetchParameters();
        setParameters(response);
        const filteredData = response.find(
          (item) => item.variant === parameterType
        );

        setFilteredData(filteredData);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [parameterType]);

  if (loading) {
    return <PageConnectionWait title="Veriler Bekleniyor" />;
  }

  if (!parameters || parameters.length === 0) {
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;
  }

  return (
    <PageWrapper maxW="lg">
      <Stack
        direction={{ xs: "column" }}
        justifyContent={"center"}
        alignItems={{ sm: "center" }}
        spacing={4}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6">Parametreler</Typography>
        <ToggleButtonGroup
          value={parameterType}
          exclusive
          onChange={(e, newValue) => {
            if (newValue !== null) setParameterType(newValue);
          }}
          aria-label="Platform"
          sx={{ display: "flex", spacing: 4 }}
        >
          {parameters &&
            parameters.map((item) => (
              <ToggleButton
                key={item.variant}
                color="secondary"
                value={item.variant}
                sx={{ minWidth: "12ch", p: 2 }}
                size="small"
              >
                {item.variant}
              </ToggleButton>
            ))}

          <ToggleButton
            color="secondary"
            value="newParam"
            sx={{ minWidth: "12ch", p: 2 }}
            size="small"
          >
            <AddIcon fontSize="small" />
            Yeni
          </ToggleButton>
        </ToggleButtonGroup>

        {parameterType === "Portfolio" && filteredData && (
          <PortfolioParameters
            data={filteredData}
            setParameterType={setParameterType}
          />
        )}
        {parameterType === "Bütçe Kategori" && filteredData && (
          <CategoryParameters
            data={filteredData}
            setParameterType={setParameterType}
          />
        )}
        {parameterType !== "Portfolio" &&
          parameterType !== "Bütçe Kategori" &&
          parameterType !== "newParam" &&
          filteredData && <OtherParams data={filteredData} />}

        {parameterType === "newParam" && <NewParameter data={parameters} />}
      </Stack>
    </PageWrapper>
  );
};

export default PrmMain;
