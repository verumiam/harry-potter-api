import { Student } from '@/types';

export const countStudentsByHouse = (students: Student[]): Record<string, number> => {
  const counts: Record<string, number> = {
    Gryffindor: 0,
    Slytherin: 0,
    Hufflepuff: 0,
    Ravenclaw: 0,
  };

  students.forEach((student) => {
    counts[student.house]++;
  });

  return counts;
};
