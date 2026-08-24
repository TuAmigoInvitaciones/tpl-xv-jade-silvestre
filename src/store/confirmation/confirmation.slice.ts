import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ConfirmationFormData } from '@/modules/invitation/confirmation/ConfirmationSectionForm'

interface ConfirmationState {
    isLoading: boolean
    submittedData: ConfirmationFormData | null
}

const initialState: ConfirmationState = {
    isLoading: false,
    submittedData: null,
}

export const confirmationSlice = createSlice({
    name: 'confirmation',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setSubmittedData: (state, action: PayloadAction<ConfirmationFormData | null>) => {
            state.submittedData = action.payload
        },
        resetConfirmationState: (state) => {
            state.isLoading = false
            state.submittedData = null
        },
    },
})

export const { setIsLoading, setSubmittedData, resetConfirmationState } = confirmationSlice.actions
export default confirmationSlice.reducer
