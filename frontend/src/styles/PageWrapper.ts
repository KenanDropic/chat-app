import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const PageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  backgroundColor: "#005fff1a",

  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

export const CustomTextField = styled(TextField)({
  "&.Mui-focused fieldset": {
    outline: "none",
  },
});

//#005fff
