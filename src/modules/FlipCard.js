import React, { useRef, useState, useEffect } from "react";
import { animated, useSpring } from '@react-spring/web';

import useCards from '@/hooks/useCards';

const config = {
  mass: 1.5,
  tension: 180,
  friction: 30
};

export default function Card({
  data,
  isSelected,
  onSelect
}){
  const [card, setCard] = useState();
  const { setCardDataFormat, toActiveValue, toMotionValue } = useCards();
  
  useEffect(() => {
    setCard(setCardDataFormat(data));
  }, []);
  
  const cardRef = useRef(null);
  const [isActived, setIsActived] = useState(false);
  const [flipSpring, flipApi] = useSpring(() => ({
    isDefault: true,
    transform: [0, 0, 0, 1],
    onRest: result => {
      setIsActived(!result.value.isDefault);
      if(result.value.isDefault) onSelect(null);
    },
    config
  }), []);

  const onSelectCard = id => {
    onSelect(id);
    const rect = cardRef.current.getBoundingClientRect();
    const setPos = () => [
      rect.top + (rect.height / 2) - (window.innerHeight / 2),
      rect.left + (rect.width / 2) - (window.innerWidth / 2),
      540,
      1.25
    ];
    flipApi.start({ 
      isDefault: false,
      transform: setPos()
    });
  }
  const inactiveCard = () => {
    flipApi.start({ 
      isDefault: true,
      transform: [ 0, 0, 0, 1]
    });
    setIsActived(false);
  };

  const innerRef = useRef();
  const [hoverSpring, hoverApi] = useSpring(() => ({
    transform: [0, 0],
    config
  }), []);

  const onHover = event => {
    const rect = innerRef.current.getBoundingClientRect();
    const setPos = (x, y, rect) => [
      (y - rect.top - rect.height / 2) / 5,
      -(x - rect.left - rect.width / 2) / 5
    ];
    const eventType = event.type === 'touchmove' ? event.touches[0] : event;

    hoverApi.start({
      transform: setPos(eventType['clientX'], eventType['clientY'], rect),
    })
  };
  const onLeave = event => hoverApi.start({ transform: [0, 0] });
  
  return ( card && (
    <>
      <animated.div 
        ref={cardRef}
        className={`card ${card.path}${isSelected ? ' selected' : ''}`}
        style={{ transform: flipSpring.transform.to(toActiveValue) }}
        {...(!isSelected && { onClick: () => onSelectCard(data.id) } )}
        {...(isActived && {
          onMouseLeave: event => onLeave(event),
          onMouseMove: event => onHover(event),
          // onTouchCancel: () => onLeave(),
          // onTouchEnd: () => onLeave(),
          // onTouchMove: event => onHover(event),
        })}
      >
        <animated.div
          ref={innerRef}
          className="inner" 
          style={{ transform: hoverSpring.transform.to(toMotionValue) }}
        >
          <div className="front-face">
            <header>
              <a className="link" href={ `/project/${card.path}/` } target="_blank" >
                <img src={card.image.default} alt="카드 메인 이미지" />
              </a>
            </header>
            <section>
              <h2>
                <span>{ card.title }</span>
                <a className="link" href={ `/project/${card.path}/` } target="_blank" >Web</a>
                <a className="github" href={ card.githubUrl } target="_blank">깃허브</a>
              </h2>
              <div className="info-group">
                <div className="info">
                  <span>Created at</span>
                  <span>{ card.createdAt }</span>
                </div>
              </div>
              <p>{ card.description }</p>
            </section>
            <div className="tag-group">
              {card.topics.map(topic => (
                <span className={topic} key={topic}>{topic}</span>
                ))}
            </div>
          </div>
          <div className="back-face">
            <span>{ card.path }</span>
          </div>
        </animated.div>
      </animated.div>
      <div className="dim" onClick={inactiveCard}></div>
    </>
  ))
}