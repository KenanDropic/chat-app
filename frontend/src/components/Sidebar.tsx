import React, { ChangeEvent } from "react";
import { setShowSidebar } from "../features/global/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { RefrenceRoomProps } from "./interfaces/interfaces";
import Chatrooms from "./Chatrooms";
import TextFieldIcon from "./TextFieldIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import SelectedChatroom from "./SelectedChatroom";
import useDebounce from "../utilities/customHooks/useDebounce";
import { setRoomname } from "../features/socket/socketSlice";

const Sidebar: React.FC<RefrenceRoomProps> = ({ refrence, data }) => {
  const navigate: NavigateFunction = useNavigate();

  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.global);
  const { currentRoom } = useAppSelector((state) => state.socket);

  const [logout, { isLoading: logoutLoading, isSuccess }] = useLogoutMutation();

  const handleLogoutClick = async () => {
    await logout();
    navigate("/");
  };

  const handleChange = (e: ChangeEvent) => {
    if ((e.target as HTMLInputElement).value.length > 2) {
      dispatch(setRoomname((e.target as HTMLInputElement).value));
    }

    // after input is cleared,reset roomname to empty string
    if ((e.target as HTMLInputElement).value.length == 0) {
      dispatch(setRoomname(""));
    }
  };

  return logoutLoading ? (
    <Spinner />
  ) : (
    <div>
      <nav className={showSidebar ? "sidebar" : "sidebar close"}>
        <header>
          <div className="text logo-text">
            <span className="name">Chat App</span>
          </div>

          <ChevronRightIcon
            className="toggle"
            onClick={() => dispatch(setShowSidebar())}
          />
        </header>

        <div
          className="menu-bar"
          style={{
            justifyContent: `${showSidebar ? "space-between" : "flex-start"}`,
          }}
        >
          <div className="menu">
            <TextFieldIcon
              size="small"
              margin="dense"
              label={`${showSidebar ? "Search chatroom..." : ""}`}
              type="text"
              variant="outlined"
              iconend={<SearchIcon />}
              sx={{
                backgroundColor: "#F6F5FF",
                transition: "all 0.3s ease",
                color: "#707070",
                marginX: "14px",
              }}
              onChange={(e: ChangeEvent) => handleChange(e)}
            />
            <Chatrooms data={data} refrence={refrence} />
          </div>

          <div className="bottom-content" title="Logout">
            <LogoutIcon
              sx={{
                fontSize: "30px",
                margin: "5px 5px 5px 0px",
                color: "#707070",
                // width: "66%",
                height: "60%",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleLogoutClick}
            />
            <span className="text nav-text">Logout</span>
          </div>
        </div>
      </nav>
      <section className="home">
        {currentRoom === null && <div className="text">Select Chatroom</div>}
        {currentRoom !== null && <SelectedChatroom refrence={refrence} />}
      </section>
    </div>
  );
};

export default Sidebar;
