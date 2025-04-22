import { toast as notify } from "react-toastify";

export const showToast = (type, message) => {

  const config = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  if (type === "success") {
    notify.success(message, config);
  } else if (type === "error") {
    notify.error(message, config);
  } else if (type === "info") {
    notify.info(message, config);
  } else {
    notify(message, config);
  }
};