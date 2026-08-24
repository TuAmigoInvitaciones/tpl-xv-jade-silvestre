# 🪗 Componente `Accordion`

El componente `Accordion` permite desplegar información de forma colapsable y organizada (ej. Preguntas Frecuentes, Notas del Evento, Hospedaje recomendado). Se adapta automáticamente a los colores y tipografía del tema activo (`$font-serif`, `$color-primary`).

---

## 🎨 Variantes (`variant`)

- **`bordered`** (predeterminada): Contenedor unificado con bordes redondeados y separadores de línea fina.
- **`separated`**: Tarjetas independientes para cada item con sombras suaves y resaltado en el item expandido.
- **`glass`**: Tarjetas translucidas con efecto Glassmorphism (`backdrop-filter`).

---

## 💻 Props del Componente (`AccordionProps`)

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `items` | `AccordionItem[]` | `[]` | Lista de preguntas u opciones colapsables. |
| `allowMultiple` | `boolean` | `false` | Si es `true`, permite tener múltiples items abiertos simultáneamente. |
| `variant` | `'bordered' \| 'separated' \| 'glass'` | `'bordered'` | Estilo visual del acordeón. |
| `className` | `string` | `''` | Clases CSS adicionales. |

### Estrutura de `AccordionItem`:

```typescript
export interface AccordionItem {
    id: string | number
    title: string
    content: React.ReactNode
    icon?: React.ReactNode
    defaultOpen?: boolean
    disabled?: boolean
}
```

---

## 💡 Ejemplos de Uso

```tsx
import { Accordion } from '@/common/components/accordion/Accordion'
import { QuestionIcon, CarIcon, ChildIcon } from '@phosphor-icons/react'

const faqItems = [
    {
        id: 1,
        title: '¿Habrá servicio de estacionamiento y valet parking?',
        content: 'Sí, el salón cuenta con valet parking gratuito para todos los invitados a partir de las 18:30 HRS.',
        icon: <CarIcon size={22} />,
        defaultOpen: true,
    },
    {
        id: 2,
        title: '¿Es un evento para adultos o puedo llevar niños?',
        content: 'Por cuestiones de espacio y seguridad del recinto, hemos preparado una recepción exclusivamente para adultos.',
        icon: <ChildIcon size={22} />,
    },
]

export const FaqSection = () => (
    <Accordion items={faqItems} variant="separated" allowMultiple={false} />
)
```
