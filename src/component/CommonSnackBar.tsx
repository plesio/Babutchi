import { CommonSnackBarStatus } from "@/util/RecoilUtil";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";

export interface OpenSnackBarProps {
  text: string;
  open: boolean;
}

const CommonSnackBar: React.FC = () => {
  const [state, setState] = useRecoilState(CommonSnackBarStatus);

  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setState({ text: "", open: false });
    },
    []
  );

  return (
    <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {state.text}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackBar;
