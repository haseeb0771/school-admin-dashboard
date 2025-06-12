import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toaster() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastClassName={({ type }) =>
        [
          "relative flex items-center rounded-lg px-6 py-4 shadow-xl text-base font-semibold min-w-[300px] max-w-sm animate-slideInUp",
          type === "success"
            ? "bg-blue-500 text-white"
            : type === "error"
            ? "bg-red-500 text-white"
            : "bg-white text-gray-900",
        ].join(" ")
      }
      bodyClassName="flex items-center"
      closeButton={false}
    />
  );
}

export default Toaster;
