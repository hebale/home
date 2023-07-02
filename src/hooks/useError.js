const useError = () => {
  const handleError = error => {
    console.log(error);
  }
  return {
    handleError
  }  
};

export default useError;