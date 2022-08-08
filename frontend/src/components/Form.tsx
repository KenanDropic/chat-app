import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormPageWrapper,
  FormComponent,
  FormFooter,
} from "../styles/FormWrapper";
import { Strong } from "../styles/Strong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextFieldIcon from "./TextFieldIcon";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { setStatus } from "../features/global/globalSlice";

interface Props {
  status: string;
}

const Form: React.FC<Props> = ({ status }) => {
  const dispatch = useAppDispatch();
  const { showPassword } = useAppSelector((state) => state.global);

  return (
    <FormPageWrapper>
      <FormComponent>
        <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
          Welcome
        </h1>
        <FormGroup>
          <FormControl>
            {status === "signup" && (
              <TextField
                size="small"
                margin="dense"
                label="Username"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                }}
              />
            )}

            <TextField
              size="small"
              margin="dense"
              label="Email"
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <TextFieldIcon
              size="small"
              margin="dense"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
              }}
              iconEnd={
                showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
            />
          </FormControl>
          <Button type="submit" variant="contained" sx={{ margin: "15px 0px" }}>
            {status === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </FormGroup>
        <FormFooter>
          {status === "signin" ? (
            <div style={{ fontFamily: "sans-serif", margin: "10px 0px" }}>
              <span>Don't have an account?</span>{" "}
              <Strong onClick={() => dispatch(setStatus())}>Sign Up</Strong>
            </div>
          ) : (
            <div style={{ fontFamily: "sans-serif", margin: "10px 0px" }}>
              <span>Already have an account?</span>{" "}
              <Strong onClick={() => dispatch(setStatus())}>Sign In</Strong>
            </div>
          )}
        </FormFooter>
      </FormComponent>
    </FormPageWrapper>
  );
};

export default Form;
