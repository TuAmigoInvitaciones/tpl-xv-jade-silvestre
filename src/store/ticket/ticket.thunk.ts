import type { AppDispatch } from "../store";
import { toast } from "sonner";

import { setIsLoading, setTicket } from "./ticket.slice"
import { instance } from "@/common/config/http.plugin"
import type { Ticket } from "@/modules/ticket/interfaces/ticket.interface"
import { isAxiosError } from "axios";

export const startGettingTicket = (keyPass: string) => {
    return async (dispatch: AppDispatch): Promise<boolean> => {
        try {
            dispatch(setIsLoading(true))

            const { data: ticket } = await instance.get<Ticket>(`tickets/keyPass/${keyPass}`)

            dispatch(setTicket(ticket))
            localStorage.setItem('abrasa-ticket', JSON.stringify(ticket))
            toast.success(`Bienvenido ${ticket.name}`)
            return true
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error('Boleto no encontrado. Verifica tu clave de acceso.')
                } else {
                    toast.error(error.response?.data?.errors?.[0] ?? 'Ocurrió un error. Intenta de nuevo.')
                }
            }
            return false
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}