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
import { FormProps, FormValues } from "./interfaces/interfaces";

const Form: React.FC<FormProps> = ({ status }) => {
  const dispatch = useAppDispatch();
  const { showPassword } = useAppSelector((state) => state.global);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormPageWrapper>
      <FormComponent onSubmit={handleSubmit(onSubmit)}>
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
                {...register("username", {
                  required: "Field is required",
                  minLength: {
                    value: 3,
                    message: "Username must have at least 3 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Username cannot be longer than 12 characters",
                  },
                })}
                error={!!errors?.username}
                helperText={errors?.username ? errors.username.message : null}
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
              {...register("email", {
                required: "Field is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
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
              iconend={
                showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
              {...register("password", {
                required: "Field is required",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  message:
                    "Password must contain at least 6 characters,uppercase and lowercase letter,special character and one number",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
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
