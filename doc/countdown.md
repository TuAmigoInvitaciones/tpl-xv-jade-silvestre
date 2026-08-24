# ⏱️ Componente `Countdown` (Reloj de Cuenta Regresiva)

El componente `Countdown` muestra el tiempo restante para el evento en tiempo real. Soporta 6 variantes visuales que se adaptan automáticamente al tema activo (`$font-serif`, `$font-sans`, `$color-primary`).

---

## 🎨 Variantes Disponibles (`variant`)

1. **`boxes`** (predeterminada): Cajas rectangulares con bordes suavizados y fondo `$color-primary-100`.
2. **`circles`**: Círculos flotantes independientes con borde y sombra suave.
3. **`inline`**: Formato compacto de una sola línea horizontal (`12 Días : 08 Horas : 45 Min : 30 Seg`).
4. **`grid-2x2`**: Cuadrícula de 2 columnas x 2 filas (ideal para dispositivos móviles o tarjetas compactas).
5. **`minimal`**: Números tipográficos limpios separados por `:`.
6. **`cards`**: Tarjetas con sombras elevadas y realce en los números principales.

---

## 💻 Props del Componente (`CountdownProps`)

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `targetDate` | `string` | **Requerido** | Fecha objetivo (ej. `"2026-11-20T17:00:00"` o `"20/11/2026 17:00"`). |
| `variant` | `'boxes' \| 'circles' \| 'inline' \| 'grid-2x2' \| 'minimal' \| 'cards'` | `'boxes'` | Variante de diseño visual. |
| `showLabels` | `boolean` | `true` | Muestra u oculta las etiquetas (Días, Horas, Min, Seg). |
| `labels` | `CountdownLabels` | `{ days: 'Días', hours: 'Horas', minutes: 'Min', seconds: 'Seg' }` | Personalización del texto de las etiquetas. |
| `className` | `string` | `''` | Clases CSS adicionales. |

---

## 💡 Ejemplos de Uso

```tsx
import { Countdown } from '@/common/components/countdown/Countdown'

// 1. Variante Cajas Rectangulares
<Countdown targetDate="2026-11-20T17:00:00" variant="boxes" />

// 2. Variante Círculos
<Countdown targetDate="2026-11-20T17:00:00" variant="circles" />

// 3. Variante Una Sola Línea (Inline)
<Countdown targetDate="2026-11-20T17:00:00" variant="inline" />

// 4. Variante Cuadrícula 2x2
<Countdown targetDate="2026-11-20T17:00:00" variant="grid-2x2" />
```
