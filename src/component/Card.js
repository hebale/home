import React from "react";


const dateFormat = (value) => {
  return String(value).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
}

export default function Card({
  path,
  title,
  description,
  device,
  github,
  create,
  skills,
}){
  
  return (
    <li className={`card ${path}`}>
      <a className="link" href={`/${path}/`} target="_blank">
        <header>
          <h2>{title}</h2>
          <div className="info">
            <span>{device.join(' / ')}</span>
            <span>{dateFormat(create)}</span>
          </div>  
        </header>
        <section>
          <p>{description}</p>
          <div className="tag-group">
            {skills.map(skill => (
              <span className={skill.split(' ').at(0)} key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      </a>
      <a className="github" href={github} target="_blank">깃허브</a>
    </li>
  )
}