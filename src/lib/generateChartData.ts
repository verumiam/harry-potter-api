import { ChartData } from '@/types';

export const generateChartData = (students: Record<string, number>): ChartData => {
  const { Gryffindor, Slytherin, Hufflepuff, Ravenclaw } = students;

  return {
    labels: ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'],
    datasets: [
      {
        data: [Gryffindor, Slytherin, Hufflepuff, Ravenclaw],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};
