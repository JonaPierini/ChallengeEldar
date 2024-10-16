import { CircularProgress, Box } from "@mui/material";

export const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};
