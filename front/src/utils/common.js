import { toast } from "react-toastify";

//Gestion des alertes
export function showToastMessage(message, type) {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "update":
      toast.update(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      break;
  }
}