import React, { useRef, useState, useEffect } from "react";
import { animated, useSpring, useSpringRef } from '@react-spring/web';
import { format } from 'date-fns';

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
  const [info, setInfo] = useState();
  
  useEffect(() => {
    const path = data.name;
    const [title, description] = data.description
    ? data.description.split(':') : ['title', 'description'];
    const pushedAt = format(new Date(data.pushed_at), 'yyyy-MM-dd');
    const createdAt = format(new Date(data.created_at), 'yyyy-MM-dd');
    const githubUrl = data.html_url;
    const topics = data.topics.reverse();

    setInfo({ path, title, description, createdAt, pushedAt, topics, githubUrl })
  }, [data]);
  
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
  const toActiveValue = (t, l, y, s) => `translateY(${-t}px) translateX(${-l}px) rotateY(${y}deg) scale(${s})`;
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
  const onLeave = () => hoverApi.start({ transform: [0, 0] });
  const toMotionValue = (x, y) => `rotateX(${x}deg) rotateY(${y}deg)`;

  return ( info && (
    <>
      <animated.div 
        ref={cardRef}
        className={`card ${info.path}${isSelected ? ' selected' : ''}`}
        style={{ transform: flipSpring.transform.to(toActiveValue) }}
        {...(!isSelected && { onClick: () => onSelectCard(data.id) } )}
      >
        <animated.div
          className="inner" 
          ref={innerRef}
          style={{ transform: hoverSpring.transform.to(toMotionValue) }}
          {...(isActived && {
            onMouseLeave: () => onLeave(),
            onMouseMove: event => onHover(event),
            onTouchCancel: () => onLeave(),
            onTouchEnd: () => onLeave(),
            onTouchMove: event => onHover(event),
          })}
        >
          <div className="front-face">
            <header>
              <a className="link" href={ `/${info.path}/` } target="_blank" >
                <img src={`./assets/images/card/intro_${data.name.replace('-', '_')}.png`} alt="카드 메인 이미지" />
              </a>
            </header>
            <section>
              <h2>
                <span>{ info.title }</span>
                <a className="link" href={ `/${info.path}/` } target="_blank" >Web</a>
                <a className="github" href={ info.githubUrl } target="_blank">깃허브</a>
              </h2>
              <div className="info-group">
                <div className="info">
                  <span>Created at</span>
                  <span>{ info.createdAt }</span>
                </div>
                {/* <div className="info">
                  <span>Updated at</span>
                  <span>{ info.pushedAt }</span>
                </div> */}
              </div>
              <p>{ info.description }</p>
            </section>
            <div className="tag-group">
              {info.topics.map(topic => (
                <span className={topic} key={topic}>{topic}</span>
                ))}
            </div>
          </div>
          <div className="back-face">
            <span>{ info.path }</span>
          </div>
        </animated.div>
      </animated.div>
      <div className="dim" onClick={inactiveCard}></div>
    </>
  ))
}