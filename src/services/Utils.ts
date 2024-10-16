import { Course } from "./Course/InterfaceCourse";

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

export const calculateTotalMemory = (courses: Course[]) => {
  return courses.reduce(
    (total, course) => total + (course.Video?.sizeMb || 0),
    0
  );
};

export const calculateMemoryByMonth = (courses: Course[]) => {
  const memoryByMonth: { [key: string]: number } = {};
  courses.forEach((course) => {
    const startMonth = new Date(course.InitialDate).getMonth();
    const endMonth = new Date(course.FinalDate).getMonth();
    const videoSize = course.Video?.sizeMb || 0;

    for (let month = startMonth; month <= endMonth; month++) {
      const monthName = new Date(0, month).toLocaleString("pt-BR", {
        month: "long",
      });
      memoryByMonth[monthName] = (memoryByMonth[monthName] || 0) + videoSize;
    }
  });
  return Object.entries(memoryByMonth).map(([month, size]) => ({
    month,
    size,
  }));
};

export const ValidateDate = (data1: string, data2: string) => {
  const d1 = new Date(data1);
  const d2 = new Date(data2);

  if (d1 > d2) return "Data inicial maior que final";

  return "";
};
