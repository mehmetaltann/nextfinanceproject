import { CircularProgress, Box, Typography } from "@mui/material";
import React from "react";

interface PageConnectionWaitProps {
  title: string;
}

const PageConnectionWait: React.FC<PageConnectionWaitProps> = React.memo(
  ({ title }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography>{title}</Typography>
      </Box>
    );
  }
);

export default PageConnectionWait;
