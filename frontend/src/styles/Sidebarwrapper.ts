import styled from "@emotion/styled";

export const FlexDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const BottomContent = styled("div")(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "center",
  padding: "0px",
  margin: "0px",
}));
