import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    counter: number
}

const initialState: IState = {
    counter: 0
}
export const testReduce = createSlice({
    name: 'testReduce',
    initialState,

    reducers: {
        increment(state, action: PayloadAction<IState>) {
            state.counter += action.payload.counter
        },
        decrement(state, action: PayloadAction<IState>) {
            state.counter -= action.payload.counter
        }
    },
})

export default testReduce.reducer