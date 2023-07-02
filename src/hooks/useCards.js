import { format } from 'date-fns';
import OctokitHttp from '@/common/octokit';

import useStore from '@/store';

const useCards = () => {
  const { repositories, dispatch } = useStore();

  const updateCardData = async () => {
    const repoNames = await repositories;
    const response = await OctokitHttp.get({
      base: '/users/{username}/repos',
    })

    dispatch({
      type: 'UPDATE_CARD_DATA',
      payload: response.data.filter(repository => repoNames.indexOf(repository.name) > -1)
    });
  };
  
  const setCardDataFormat = data => ({
    path: data.name,
    image: require(`../assets/images/card/intro_${data.name.replace('-', '_')}.png`),
    ...(data.description 
      ? { title: data.description.split(':')[0], description: data.description.split(':')[1] }
      : { title: 'title', description: 'description' }
    ),
    pushedAt: format(new Date(data.pushed_at), 'yyyy-MM-dd'),
    createdAt: format(new Date(data.created_at), 'yyyy-MM-dd'),
    githubUrl: data.html_url,
    topics: data.topics.reverse()
  });

  const toActiveValue = (t, l, y, s) => {
    return `translateY(${-t}px) translateX(${-l}px) rotateY(${y}deg) scale(${s})`;
  };

  const toMotionValue = (x, y) => {
    return `rotateX(${x}deg) rotateY(${y}deg)`;
  };
  
  return {
    updateCardData,
    setCardDataFormat,
    toActiveValue,
    toMotionValue,
  }
};

export default useCards;