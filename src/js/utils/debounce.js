export default function Debounce(func, wait) {
  let timeout;

  const functionToRun = () => {
    const args = arguments;

    const later = () => {
      timeout = null;

      func.apply(args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };

  return functionToRun;
}
