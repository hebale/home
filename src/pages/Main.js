import React, { useState, useEffect } from 'react';
import { animated, useSpringRef, useSpring, useSprings, useChain } from '@react-spring/web';

import useStore from '@/store';
import useCard from '@/hooks/useCard';

import FlipCard from '@/modules/FlipCard';

export default function Main() {
  const { cardData } = useStore();
  const { updateCardData } = useCard();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    updateCardData();
  }, []);

  const textRef = useSpringRef();
  const textSpring = useSpring({
    ref: textRef,
    from: { top: 135 },
    to: { top: 0 },
    config: {
      tension: 180
    }
  });

  const cardRef = useSpringRef();
  const [cardSprings] = useSprings(
    cardData.length, 
    i => ({
      ref: cardRef,
      from: { opacity: 0, y: 35 },
      to: { opacity: 1, y: 0 },
      delay: 160 * i,
      config: {
        mass: 2,
        tension: 450
      }
    }),
    []
  );
  
  useChain([textRef, cardRef], [0, 1], 480);

  const onCardSelect = id => setSelectedCard(id);

  return (
    <div className="main">
      <p>
        <animated.span style={textSpring}>경력은 실력으로, 실력은 노력으로</animated.span>
      </p>
      <ul className="card-wrap">
        {cardSprings.map(({ opacity, y }, index) => (
          <animated.li style={{ opacity, y }} {...(selectedCard === cardData[index].id && { className: 'selected'})} key={cardData[index].id}>
            <FlipCard data={cardData[index]} isSelected={selectedCard === cardData[index].id} onSelect={onCardSelect} />
          </animated.li>
        ))}
      </ul>
    </div>
  )
};