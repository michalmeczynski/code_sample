import appRoutesUrls from "./app-routes-urls";

class AppRoutesHelper {
  getMainRoute(): string {
    return appRoutesUrls.main;
  }
}

export default new AppRoutesHelper();
