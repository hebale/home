const useBlueprint = () => {
  const toMotionValue = (x, y) => {
    return `translate(${x}px, ${y}px)`;
  };

  const toBorderLength = value => {
    return `${value}%`;
  };

  const toLineLength = (x, y) => {
    const height = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return `${height}px`;
  };

  const toLineDegress = (x, y) => {
    const degree = Math.atan2(-x, y) * 180 / Math.PI;
    return `rotate(${degree}deg)`;
  };
  
  const toViewSize = value => {
    return `${value}px`;
  };

  return {
    toMotionValue,
    toBorderLength,
    toLineLength,
    toLineDegress,
    toViewSize
  }
};

export default useBlueprint;