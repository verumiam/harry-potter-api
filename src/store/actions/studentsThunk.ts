import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk('students/get', async (_, thunkAPI) => {
  try {
    const students = await fetch('/api/students', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await students.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    } else {
      return thunkAPI.rejectWithValue({ error: 'Unknown error occurred' });
    }
  }
});
