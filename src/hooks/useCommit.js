import {
  getYear,
  getMonth,
  format,
  formatISO,
  startOfMonth,
  endOfMonth
} from "date-fns";

import useStore from '@/store';
import OctokitHttp from '@/common/octokit';

const useCommit = () => {
  const { homeData, dispatch } = useStore();

  const updateCommitList = async ({ repo, date, page }) => {
    const promises = [];
    const { repositories } = await homeData;
    
    const period = date && {
      since: formatISO(startOfMonth(new Date(date.since))),
      until: formatISO(endOfMonth(new Date(date.until)))
    };

    if (!repo) {
      for (let i = 0; i < repositories.length; i++ ) {
        promises.push(
          OctokitHttp.get({
            base: '/repos/{username}/{repository}/commits',
            path: { repository: repositories[i] },
            query: {
              per_page: 30,
              ...period,
              ...(page ? { page } : { page: 1 })
            }
          })
        );
      };
    } else {
      promises.push(
        OctokitHttp.get({
          base: '/repos/{username}/{repository}/commits',
          path: { repository: repo },
          query: {
            per_page: 30,
            ...period,
            ...(page ? { page } : { page: 1 })
          }
        })
      );
    }
    
    const responses = await Promise.allSettled(promises);
    let response = [];

    if (responses.length > 0) {
      responses.map(response => response.value.data).forEach((data, index) => {
        response = [
          ...response,
          ...data.map(({ sha, commit }) => {
            return ({
              sha,
              id: sha,
              repository: repo ? repo : repositories[index], 
              message: commit.message,
              author: commit.author.name,
              tag: sha.substring(0, 7),
              date: format(new Date(commit.committer.date), 'yyyy.MM.dd HH:mm:ss'),
              group: `${getYear(new Date(commit.committer.date))}년 ${getMonth(new Date(commit.committer.date)) + 1}월`,
              day: format(new Date(commit.committer.date), 'dd'),
              time: format(new Date(commit.committer.date), 'HH:mm')
            })
          }
          )
        ];
      });
    }

    dispatch({
      type: 'UPDATE_COMMIT_LIST',
      payload: response.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  };

  const resetCommitList = () => {
    dispatch({
      type: 'UPDATE_COMMIT_LIST',
      payload: []
    });
  };

  const updateCommitDetail = async ({ repo, hash }) => {
    const response = await OctokitHttp.get({
      base: '/repos/{username}/{repository}/commits/{ref}',
      path: { 
        repository: repo,
        ref: hash
      }
    });

    const { sha, commit, files } = response.data;

    dispatch({
      type: 'UPDATE_COMMIT_DETAIL',
      payload: {
        sha,
        date: format(new Date(commit.author.date), 'yyyy.MM.dd HH:mm:ss'),
        author: commit.author.name,
        message: commit.message,
        status: files.reduce((a, b) => {
          if (!a.hasOwnProperty(b.status)) a[b.status] = 0;
          a[b.status] += 1;
          return a;
        }, {}),
        files: files.map(file => ({
          sha: file.sha,
          rawUrl: file.raw_url,
          status: file.status,
          filename: file.filename,
          stats: {
            additions: file.additions,
            deletions: file.deletions,
            changes: file.changes
          },
          patch: file.patch,
          ...(file.patch && {
            offset: parseInt(file.patch.match(/(?<=\@\@ \-).*?(?=\,)/)[0]),
            old: file.patch.replace(/(\n\+.*?(?=\n))|(\@\@.*?\@\@)/g, '').replace(/\n\-/g, '\n '),
            new: file.patch.replace(/(\n\-.*?(?=\n))|(\@\@.*?\@\@)/g, '').replace(/\n\+/g, '\n ')
          }),
        }))
      }
    });
  };
  
  const resetCommitDetail = () => {
    dispatch({
      type: 'UPDATE_COMMIT_DETAIL',
      payload: []
    });
  };

  return {
    updateCommitList,
    resetCommitList,
    updateCommitDetail,
    resetCommitDetail
  }
}

export default useCommit;