import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard, Private, Unauthorized } from "./components";
import { Authentication } from "./pages";
import { socket, SocketContext } from "./utilities/socket/connection";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route element={<Private allowedRoles={["admin", "user"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <ToastContainer
        autoClose={4000}
        draggable={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="colored"
      />
    </SocketContext.Provider>
  );
};

export default App;
