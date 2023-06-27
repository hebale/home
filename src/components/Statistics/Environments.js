import React from 'react';

export default function Environments(props){
  return (
    <>
      {/* <directionalLight color={'#fff'} position={[10, 10, 10]} castShadow/>
      <ambientLight intensity={2}/> */}
      
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={0.5}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        {...props}
      />
    </>
  )
}