import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { User } from "../features/auth/interfaces/interfaces";
import { setShowModal } from "../features/global/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { setIsRoomCreated } from "../features/socket/socketSlice";
import { useLazyGetUsersQuery } from "../features/users/usersApiSlice";
import { setSearchword } from "../features/users/usersSlice";
import useDebounce from "../utilities/customHooks/useDebounce";
import { CreateRoomValues, RefrenceRoomProps } from "./interfaces/interfaces";
import Spinner from "./Spinner";

const CreateRoom: React.FC<RefrenceRoomProps> = ({ refrence }) => {
  const dispatch = useAppDispatch();
  const { searchKeyword, data } = useAppSelector((state) => state.users);
  const { user: USER } = useAppSelector((state) => state.auth);
  const { showModal } = useAppSelector((state) => state.global);

  const [getUsers, { isLoading }] = useLazyGetUsersQuery();
  const debounce = useDebounce(
    async () => await getUsers({ username: searchKeyword }),
    1000,
    [searchKeyword]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<CreateRoomValues>({});

  const handleInputChange = async (e: any): Promise<void> => {
    if (e.target.value.length > 2) {
      dispatch(setSearchword(e.target.value));
      debounce;
    }
  };

  const setValueOfUsers = <X, Y = (string | User)[]>(e: X, value: Y) => {
    setValue("users", value as unknown as User[]);
  };

  const onSubmit = (data: CreateRoomValues) => {
    try {
      const trimedObj = {
        ...data,
        users: data.users?.filter((e) => String(e).trim()),
      };
      refrence.current.emit("createRoom", trimedObj);
      toast.success(`${data.name} created successfully!`);
      reset();
      dispatch(setShowModal());
      dispatch(setIsRoomCreated(true));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => dispatch(setShowModal())}>
        Create Room
      </Button>
      <Dialog
        open={showModal}
        onClose={() => dispatch(setShowModal())}
        fullWidth
      >
        <DialogTitle textAlign="center">Create Chatroom</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormControl>
                <TextField
                  size="small"
                  margin="dense"
                  label="Name"
                  variant="outlined"
                  {...register("name", {
                    required: "Field is required",
                  })}
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />

                <TextField
                  size="small"
                  margin="dense"
                  label="Description"
                  variant="outlined"
                  {...register("description")}
                />

                <div
                  style={{ display: "flex", width: "100%", margin: "10px 0px" }}
                >
                  <Autocomplete
                    {...register("users")}
                    sx={{ flex: "1" }}
                    multiple
                    // get selected values
                    onChange={(e, value) => setValueOfUsers(e, value)}
                    // get e.target.value of input field
                    onInputChange={(e) => handleInputChange(e)}
                    freeSolo
                    disableClearable
                    options={
                      data?.map((user: User) =>
                        user.id !== USER?.id ? user : ""
                      ) as User[]
                    }
                    getOptionLabel={(option: User | string) => {
                      if ((option as User).username) {
                        return (option as User).username;
                      } else {
                        return "";
                      }
                    }}
                    // disable already selected options
                    getOptionDisabled={(option) => {
                      const values = getValues();
                      if (values.users !== undefined) {
                        if (values.users.length > 0) {
                          if (
                            values.users.some(
                              (user) =>
                                (user as User).username ===
                                (option as User).username
                            )
                          ) {
                            return true;
                          }
                        }
                      }
                      return false;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search by username..."
                        size="small"
                        error={!!errors?.users}
                        helperText={errors?.users ? errors.users.message : null}
                      />
                    )}
                  />
                </div>
              </FormControl>
            </FormGroup>
            <Button variant="outlined" type="submit">
              Create Room
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CreateRoom;
