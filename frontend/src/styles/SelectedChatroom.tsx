import { styled } from "@mui/system";

export const SelectedChatroomWrapper = styled("div")(({ theme }) => ({
  color: "#707070",
  height: "100vh",
  maxHeight: "100vh",
}));

export const ContentWrapper = styled("div")(({ theme }) => ({
  padding: "15px 35px",
  height: "84.5%",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column-reverse", // column
  scrollbarWidth: "thin",
  scrollbarColor: "lightgray darkgray",
}));

export const FooterWrapper = styled("footer")(({ theme }) => ({
  backgroundColor: "#dedede",
  margin: "0px -5px 0px 9px",
}));

export const HeaderWrapper = styled("header")(({ theme }) => ({
  padding: "5px 35px",
  display: "flex",
  justifyContent: "space-between",
}));
