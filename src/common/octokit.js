import { Octokit } from "octokit";

import useError from '@/hooks/useError';

const { handleError } = useError();

const octokit = new Octokit({
  auth: process.env.REACT_APP_OCTOKIT_TOKEN
});

const options = {
  username: 'hebale',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
};

const onError = error => {
  let message = 'Unknown Error!';
  if (error instanceof Error) message = error.message;
  handleError(message);
};

const queryString = query => {
  return Object.entries(query).reduce((a, b) => {
    const [key, value] = b;
    return `${a === '?' ? a : a + '&'}${key}=${value}`;
  }, '?')
};

const OctokitHttp = () => {
  return {
    get: async ({ base, path, query }) => {
      try {
        const response = await octokit.request(`GET ${base}${query ? queryString(query) : ''}`, {
          ...options,
          ...path
        });
        return response;
      } catch (error) {
        onError(error)
      }
    }
  }
};

export default OctokitHttp();