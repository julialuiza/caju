export const applyCPFMask = (value: string) => {
  value = value.replace(/\D/g, "");

  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return value;
};

export const getCPFNumbers = (value: string) => {
  return value.replace(/\D/g, "");
};

export const formatDateToDayMonthYear = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
