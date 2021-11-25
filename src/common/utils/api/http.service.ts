import appConfig from "../../../app.config";
import notificationService from "../notification/notification.service";
import urlService from "../url/url.service";

const getMethod = <T>(
  url: string,
  query: { [key: string]: any } = {}
): Promise<T> => {
  const requestParams: RequestInit = { method: "GET" };

  const requestUrl = urlService.build(url, query);

  return sendRequest(requestUrl, requestParams);
};

const postMethod = <T>(
  url: string,
  body: { [key: string]: any } = {}
): Promise<T> => {
  const requestParams: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
  };

  return sendRequest<T>(url, requestParams);
};

const putMethod = <T>(
  url: string,
  body: { [key: string]: any } = {}
): Promise<T> => {
  const requestParams: RequestInit = {
    method: "PUT",
    body: JSON.stringify(body),
  };

  return sendRequest<T>(url, requestParams);
};

const deleteMethod = <T>(
  url: string,
  body: { [key: string]: any } = {}
): Promise<T> => {
  const requestParams: RequestInit = {
    method: "PUT",
    body: JSON.stringify(body),
  };

  return sendRequest<T>(url, requestParams);
};

const sendRequest = <T>(url: string, params?: RequestInit): Promise<T> => {
  const fullApiUrl = `${appConfig.apiUrl}${url}`;


  const requestParams: RequestInit = {
    ...params,
    headers: {
      ...params?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer `,
    },
  };

  return new Promise(async (resolve, reject) => {
    fetch(fullApiUrl, requestParams)
      .then(async (response) => {
        if (response.status === 204) {
          resolve(undefined as unknown as any);
          return;
        }

        if (response.status === 200) {
          resolve(response.json());
          return;
        }

        throw response;
      })
      .catch(async (error: Response | string) => {
        if (error.toString() === "TypeError: Failed to fetch") {
          notificationService.error(
            "Check your internet connection. You are offline."
          );
          reject(undefined);
          return;
        }

        const errorResponse = error as Response;
        try {
          const statusCode = errorResponse.status;
          const responseJson = await errorResponse.json();
          createErrorResponse(responseJson, statusCode);

          reject(responseJson);
          return;
        } catch (error) {
          reject();
        }
      });
  });
};

const createErrorResponse = (responseJson: any, statusCode: number) => {
  return {
    status: statusCode,
    response: responseJson,
  };
};

const httpService = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
};

export default httpService;
