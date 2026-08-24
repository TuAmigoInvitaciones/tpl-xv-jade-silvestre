import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import type { AppDispatch } from '../store'
import { setIsLoading, setSubmittedData } from './confirmation.slice'
import { instance } from '@/common/config/http.plugin'
import type { ConfirmationFormData } from '@/modules/invitation/confirmation/ConfirmationSectionForm'

export interface ConfirmationPayload {
    event: string
    firstName: string
    lastName: string
    phone: string
    willAttend: boolean
    adultsQuantity: number
    kidsQuantity: number
}

export const startRegisteringConfirmation = (data: ConfirmationFormData, isQuantityFree: boolean, noKids: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true))

        const eventId = import.meta.env.VITE_EVENT_ID || ''
        const willAttend = data.attending === 'si'
        const nameParts = data.fullName.trim().split(' ')
        const firstName = nameParts[0] || 'Invitado'
        const lastName = nameParts.slice(1).join(' ') || ' '

        const finalAdults = willAttend ? (isQuantityFree ? (data.adults || 1) : 1) : 0
        const finalChildren = willAttend && !noKids && isQuantityFree ? (data.children || 0) : 0

        const payload: ConfirmationPayload = {
            event: eventId,
            firstName,
            lastName,
            phone: data.phone?.trim() || '',
            willAttend,
            adultsQuantity: finalAdults,
            kidsQuantity: finalChildren,
        }

        try {
            await instance.post('/open-confirmations', payload)
        } catch (error) {
            console.error('Error al registrar la confirmación:', error)
            await new Promise((resolve) => setTimeout(resolve, 600))
        } finally {
            const finalData = { ...data, adults: finalAdults, children: finalChildren }
            dispatch(setSubmittedData(finalData))
            dispatch(setIsLoading(false))

            if (willAttend) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                })
                toast.success('¡Muchas gracias por confirmar tu asistencia!')
            } else {
                toast.info('Gracias por avisarnos. Lamentamos que no puedas acompañarnos.')
            }
        }
    }
}
