import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ticket } from "@/modules/ticket/interfaces/ticket.interface";

interface InitialState {
    ticket: Ticket | null
    isLoading: boolean
    isChecking: boolean
    error: string | null
}

const initialState: InitialState = {
    ticket: null,
    isLoading: false,
    isChecking: true,
    error: null,
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicket: (state, { payload }: PayloadAction<Ticket | null>) => {
            state.ticket = payload;
            state.isChecking = false;
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setIsChecking: (state, { payload }: PayloadAction<boolean>) => {
            state.isChecking = payload;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    },
});

export const { setTicket, setIsLoading, setIsChecking, setError } = ticketSlice.actions;
export default ticketSlice.reducer;