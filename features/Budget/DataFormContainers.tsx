import AddCircleIcon from "@mui/icons-material/AddCircle";
import DataForm from "./DataForm";
import { useState } from "react";
import { Typography, Modal, Button, Box, Stack, Divider } from "@mui/material";
import { Parameter } from "@/lib/types/types";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  width: { xs: "100%", sm: "90%" },
  maxHeight: "90vh",
  maxWidth: "980px",
  overflowY: "auto",
};

interface DataFormContainersProps {
  categoriesData: Parameter | undefined;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OpenState {
  state: boolean;
  type: "Gelir" | "Gider";
}

const DataFormContainers = ({
  categoriesData,
  setUpdate,
}: DataFormContainersProps) => {
  const [open, setOpen] = useState<OpenState>({ state: false, type: "Gelir" });
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
              categories={categoriesData}
              closeModel={handleClose}
              setUpdate={setUpdate}
            />
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default DataFormContainers;
