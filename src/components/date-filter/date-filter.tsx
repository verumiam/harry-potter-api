import {
  filterWithBirthdate,
  selectEndDate,
  selectStartDate,
  setFilterEndDate,
  setFilterStartDate,
} from '@/store/actions/studentsSlice';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DateFilter() {
  const dispatch = useDispatch();
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterStartDate(e.target.value));
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterEndDate(e.target.value));
  };

  const handleClick = () => {
    dispatch(filterWithBirthdate());
  };

  return (
    <>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
      </div>
      <button onClick={handleClick}>Apply Filter</button>
    </>
  );
}
