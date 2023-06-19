export default function useError() {
  const handleError = error => {
    console.log(error);
  }
  return {
    handleError
  }  
}