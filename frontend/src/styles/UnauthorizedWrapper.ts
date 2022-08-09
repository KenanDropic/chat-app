import { styled } from "@mui/system";

export const UnauthorizedWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#005fff1a",
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const InnerWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "250px",
  width: "300px",
  position: "relative",
}));

export const MessageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));
