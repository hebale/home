import React from 'react';

export default function Environments(props){
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight 
        intensity={0.8}
        position={[0, 10, 0]}
        {...props}   
      />
    </>
  )
}