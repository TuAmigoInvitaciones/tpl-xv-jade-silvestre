import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
    name: 'music',
    initialState: {
        isPlaying: false
    },
    reducers: {
        playMusic: (state) => {
            state.isPlaying = true
        },
        pauseMusic: (state) => {
            state.isPlaying = false
        },
        toggleMusic: (state) => {
            state.isPlaying = !state.isPlaying
        }
    }
})

export const { playMusic, pauseMusic, toggleMusic } = musicSlice.actions
export default musicSlice.reducer
