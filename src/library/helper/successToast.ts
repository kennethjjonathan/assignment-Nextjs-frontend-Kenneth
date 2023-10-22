import { toast } from "react-toastify";

function successNotify(input: string) {
  toast.success(input, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export default successNotify;
