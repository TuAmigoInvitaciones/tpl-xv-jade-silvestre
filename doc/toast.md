# Mecanismo de Notificaciones (`Toast` con Sonner)

El sistema de notificaciones globales de la plantilla utiliza la librería **Sonner**, completamente personalizada y adaptada a la línea gráfica de la invitación (tipografías del tema activo `$font-serif`, `$font-sans` y paleta de colores).

---

## 📦 1. Componente Global `<ToastContainer />`

El contenedor principal `<ToastContainer />` está montado en la raíz de la aplicación ([InvitationApp.tsx](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/InvitationApp.tsx)), por lo que no es necesario volver a importarlo en tus vistas o módulos.

```tsx
// src/InvitationApp.tsx
import { ToastContainer } from './common/components/toast/ToastContainer';

export const InvitationApp = () => (
    <Provider store={store}>
        <RouterApp />
        <ModalMaster />
        <ToastContainer />
    </Provider>
);
```

---

## ⚙️ 2. Custom Hook `useToast`

Para lanzar notificaciones desde cualquier componente de React, utiliza el hook `useToast`.

```tsx
import { useToast } from '@/common/hooks';
```

### Métodos Disponibles:

| Método | Argumentos | Descripción |
| :--- | :--- | :--- |
| `showSuccess(message, options?)` | `(message: string, options?: ToastOptions)` | Lanza un toast de éxito con borde verde. |
| `showError(message, options?)` | `(message: string, options?: ToastOptions)` | Lanza un toast de error con borde rojo. |
| `showInfo(message, options?)` | `(message: string, options?: ToastOptions)` | Lanza un toast informativo con borde en color primario del tema. |
| `showWarning(message, options?)` | `(message: string, options?: ToastOptions)` | Lanza un toast de advertencia con borde amarillo/ámbar. |
| `showCustom(message, options?)` | `(message: string, options?: ToastOptions)` | Lanza un toast neutro con estilo base del tema. |
| `dismissToast(toastId?)` | `(toastId?: string \| number)` | Cierra una notificación específica o todas si se omite el ID. |

---

## 🎨 3. Ejemplos de Uso

```tsx
import React from 'react';
import { Button } from '@/common/components/button/Button';
import { useToast } from '@/common/hooks';

export const InvitationForm: React.FC = () => {
    const { showSuccess, showError, showInfo, showWarning } = useToast();

    const handleConfirm = () => {
        showSuccess('¡Asistencia confirmada!', {
            description: 'Hemos registrado tu respuesta correctamente.',
        });
    };

    const handleError = () => {
        showError('No se pudo enviar', {
            description: 'Verifica tu conexión e intenta de nuevo.',
        });
    };

    const handleInfo = () => {
        showInfo('Código de vestimenta', {
            description: 'Formal / Traje de noche.',
        });
    };

    const handleWarning = () => {
        showWarning('Fecha límite cercana', {
            description: 'Recuerda confirmar antes del 30 de Septiembre.',
        });
    };

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={handleConfirm}>Confirmar</Button>
            <Button variant="secondary" onClick={handleError}>Error</Button>
            <Button variant="outline" onClick={handleInfo}>Info</Button>
            <Button variant="tertiary" onClick={handleWarning}>Advertencia</Button>
        </div>
    );
};
```

---

## ⚙️ 4. Opciones de Personalización (`ToastOptions`)

Cada método acepta un segundo argumento opcional `options` que extiende la API de Sonner:

```tsx
showSuccess('¡Guardado!', {
    description: 'Descripción detallada bajo el título',
    duration: 5000,          // Duración en milisegundos
    action: {
        label: 'Deshacer',
        onClick: () => console.log('Deshecho'),
    },
    onDismiss: () => console.log('Toast cerrado'),
});
```

---

## 💅 5. Personalización de Estilos SCSS ([_toast.scss](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/common/components/toast/_toast.scss))

Los toasts utilizan clases CSS personalizadas para vincularse al sistema de diseño activo:

- **Contenedor `.toast-custom`**: Aplica fondo blanco, bordes suavizados (`border-radius: 1.2rem`) y elevación con sombra.
- **Título `[data-title]`**: Aplica la tipografía serif del paquete de fuentes activo (`$font-serif`).
- **Descripción `[data-description]`**: Aplica la tipografía sans-serif del paquete activo (`$font-sans`).
- **Bordes laterales**: Clases `.toast-success`, `.toast-error`, `.toast-info`, `.toast-warning`.
