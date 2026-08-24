import { useDispatch, useSelector } from 'react-redux'
import type { UseFormSetValue, UseFormReset } from 'react-hook-form'
import type { AppDispatch, RootState } from '@/store/store'
import { startRegisteringConfirmation } from '@/store/confirmation/confirmation.thunk'
import { resetConfirmationState } from '@/store/confirmation/confirmation.slice'
import type { ConfirmationFormData } from '@/modules/invitation/confirmation/ConfirmationSectionForm'

interface UseConfirmationOptions {
    setValue: UseFormSetValue<ConfirmationFormData>
    reset: UseFormReset<ConfirmationFormData>
    adults: number
    childrenCount: number
    attending: 'si' | 'no'
    isQuantityFree?: boolean
    noKids?: boolean
}

export const useConfirmation = ({
    setValue,
    reset,
    adults,
    childrenCount,
    attending,
    isQuantityFree = false,
    noKids = false,
}: UseConfirmationOptions) => {
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, submittedData } = useSelector((state: RootState) => state.confirmation)

    const handleAttendingSelect = (value: 'si' | 'no') => {
        setValue('attending', value, { shouldValidate: true })
        if (value === 'no') {
            setValue('adults', 0)
            setValue('children', 0)
        } else if ((adults ?? 0) === 0) {
            setValue('adults', 1)
        }
    }

    const handleIncrementAdults = () => {
        if (!isQuantityFree) return
        setValue('adults', (adults ?? 0) + 1, { shouldValidate: true })
    }

    const handleDecrementAdults = () => {
        if (!isQuantityFree) return
        const min = attending === 'no' ? 0 : 1
        if ((adults ?? 0) > min) {
            setValue('adults', (adults ?? 0) - 1, { shouldValidate: true })
        }
    }

    const handleIncrementChildren = () => {
        if (!isQuantityFree || noKids) return
        setValue('children', (childrenCount ?? 0) + 1, { shouldValidate: true })
    }

    const handleDecrementChildren = () => {
        if (!isQuantityFree || noKids) return
        if ((childrenCount ?? 0) > 0) {
            setValue('children', (childrenCount ?? 0) - 1, { shouldValidate: true })
        }
    }

    const onSubmit = (data: ConfirmationFormData) => {
        dispatch(startRegisteringConfirmation(data, isQuantityFree, noKids))
    }

    const handleResetForm = () => {
        dispatch(resetConfirmationState())
        reset({
            attending: 'si',
            fullName: '',
            phone: '',
            adults: 1,
            children: 0,
        })
    }

    return {
        isLoading,
        isSubmitted: Boolean(submittedData),
        submittedData,
        handleAttendingSelect,
        handleIncrementAdults,
        handleDecrementAdults,
        handleIncrementChildren,
        handleDecrementChildren,
        onSubmit,
        handleResetForm,
    }
}
