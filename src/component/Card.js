import React, { useRef, useState, useEffect } from "react";
import { format } from 'date-fns';

export default function Card({
  data
}){
  const [info, setInfo] = useState();
  const cardRef = useRef();
  const [cardStyle, setCardStyle] = useState();

  useEffect(() => {
    const path = data.name;
    const [title, description] = data.description
      ? data.description.split(':') : ['title', 'description'];
    const pushedAt = format(new Date(data.pushed_at), 'yyyy-MM-dd');
    const githubUrl = data.html_url;
    const topics = data.topics.reverse();

    setInfo({ path, title, description, pushedAt, topics, githubUrl })
  }, [data]);

  // useEffect(() => {
  //   ['mousemove', 'touchmove'].forEach(eventName => {
  //     cardRef.current.addEventListener(eventName, event => {
  //       const clamp = (value, min = 0, max = 100 ) => {
  //         return Math.min(Math.max(value, min), max);
  //       };
  //       const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
  //       const rect = cardRef.current.getBoundingClientRect();
  //       const client = {
  //         x: event.type === 'mousemove' ? event.pageX : event.touches[0].clientX,
  //         y: event.type === 'mousemove' ? event.pageY : event.touches[0].clientY
  //       };
  //       const absolute = {
  //         x: client.x - rect.left,
  //         y: client.y - rect.top
  //       };
  //       const percent = {
  //         x: clamp(round((100 / rect.width) * absolute.x)),
  //         y: clamp(round((100 / rect.height) * absolute.y)),
  //       };
  //       const center = {
  //         x: percent.x - 50,
  //         y: percent.y - 50
  //       }
  //       setCardStyle({
  //         '--rotate-y': `${-round(center.x * 0.6)}deg`,
  //         '--rotate-x': `${round(center.y * 0.4)}deg`
  //       });
  //     })
  //   });
  //   ['mouseleave', 'touchend'].forEach(eventName => {
  //     cardRef.current.addEventListener(eventName, event => {
  //       setCardStyle({
  //         '--rotate-x': `0deg`,
  //         '--rotate-y': `0deg`
  //       });
  //     });
  //   });
  //   return () => {
  //     cardRef.current.removeEventListener('mousemove');
  //   }
  // }, []);

  return ( info && (
    <li ref={cardRef} className={`card ${info.path}`}
    //  style={cardStyle}
    >
      <div className="inner">
        <a className="link" href={ `/${info.path}/` } target="_blank">
          <header>
            <h2>{ info.title }</h2>
            <div className="info">
              <span>Pushed at</span>
              <span>{ info.pushedAt }</span>
            </div>  
          </header>
          <section>
            <p>{ info.description }</p>
            <div className="tag-group">
              { info.topics.map(topic => (
                <span className={topic} key={topic}>{topic}</span>
              )) }
            </div>
          </section>
        </a>
        <a className="github" href={ info.githubUrl } target="_blank">깃허브</a>
      </div>
    </li>
  ))
}