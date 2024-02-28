import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchStudents } from './studentsThunk';

const useStudentsAction = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getStudents = async () => {
    try {
      await dispatch(fetchStudents()).unwrap();
    } catch (error) {
      return error;
    }
  };

  return { getStudents };
};

export default useStudentsAction;
