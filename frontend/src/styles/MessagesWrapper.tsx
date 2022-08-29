import styled from "@emotion/styled";

export const MessagesWrapper = styled("div")(({ theme }) => ({
  zIndex: "10",
  color: "#707070",
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
}));

export const MessageWrapper = styled("div")(({ theme }) => ({
  margin: "5px",
  display: "flex",
  flexDirection: "column",
}));

export const MessageSpanWrapper = styled("span")(({ theme }) => ({
  whiteSpace: "nowrap",
  padding: "7px 10px",
  borderRadius: "10px",
  width: "fit-content",
}));
