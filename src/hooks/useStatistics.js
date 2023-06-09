import useStore from '@/store';
import OctokitHttp from '@/common/octokit';

const useStatistics = () => {
  const { repositories, dispatch } = useStore();

  const updateLanguageData = async () => {
    const promises = [];
    const repoNames = await repositories;
    
    for (let i = 0; i< repoNames.length; i++ ) {
      promises.push(
        OctokitHttp.get({
          base: '/repos/{username}/{repository}/languages',
          path: { repository: repoNames[i] }
        })
      );
    };

    const responses = await Promise.allSettled(promises);

    dispatch({
      type: 'UPDATE_LANGUAGE_DATA',
      payload: responses.map((response, index) => ({
        repository: repoNames[index],
        data: response.value.data
      }))
    });
  };

  const chartDataFilter = ({ languageData, repoStates }) => {
    if(repoStates.length === 0) return [];

    const reposVisible = reposName => {
      return repoStates.filter(repos => repos.hasOwnProperty(reposName))[0][reposName];
    };

    const dataSet = languageData
      .filter(lang => reposVisible(lang.repository))
      .reduce((a, b) => {
        Object.keys(b.data).forEach(key => {
          if(a.filter(el => el.key === key).length === 0) a.push({ key, total: 0 });

          a.map(el => {
            if(el.key === key) {
              el.total += b.data[key];
              el[b.repository] = b.data[key];
            } 
            return el;
          })
        })
        return a;
      }, []);

    return dataSet.sort((a, b) => a.total - b.total);
  };

  return {
    updateLanguageData,
    chartDataFilter
  };
};

export default useStatistics;