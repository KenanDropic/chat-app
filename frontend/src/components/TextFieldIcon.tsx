import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { setShowPassword } from "../features/global/globalSlice";
import { useAppDispatch } from "../features/hooks/hooks";

interface Props {
  iconStart?: string;
  iconEnd?: JSX.Element;
  props?: {};
}

const TextFieldIcon = React.forwardRef((props: any, ref) => {
  const dispatch = useAppDispatch();
  // console.log("PROPS", props, "\n", "REF", ref, "\n");

  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment: props?.iconstart ? (
          <InputAdornment position="start" sx={{ cursor: "pointer" }}>
            {props?.iconstart}
          </InputAdornment>
        ) : null,
        endAdornment: props?.iconend ? (
          <InputAdornment
            position="end"
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(setShowPassword())}
          >
            {props?.iconend}
          </InputAdornment>
        ) : null,
      }}
      ref={ref}
    />
  );
});

export default TextFieldIcon;
