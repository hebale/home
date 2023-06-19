import React from 'react';

import useStore from '@/store';

import Card from '@/component/Card';


const Body = () => {
  const { cardData } = useStore();

  return (
    <section>
      <ul className="card-wrap">
        {cardData.map(data => 
          <Card data={data} key={data.id} />
        )}
      </ul>
    </section>
  );
}

export default Body;