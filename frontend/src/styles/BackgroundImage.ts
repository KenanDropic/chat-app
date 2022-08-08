import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/live-chat-app.png";

export const BgImage = styled("div")({
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center ",
  flex: 1.25,
});
