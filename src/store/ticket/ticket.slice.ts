import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ticket } from "@/modules/ticket/interfaces/ticket.interface";

interface InitialState {
    ticket: Ticket | null
    isLoading: boolean
    isChecking: boolean
    error: string | null
}

const initialState: InitialState = {
    ticket: {
        id: '6a7108b07b14249531a2bc6b',
        name: 'Saulo Román Santillán Nava',
        adultsQuantity: 1,
        adultsCounter: 0,
        kidsQuantity: 0,
        kidsCounter: 0,
        qrCode: 'https://res.cloudinary.com/dlamufioy/image/upload/v1785792688/abrasa/tickets/6a57d9921a9663d0259e4264/nauvwgqrnhw3xwj06rsj.png',
        phone: '4496548073',
        keyPass: 'prueba123',
        isActive: true,
        event: '6a57d9921a9663d0259e4264',
        user: '692b988ca479fb02d656b521',
        table: '1'
    },
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