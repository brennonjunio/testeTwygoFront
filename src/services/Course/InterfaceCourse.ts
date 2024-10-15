export interface Course {
  id?: number;
  title: string;
  description: string;
  InitialDate: Date | string;
  FinalDate: Date | string;
  Video?: Video;
}

interface Video {
  sizeMb: number;
  description: string;
}
