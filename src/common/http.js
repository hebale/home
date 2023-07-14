import useError from '@/hooks/useError';

const { handleError } = useError();

const Http = () => {
  let endPoint = 'https://api.hebale.com';
  const queryString = (params) => {
    return Object.keys(params)
      .map((value) => `${value}=${params[value]}`)
      .join('&')
  };

  return {
    get: async ({ base, path, queries, headers }) => {
      try {
        const response = await fetch(
          `${base ? base : endPoint}${path}${queries ? `&${queryString(queries)}` : ''}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(headers && headers)
            }
          }
        )
        const data = await (() => {
          if (!headers || headers['Content-Type'].indexOf('json') > -1) {
            return response.json();
          }
          return response;
        })();

        return data;
      } catch (error) {
        let message = 'Unknown Error!';
        if (error instanceof Error) message = error.message;
        handleError(message);
      }
    },
    post: async ({ path, body }) => {},
    pull: async ({ path, body }) => {},
    patch: async ({ path, body }) => {},
    delete: async ({ path, body }) => {}
  }
}

export default Http();