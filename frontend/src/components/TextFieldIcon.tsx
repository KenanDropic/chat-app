import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { setShowPassword } from "../features/global/globalSlice";
import { useAppDispatch } from "../features/hooks/hooks";

interface Props {
  iconStart?: string;
  iconEnd?: string;
  props?: any;
}

const TextFieldIcon: React.FC<any> = ({ iconStart, iconEnd, ...props }) => {
  const dispatch = useAppDispatch();

  return (
    <TextField
      {...props}
      InputProps={{
        endAdornment: iconEnd ? (
          <InputAdornment
            position="end"
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(setShowPassword())}
          >
            {iconEnd}
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default TextFieldIcon;
