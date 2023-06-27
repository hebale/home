import React, { useState } from 'react';
import { animated, useTrail } from '@react-spring/web';

import useStore from '@/store';
import Card from '@/components/Card';

const Main = () => {
  const { cardData } = useStore();
  const [selectedCard, setSelectedCard] = useState(null);

  const cardTrail = useTrail(cardData.length, {
    from: { opacity: 0, y: 35 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: {
      mass: 0.5,
      tension: 200,
      friction: 22,
    }
  }, )
  const onCardSelect = id => setSelectedCard(id);

  return (
    <ul className="card-wrap">
      {cardTrail.map(({ opacity, y }, index) => (
        <animated.li style={{ opacity, y }} {...(selectedCard === cardData[index].id && { className: 'selected'})} key={cardData[index].id}>
          <Card data={cardData[index]} isSelected={selectedCard === cardData[index].id} onSelect={onCardSelect} />
        </animated.li>
      ))}
    </ul>
  )
};

export default Main;