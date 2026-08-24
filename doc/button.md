# Componente `Button`

El componente `Button` proporciona un botón flexible, elegante y fuertemente tipado en TypeScript con arquitectura de estilos **BEM** (`.btn`). Está diseñado para adaptarse a las necesidades de las invitaciones de eventos (bodas, XV años, graduaciones, eventos corporativos).

---

## 📋 Pasos Paso a Paso para Implementar y Personalizar Botones

1. **Importar el componente**:
   ```tsx
   import { Button } from '@/common/components/button/Button';
   ```
2. **Seleccionar la variante de diseño (`variant`)**:
   - `primary`, `secondary`, `tertiary`: Para acciones principales y secundarias utilizando los colores de la paleta activa.
   - `outline`, `ghost`: Para acciones secundarias más ligeras.
   - `glass`: Para botones sobre imágenes o capas con desenfoque glassmorphism.
   - `floating`: Para botones flotantes redondos elevados.
3. **Configurar el redondeado de esquinas (`radius` / `rounded`)**:
   - Por defecto no tienen border-radius (`radius="none"`).
   - Para esquinas suavizadas: `radius="sm"`, `radius="md"` o `radius="lg"`.
   - Para botones tipo píldora completamente redondos: `radius="full"` o la prop sintáctica `rounded`.
4. **Agregar Iconos y Estados de Carga (`icon` / `isLoading`)**:
   ```tsx
   import { CalendarIcon } from '@phosphor-icons/react';

   <Button 
       variant="primary" 
       radius="md" 
       icon={<CalendarIcon size={20} />} 
       onClick={() => alert('Evento agendado')}
   >
       Agendar Evento
   </Button>
   ```

---

## ⚙️ API & Props

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'outline' \| 'ghost' \| 'icon' \| 'glass' \| 'floating'` | `'primary'` | Define la variante de diseño del botón (`floating`: circular elevado para botones flotantes). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Define la escala de tamaño (`sm`: 1.2rem, `md`: 1.4rem, `lg`: 1.6rem). |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full' \| string \| number` | `'none'` | Configura el `border-radius` (por defecto rectangulares `0px`). |
| `rounded` | `boolean` | `false` | Alias para bordes completamente redondeados tipo píldora (`radius="full"`). |
| `fullWidth` | `boolean` | `false` | Expande el botón al 100% del ancho disponible (`.btn--full-width`). |
| `icon` | `React.ReactNode` | `undefined` | Elemento o SVG a mostrar como icono dentro del botón. |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Ubicación del icono respecto al texto. |
| `isLoading` | `boolean` | `false` | Renderiza un spinner animado `.btn__spinner` y deshabilita los clics. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción del botón. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo estándar del elemento HTML `<button>`. |
| `className` | `string` | `''` | Clases CSS personalizadas adicionales. |

---

## 🎨 Ejemplos de Uso

```tsx
// Acción Principal
<Button variant="primary">Confirmar Asistencia</Button>

// Acción Secundaria
<Button variant="secondary">Ver Ubicación</Button>

// Acción Acento / Terciarios
<Button variant="tertiary">Mesa de Regalos</Button>

// Delineado (Outline)
<Button variant="outline">Agendar en Calendario</Button>

// Fantasma (Ghost)
<Button variant="ghost">Ver detalles</Button>

// Cristal Esmerilado (Glassmorphism)
<Button variant="glass">Código de Vestimenta</Button>

// Botón Flotante Redondo Elevado
<Button variant="floating" icon={<CalendarIcon size={24} />} />
```
