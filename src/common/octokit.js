import { Octokit } from "octokit";
import useError from '@/hooks/useError';
import useStore from '@/store';
import Http from '@/common/http';

const GITHUB_TOKEN = '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';

const octokit = new Octokit({
  auto: GITHUB_TOKEN
});

const useOctokit = () => {  
  const { handleError } = useError();
  const { dispatch } = useStore();

  return {
    getRepositoryLists : async () => {
      try {
        const cardsResponse = await Http.get({ path: '/' });
        const reposResponse = await octokit.request('GET /users/{username}/repos', {
          username: 'hebale',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        const cardNames = cardsResponse.map(card => card.path);
        
        dispatch({
          type: 'UPDATE_CARDS_DATA',
          payload: reposResponse.data.filter(repository => cardNames.indexOf(repository.name) > -1)
        });
      } catch (error) {
        let message = 'Unknown Error!';
        if (error instanceof Error) message = error.message;
        handleError(message);
      }
    }
  }
};

export default useOctokit;