export const validateCPF = (CPFNumbers: string) => {
  if (CPFNumbers.length === 0) return true;
  else if (CPFNumbers.length < 11) return false;
  else return true;
};

export const validateName = (name: string) => {
  const nameRegex = /(^[A-Za-z][A-Za-z0-9]{1,})([ ])([A-Za-z][A-Za-z0-9]{1,})/;

  if (name.length === 0) return true;
  else if (!nameRegex.test(name)) return false;
  else return true;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (email.length === 0) return true;
  else if (!emailRegex.test(email)) return false;
  else return true;
};
