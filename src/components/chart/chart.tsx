import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import useStudentsAction from '@/store/actions/studentsAction';
import { ChartData } from '@/types';
import { generateChartData } from '@/lib';
import { selectCountStudents } from '@/store/actions/studentsSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const { getStudents } = useStudentsAction();
  const countStudents: Record<string, number> | null = useSelector(selectCountStudents);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await getStudents();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countStudents) {
      setChartData(generateChartData(countStudents));
    }
  }, [countStudents]);

  if (!countStudents || Object.values(countStudents).every((value) => value === 0)) {
    return 'Студентов за данный период не найдено';
  }

  return <div className="h-[600px] w-[600px]">{chartData && <Pie data={chartData} />}</div>;
}
