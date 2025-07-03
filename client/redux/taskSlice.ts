import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      return state.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task._id !== action.payload);
    },
  },
});

export const { setTasks, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;