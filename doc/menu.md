# Componente de Menú (`Menu` & `MenuSidebar`)

El sistema de menú de navegación proporciona un cajón lateral (Sidebar Drawer) controlado mediante estado global en **Redux Toolkit** ([menu.slice.ts](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/store/ui/menu.slice.ts)) y el hook `useMenu`. Permite alternar fácilmente mediante la prop `variant` entre un **botón flotante** en la parte superior izquierda o una **barra superior** a todo el ancho de la pantalla.

---

## 📋 Pasos Paso a Paso para Implementar y Configurar el Menú

1. **Importar el componente `Menu`**:
   ```tsx
   import { Menu } from '@/common/components/menu/Menu';
   ```
2. **Definir la lista de opciones de navegación (`items`)**:
   ```tsx
   const menuItems = [
       { label: 'Inicio', href: '#inicio' },
       { label: 'Ubicación', href: '#ubicacion' },
       { label: 'Mesa de Regalos', href: '#regalos' },
       { label: 'Confirmar Asistencia', href: '#rsvp' },
   ];
   ```
3. **Elegir la variante de visualización (`variant`)**:
   - `variant="floating"`: Para un botón circular flotante fijo en la esquina superior izquierda.
   - `variant="bar"`: Para una barra superior fija transparente a todo el ancho de la pantalla.
4. **Configurar la variante de color del botón (`buttonVariant`)**:
   - Asigna la paleta deseada (`buttonVariant="primary"`, `buttonVariant="secondary"`, `buttonVariant="tertiary"`, `buttonVariant="glass"`).
5. **Montar el componente**:
   ```tsx
   <Menu 
       variant="floating" 
       buttonVariant="primary"
       title="Nuestra Boda" 
       items={menuItems} 
   />
   ```

---

## ⚙️ API & Props de `<Menu />`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `variant` | `'floating' \| 'bar'` | `'floating'` | **`'floating'`**: Botón circular flotante fijo en la parte superior izquierda.<br>**`'bar'`**: Barra fija superior que abarca el 100% del ancho con título del evento. |
| `buttonVariant` | `ButtonVariant` | `undefined` | Variante de diseño/color para el botón disparador (`primary`, `secondary`, `tertiary`, `glass`, etc.). |
| `title` | `string` | `'Menú'` | Título mostrado en la barra superior o en la cabecera del Sidebar. |
| `items` | `MenuItem[]` | `[]` | Lista de enlaces o acciones del menú. Cada opción utiliza internamente el componente `<Button variant="ghost">`. |
| `sidebarChildren` | `React.ReactNode` | `undefined` | Contenido personalizado para reemplazar la lista predeterminada. |

---

### Estructura de `MenuItem`

```typescript
export interface MenuItem {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}
```

---

## 🎨 Ejemplos de Uso

### A. Variante Botón Flotante (`variant="floating"`)

```tsx
import React from 'react';
import { Menu } from '@/common/components/menu/Menu';
import { HouseIcon, MapPinIcon, GiftIcon, CheckCircleIcon } from '@phosphor-icons/react';

export const InvitationPage: React.FC = () => {
    const menuItems = [
        { label: 'Inicio', href: '#inicio', icon: <HouseIcon size={20} /> },
        { label: 'Ubicación', href: '#ubicacion', icon: <MapPinIcon size={20} /> },
        { label: 'Mesa de Regalos', href: '#regalos', icon: <GiftIcon size={20} /> },
        { label: 'Confirmar Asistencia', href: '#rsvp', icon: <CheckCircleIcon size={20} /> },
    ];

    return (
        <Menu 
            variant="floating" 
            buttonVariant="primary"
            title="Nuestra Boda" 
            items={menuItems} 
        />
    );
};
```

---

### B. Variante Barra Superior Completa (`variant="bar"`)

```tsx
import React from 'react';
import { Menu } from '@/common/components/menu/Menu';

export const InvitationPage: React.FC = () => {
    const menuItems = [
        { label: 'Nuestra Historia', href: '#historia' },
        { label: 'Itinerario', href: '#itinerario' },
        { label: 'Código de Vestimenta', href: '#vestimenta' },
    ];

    return (
        <Menu 
            variant="bar" 
            buttonVariant="ghost"
            title="María & Carlos" 
            items={menuItems} 
        />
    );
};
```

---

## 🛠️ API del Hook `useMenu`

El hook `useMenu` permite interactuar con el estado del menú desde cualquier componente:

```tsx
import { useMenu } from '@/common/hooks';

const { isOpen, onOpenMenu, onCloseMenu } = useMenu();
```

| Prop / Método | Tipo | Descripción |
| :--- | :--- | :--- |
| `isOpen` | `boolean` | `true` si el cajón lateral (`MenuSidebar`) está desplegado. |
| `onOpenMenu()` | `() => void` | Abre el cajón lateral. |
| `onCloseMenu()` | `() => void` | Cierra el cajón lateral. |
