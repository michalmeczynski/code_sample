import Notiflix from "notiflix";

class NotificationService {
  constructor() {
    Notiflix.Notify.init({
      zindex: 999999,
      timeout: 5000,
      fontFamily: "Poppins",
    });
  }

  success(message: string, onClick?: () => void) {
    return Notiflix.Notify.success(message, onClick);
  }
  warning(message: string, onClick?: () => void) {
    return Notiflix.Notify.warning(message, onClick);
  }
  error(message: string, onClick?: () => void) {
    return Notiflix.Notify.failure(message, onClick);
  }
  info(message: string, onClick?: () => void) {
    return Notiflix.Notify.info(message, onClick);
  }
}

export default new NotificationService();
