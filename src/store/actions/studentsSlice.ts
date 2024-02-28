import { createSlice } from '@reduxjs/toolkit';
import { fetchStudents } from './studentsThunk';
import { countStudentsByHouse } from '@/lib';
import { Student } from '@/types';

interface StudentsState {
  students: Student[];
  countStudents: Record<string, number>;
  status: 'idle' | 'loading' | 'success';
  error: unknown;
  filterStartDate: string;
  filterEndDate: string;
}

const initialState: StudentsState = {
  students: [],
  countStudents: {},
  status: 'idle',
  error: undefined,
  filterStartDate: '',
  filterEndDate: '',
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setFilterStartDate: (state, action) => {
      state.filterStartDate = action.payload;
    },
    setFilterEndDate: (state, action) => {
      state.filterEndDate = action.payload;
    },
    filterWithBirthdate: (state) => {
      const students = state.students.filter((student) => {
        const dateOfBirth = new Date(student.dateOfBirth);
        const startDate = new Date(state.filterStartDate);
        const endDate = new Date(state.filterEndDate);
        return dateOfBirth >= startDate && dateOfBirth <= endDate;
      });
      state.countStudents = countStudentsByHouse(students);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'success';
        state.students = action.payload;
        state.countStudents = countStudentsByHouse(state.students);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const selectCountStudents = (state: { students: StudentsState }) =>
  state.students.countStudents;
export const selectStatus = (state: { status: StudentsState['status'] }) => state.status;
export const selectStartDate = (state: { startDate: StudentsState['filterStartDate'] }) =>
  state.startDate;
export const selectEndDate = (state: { endDate: StudentsState['filterEndDate'] }) => state.endDate;
export const { setFilterStartDate, setFilterEndDate, filterWithBirthdate } = studentSlice.actions;

export default studentSlice.reducer;
