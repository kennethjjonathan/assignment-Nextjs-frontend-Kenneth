import { toast } from "react-toastify";

function errorNotify(response: Response) {
  let message: string = `Sorry, but your activity is not successful. Status: ${response.status}`;
  if (response.status === 404) {
    message = `Sorry, but seems like there's something wrong from our side. Status: ${response.status} with message: ${response.statusText}`;
  }
  toast.error(message, {
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

export default errorNotify;
