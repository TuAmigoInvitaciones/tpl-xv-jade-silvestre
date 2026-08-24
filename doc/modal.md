# Mecanismo de Modales (`Modal`)

El sistema de modales de la plantilla utiliza un patrón **Master Orchestrator** alimentado por un estado global centralizado en **Redux Toolkit**. Esto permite abrir y cerrar modales desde cualquier componente del proyecto sin lidiar con prop drilling ni estados locales complejos.

---

## 🏗️ 1. Arquitectura del Sistema

El flujo completo se compone de 4 capas:

```
[ Redux State (modal.slice.ts) ] 
              ▲
              │ (dispatch open/close)
       [ useModal Hook ]
              ▲
              │ (triggers & data)
    ┌─────────┴─────────┐
[ Componentes UI ]   [ ModalMaster ]
                       (Renderiza el Modal activo)
```

1. **Redux Slice ([modal.slice.ts](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/store/ui/modal.slice.ts))**: Guarda el nombre del modal activo, su título y su estado abierto/cerrado.
2. **Hook ([useModal.ts](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/common/hooks/useModal.ts))**: Expone la API simplificada (`onOpenModal`, `onCloseModal`, `isOpen`, `modalName`, `modalTitle`).
3. **Orquestador ([ModalMaster.tsx](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/common/components/modal/ModalMaster.tsx))**: Montado una sola vez en la raíz (`InvitationApp.tsx`). Decide qué modal mostrar según `modalName`.
4. **Contenedor Visual ([Modal.tsx](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/common/components/modal/Modal.tsx))**: Proporciona el overlay backdrop oscurecido, animación de entrada, botón de cerrar y la tarjeta responsiva `.modal__card`.

---

## ⚙️ 2. API del Hook `useModal`

```tsx
import { useModal } from '@/common/hooks';

const { isOpen, modalName, modalTitle, onOpenModal, onCloseModal } = useModal();
```

| Retorno / Método | Tipo | Descripción |
| :--- | :--- | :--- |
| `isOpen` | `boolean` | Indica si hay un modal abierto actualmente. |
| `modalName` | `string` | Nombre/ID del modal que se encuentra activo. |
| `modalTitle` | `string` | Título del modal asignado al abrirlo. |
| `onOpenModal(name, title)` | `(name: ModalName, title: string) => void` | Abre el modal correspondiente con el título asignado. |
| `onCloseModal()` | `() => void` | Cierra el modal activo y resetea el estado. |

---

## 🎨 3. Props del Contenedor `<Modal />`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | *(Requerido)* | Contenido interno que se renderizará en el cuerpo del modal. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ancho máximo de la tarjeta (`sm`: 40rem, `md`: 54rem, `lg`: 72rem). |
| `glass` | `boolean` | `false` | Activa un fondo de cristal esmerilado con glassmorphism (`.modal--glass`). |

---

## 🚀 4. Guía Paso a Paso para Crear un Nuevo Modal

### Paso 1: Registrar el Nombre en `modal.slice.ts`

Añade una nueva clave a la constante `MODAL_NAMES`:

```typescript
// src/store/ui/modal.slice.ts
export const MODAL_NAMES = {
    none: 'none',
    rsvp: 'rsvp',              // <-- Nuevo modal
    dressCode: 'dressCode',    // <-- Nuevo modal
    giftTable: 'giftTable',    // <-- Nuevo modal
} as const;
```

### Paso 2: Crear el Componente del Modal

Crea tu componente utilizando la carcasa `<Modal>`:

```tsx
// src/modules/invitation/components/RsvpModal.tsx
import React from 'react';
import { Modal } from '@/common/components/modal/Modal';

export const RsvpModal: React.FC = () => {
    return (
        <Modal size="md">
            <p>Formulario de confirmación de asistencia...</p>
        </Modal>
    );
};
```

### Paso 3: Vincular el Modal en `ModalMaster.tsx`

Importa tu nuevo modal y añádelo al orquestador:

```tsx
// src/common/components/modal/ModalMaster.tsx
import React from 'react';
import { useModal } from '@/common/hooks';
import { MODAL_NAMES } from '@/store/ui/modal.slice';
import { RsvpModal } from '@/modules/invitation/components/RsvpModal';

export const ModalMaster: React.FC = () => {
    const { isOpen, modalName } = useModal();

    return (
        <>
            {isOpen && modalName === MODAL_NAMES.rsvp && <RsvpModal />}
        </>
    );
};
```

### Paso 4: Disparar el Modal desde Cualquier Botón o Componente

```tsx
import React from 'react';
import { Button } from '@/common/components/button/Button';
import { useModal } from '@/common/hooks';
import { MODAL_NAMES } from '@/store/ui/modal.slice';

export const InvitationHeader: React.FC = () => {
    const { onOpenModal } = useModal();

    return (
        <Button onClick={() => onOpenModal(MODAL_NAMES.rsvp, 'Confirmar Asistencia')}>
            Confirmar Asistencia
        </Button>
    );
};
```

---

## 💅 5. Clases CSS BEM (`_modal.scss`)

```html
<!-- Estructura renderizada dinámicamente -->
<div class="modal modal--md">
    <div class="modal__card">
        <header class="modal__header">
            <h2 class="modal__title">Confirmar Asistencia</h2>
            <!-- Botón de cerrar -->
        </header>

        <div class="modal__container">
            <!-- Contenido del modal -->
        </div>
    </div>
</div>
```
