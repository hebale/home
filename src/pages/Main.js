import React, { useState, useEffect } from 'react';
import { animated, useTrail } from '@react-spring/web';

import useStore from '@/store';
import useCards from '@/hooks/useCards';

import Card from '@/modules/Card';

export default function Main() {
  const { cardData } = useStore();
  const { updateCardData } = useCards();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    updateCardData();
  }, []);

  const cardTrail = useTrail(cardData.length, {
    from: { opacity: 0, y: 35 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: {
      mass: 0.5,
      tension: 200,
      friction: 22,
    }
  });

  const onCardSelect = id => setSelectedCard(id);

  return (
    <div className="main">
      <p>경력은 실력으로, 실력은 노력으로</p>
      <ul className="card-wrap">
        {cardTrail.map(({ opacity, y }, index) => (
          <animated.li style={{ opacity, y }} {...(selectedCard === cardData[index].id && { className: 'selected'})} key={cardData[index].id}>
            <Card data={cardData[index]} isSelected={selectedCard === cardData[index].id} onSelect={onCardSelect} />
          </animated.li>
        ))}
      </ul>
    </div>
  )
};