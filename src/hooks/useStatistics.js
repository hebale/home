import useStore from '@/store';
import Http from '@/common/http';
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

  const getContributionData = async () => {
    const response = await Http.get({
      path: '/github/users/hebale/contributions',
      headers: { 'Content-Type': 'text/html' }
    });

    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const data = Array.prototype.slice.call(doc.querySelectorAll('table .ContributionCalendar-day'))
      .reduce((a, b, index) => {
        // if(index % 7 === 0) a.push([]);
        // a.at(-1).push({
        //   date: b.getAttribute('data-date'),
        //   level: Number(b.getAttribute('data-level')),
        //   count: Number(b.textContent.split(' ')[0]) || 0
        // });

        a.push({
          date: b.getAttribute('data-date'),
          level: Number(b.getAttribute('data-level')),
          count: Number(b.textContent.split(' ')[0]) || 0
        });
        return a;
      }, []);
      
    dispatch({
      type: 'UPDATE_COMTRIBUTION_DATA',
      payload: data.sort((a, b) => new Date(a.date) - new Date(b.date))
    });
  }

  return {
    updateLanguageData,
    chartDataFilter,
    getContributionData
  };
};

export default useStatistics;