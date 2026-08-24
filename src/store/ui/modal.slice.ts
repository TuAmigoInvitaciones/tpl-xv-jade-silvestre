import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const MODAL_NAMES = {
    none: 'none',
    RSVP: 'RSVP',
    searchInfo: 'search-info',
    ticket: 'ticket',
    tables: 'tables',
    graduates: 'graduates',
} as const

export type ModalName = typeof MODAL_NAMES[keyof typeof MODAL_NAMES];

interface ModalState {
    isOpen: boolean,
    modalTitle: string,
    modalName: ModalName,
    modalContent: string,
}

const initialState: ModalState = {
    isOpen: false,
    modalTitle: '',
    modalName: MODAL_NAMES.none,
    modalContent: '',
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, { payload }: PayloadAction<{ modalTitle: string, modalName: ModalName }>) => {
            state.isOpen = true;
            state.modalTitle = payload.modalTitle;
            state.modalName = payload.modalName;
        },

        closeModal: (state) => {
            state.isOpen = false;
            state.modalTitle = '';
            state.modalName = MODAL_NAMES.none;
        },

        setModalContent: (state, { payload }: PayloadAction<string>) => {
            state.modalContent = payload;
        }
    }
})

export const { openModal, closeModal, setModalContent } = modalSlice.actions
export default modalSlice.reducer