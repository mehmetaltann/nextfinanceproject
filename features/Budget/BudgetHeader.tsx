"use client"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PageConnectionWait from "@/components/Ui/PageConnectionWait";
import DataForm from "./DataForm";
import { useState } from "react";
import { Typography, Modal, Button, Box, Stack, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  height: "70%",
  width: { xs: "90%", lg: "70%" },
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const BudgetHeader = () => {
  const [open, setOpen] = useState({ state: false, type: "Gelir" });
  const handleGelirOpen = () => setOpen({ state: true, type: "Gelir" });
  const handleGiderOpen = () => setOpen({ state: true, type: "Gider" });
  const handleClose = () => setOpen({ state: false, type: "Gelir" });

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"center"}
      spacing={1}
    >
      <Button
        type="button"
        onClick={handleGelirOpen}
        variant="outlined"
        color="success"
        size="large"
        startIcon={<AddCircleIcon />}
      >
        Gelir Ekle
      </Button>
      <Button
        startIcon={<AddCircleIcon />}
        type="button"
        onClick={handleGiderOpen}
        variant="outlined"
        color="error"
        size="large"
      >
        Gider Ekle
      </Button>
      <Modal
        open={open.state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography variant="h5">Yeni {open.type}</Typography>
            <Divider />
            <DataForm
              openType={open.type}
              categories={categories}
              closeModel={handleClose}
            />
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default BudgetHeader;
