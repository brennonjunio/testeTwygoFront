export const formatDate = (date: Date | string | undefined) => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    return "Data inválida";
  }
  return parsedDate.toLocaleDateString();
};

export const formatToStandardDate = (
  date: Date | string | undefined
): string => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    return "";
  }
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
