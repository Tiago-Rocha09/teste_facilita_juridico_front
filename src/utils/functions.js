function getOnlyNumbers(string) {
  return string?.replace(/[^0-9]/g, "") || "";
}

function phoneMask(number) {
  const phone = getOnlyNumbers(number);
  if (phone?.length <= 2) return phone;
  if (phone?.length <= 7) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
}

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export { phoneMask, getOnlyNumbers, debounce };
