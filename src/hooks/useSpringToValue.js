const useSpringToValue = () => {
  const toCardActive = (t, l, y, s) => {
    return `translateY(${-t}px) translateX(${-l}px) rotateY(${y}deg) scale(${s})`;
  };

  const toCardMotion = (x, y) => {
    return `rotateX(${x}deg) rotateY(${y}deg)`;
  };
  
  const toBlueprintMotion = (x, y) => {
    return `translate(${x}px, ${y}px)`;
  };

  const toBlueprintBorder = value => {
    return `${value}%`;
  };

  const toBluepringStickLength = (x, y) => {
    const height = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return `${height}px`;
  };

  const toBluepringStickDegree = (x, y) => {
    const degree = Math.atan2(-x, y) * 180 / Math.PI;
    return `rotate(${degree}deg)`;
  };
  
  const toViewerSize = value => {
    return `${value}px`;
  };

  return {
    toCardActive,
    toCardMotion,
    toBlueprintMotion,
    toBlueprintBorder,
    toBluepringStickLength,
    toBluepringStickDegree,
    toViewerSize
  }
};

export default useSpringToValue;