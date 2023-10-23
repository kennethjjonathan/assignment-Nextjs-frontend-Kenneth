import { toast } from "react-toastify";

function infoNotify(input: string) {
  toast.info(input, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export default infoNotify;
