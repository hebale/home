import React from 'react';
import { 
  format,
  formatISO,
  parseISO,
  startOfMonth,
  endOfMonth
} from "date-fns";

import useStore from '@/store';
import OctokitHttp from '@/common/octokit';

const useCommits = () => {
  const { repositories, dispatch } = useStore();

  const updateCommitData = async ({ date, page }) => {
    const promises = [];
    const repoNames = await repositories;

    const period = date && {
      since: formatISO(startOfMonth(new Date(date.since))),
      until: formatISO(endOfMonth(new Date(date.until)))
    };

    for (let i = 0; i< repoNames.length; i++ ) {
      promises.push(
        OctokitHttp.get({
          base: '/repos/{username}/{repository}/commits',
          path: { repository: repoNames[i] },
          query: {
            ...period,
            per_page: 5,
            page
          }
        })
      );
    };
    
    const responses = await Promise.allSettled(promises);
    let response = [];

    responses.map(response => response.value.data).forEach((data, index) => {
      response = [
        ...response,
        ...data.map(({ sha, commit }) => ({
          sha,
          id: commit.id,
          repository: repoNames[index], 
          message: commit.message,
          name: commit.committer.name,
          date: commit.committer.date
        }))
      ];
    });

    console.log(
      response.sort((a, b) => new Date(b.date) - new Date(a.date))
    )

    dispatch({
      type: 'UPDATE_COMMIT_DATA',
      payload: response.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  };

  const setCommitDataFormat = ({ 
    repository,
    message,
    date,
    url,
    sha
  }) => ({
    day: format(new Date(date), 'dd'),
    time: format(new Date(date), 'HH:mm'),
    repository,
    message,
    url,
    tag: (
      <a href={sha} target="_blank" >{ sha.substring(0, 4) }</a>
    )
  });

  return {
    updateCommitData,
    setCommitDataFormat,
  }
}

export default useCommits;