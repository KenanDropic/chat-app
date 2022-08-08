import { styled } from "@mui/system";

export const FormPageWrapper = styled("div")({
  flex: 0.75,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh",
});

export const FormComponent = styled("form")({
  padding: "10px 15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
});

export const FormFooter = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
