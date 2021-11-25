const fakeFetch = <T = any>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
};

const fakeApiService = {
  fakeFetch,
};

export default fakeApiService;
