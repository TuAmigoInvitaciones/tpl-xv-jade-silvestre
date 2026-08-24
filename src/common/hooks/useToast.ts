import { toast, type ExternalToast } from 'sonner'

export interface ToastOptions extends ExternalToast {
    description?: string
}

export const useToast = () => {
    const showSuccess = (message: string, options?: ToastOptions) => {
        return toast.success(message, {
            className: 'toast-custom toast-success',
            ...options,
        })
    }

    const showError = (message: string, options?: ToastOptions) => {
        return toast.error(message, {
            className: 'toast-custom toast-error',
            ...options,
        })
    }

    const showInfo = (message: string, options?: ToastOptions) => {
        return toast.info(message, {
            className: 'toast-custom toast-info',
            ...options,
        })
    }

    const showWarning = (message: string, options?: ToastOptions) => {
        return toast.warning(message, {
            className: 'toast-custom toast-warning',
            ...options,
        })
    }

    const showCustom = (message: string, options?: ToastOptions) => {
        return toast(message, {
            className: 'toast-custom',
            ...options,
        })
    }

    const dismissToast = (toastId?: string | number) => {
        toast.dismiss(toastId)
    }

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning,
        showCustom,
        dismissToast,
        toast,
    }
}
