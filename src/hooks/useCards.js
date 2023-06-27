import useStore from '@/store/';
import http from '@/common/http';

export default function useCards() {
  const { token, cardData, dispatch } = useStore();

  const updateCardsData = () => {
    const data = http.get({
      base: 'https://api.github.com',
      path: '/user/hebale/repos',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: {
        auth: token
      }
    })

    console.log(data);
  }
  return {
    updateCardsData
  }
}