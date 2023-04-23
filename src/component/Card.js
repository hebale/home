import React from "react";

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
      <a className="link" href={`/${path}/`}>
        <header>
          <h2>{title}</h2>  
          <span>{create}</span>
        </header>
        <section>
          <span>{device.join(',')}</span>
          <p>{description}</p>
          <div className="tag-group">
            {skills.map(skill => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      </a>
      <a className="github" href={github} target="_blank">깃허브</a>
    </li>
  )
}