import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 6),
    paddingLeft: `calc(1em+ ${theme.spacing(2)})`,
    width: "100%",
  },
}));

export default StyledInputBase;
