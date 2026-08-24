import React from 'react'
import { Toaster } from 'sonner'

export const ToastContainer: React.FC = () => {
    return (
        <Toaster
            position="top-center"
            expand={false}
            richColors
            closeButton
            toastOptions={{
                className: 'toast-custom',
                duration: 4000,
            }}
        />
    )
}
