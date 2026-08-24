# Componente Encabezado de Sección (`SectionHeader`)

El componente `SectionHeader` genera encabezados de sección elegantes y reutilizables para invitaciones de eventos. Adapta la paleta de colores activa (`$color-primary`, `$color-text-600`) y las tipografías del tema (`$font-cursive`, `$font-serif`, `$font-sans`).

---

## 📦 1. Importación

```tsx
import { SectionHeader } from '@/common/components/section-header/SectionHeader';
```

---

## ⚙️ 2. API & Props de `<SectionHeader />`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `string` | *(Requerido)* | Título principal de la sección (ej. "Ubicación del Evento"). Usa la fuente `$font-serif`. |
| `pretitle` | `string` | `undefined` | Texto secundario superior (ej. "Acompáñanos a celebrar"). |
| `subtitle` | `string` | `undefined` | Descripción inferior aclaratoria. Usa la fuente `$font-sans`. |
| `icon` | `React.ReactNode` | `undefined` | Icono decorativo dentro de una insignia circular. |
| `align` | `'center' \| 'left' \| 'right'` | `'center'` | Alineación del texto y los elementos del encabezado. |
| `variant` | `'cursive' \| 'uppercase'` | `'cursive'` | Estilo del `pretitle` (`'cursive'`: fuente cursiva del tema, `'uppercase'`: fuente sans mayúscula con espaciado). |
| `className` | `string` | `''` | Clases CSS adicionales. |

---

## 🎨 3. Ejemplos de Uso

### A. Encabezado Centrado Clásico (Cursiva)

```tsx
import { SectionHeader } from '@/common/components/section-header/SectionHeader';
import { HeartIcon } from '@phosphor-icons/react';

<SectionHeader
    icon={<HeartIcon size={24} weight="fill" />}
    pretitle="Acompáñanos a celebrar"
    title="Nuestra Boda"
    subtitle="Un día muy especial que queremos compartir con las personas que más amamos"
    align="center"
/>
```

---

### B. Encabezado Alineado a la Izquierda (Mayúsculas)

```tsx
import { SectionHeader } from '@/common/components/section-header/SectionHeader';
import { MapPinIcon } from '@phosphor-icons/react';

<SectionHeader
    icon={<MapPinIcon size={24} weight="duotone" />}
    pretitle="Dónde & Cuándo"
    title="Ubicación del Evento"
    subtitle="Jardín de las Rosas, Av. de la Paz #120"
    align="left"
    variant="uppercase"
/>
```
