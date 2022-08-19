import { styled } from "@mui/system";

export const ChatroomsWrapper = styled("div")(({ theme }) => ({
  color: "#707070",
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  h3: {
    textAlign: "center",
  },

  ul: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
  },

  nav: {
    textAlign: "center",
  },
}));
