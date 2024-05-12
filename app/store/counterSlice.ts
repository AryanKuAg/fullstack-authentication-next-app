import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: Set<String>
}

const initialState: CounterState = {
  value: new Set(),
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state,action: PayloadAction<string>) => {
      state.value.add(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
        state.value.delete(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = counterSlice.actions

export default counterSlice.reducer