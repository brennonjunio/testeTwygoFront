export const formatDate = (date: Date | string | undefined) => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    return "Data inválida";
  }
  const dia = String(parsedDate.getUTCDate()).padStart(2, "0");
  const mes = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const ano = parsedDate.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
};

export const formatToStandardDate = (
  date: Date | string | undefined
): string => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    return "";
  }
  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
