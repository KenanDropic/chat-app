import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <h1>CHAT APP</h1>
      <ToastContainer
        autoClose={4000}
        draggable={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
};

export default App;
