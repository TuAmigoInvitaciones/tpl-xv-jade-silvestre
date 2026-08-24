# Componente Carrusel (`Carousel` & `CarouselCard`)

El componente `Carousel` implementa **Swiper** internamente y adapta automáticamente las fuentes (`$font-serif`, `$font-sans`, `$font-cursive`) y paleta de colores activa (`$color-primary`, `$color-primary-100`, `$color-primary-300`, `$color-primary-900`).

---

## 📋 Pasos Paso a Paso para Implementar y Configurar un Carrusel

1. **Importar los componentes**:
   ```tsx
   import { Carousel } from '@/common/components/carousel/Carousel';
   import { CarouselCard } from '@/common/components/carousel/CarouselCard';
   ```
2. **Definir los datos de las tarjetas o imágenes**:
   - **Opción A: Carrusel de Tarjetas Informativas / Recuerdos**:
     ```tsx
     const memoryCards = [
         {
             image: 'https://ejemplo.com/foto1.jpg',
             date: '15 de Mayo, 2021',
             title: 'El Día que nos Conocimos',
             description: 'Un café improvisado que se convirtió en una historia de amor.',
             badge: 'Nuestra Historia',
         },
         {
             image: 'https://ejemplo.com/foto2.jpg',
             date: '10 de Diciembre, 2023',
             title: 'La Propuesta',
             description: 'Bajo las estrellas frente al mar dijimos que sí.',
             badge: 'Compromiso',
         },
     ];
     ```
   - **Opción B: Carrusel de Galería de Fotos Pura**:
     ```tsx
     const galleryImages = [
         'https://ejemplo.com/foto1.jpg',
         'https://ejemplo.com/foto2.jpg',
         'https://ejemplo.com/foto3.jpg',
     ];
     ```
3. **Elegir el efecto visual (`effect`)**:
   - `'slide'`: Desplazamiento horizontal clásico.
   - `'coverflow'`: Efecto 3D con perspectiva y profundidad.
   - `'fade'`: Transición suave de desvanecimiento.
   - `'cards'`: Pila de tarjetas superpuestas.
4. **Montar el componente**:
   ```tsx
   <Carousel items={memoryCards} effect="slide" buttonVariant="primary" />
   ```

---

## ⚙️ API & Props de `<Carousel />`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `items` | `CarouselCardProps[]` | `[]` | Lista de tarjetas con imagen, título, fecha y descripción. |
| `images` | `string[]` | `[]` | Lista de URLs de imágenes para una galería limpia. |
| `effect` | `'slide' \| 'fade' \| 'coverflow' \| 'cards'` | `'slide'` | Efecto visual de animación de Swiper. |
| `autoplay` | `boolean` | `true` | Habilita o deshabilita la reproducción automática. |
| `delay` | `number` | `3500` | Tiempo de espera entre diapositivas en milisegundos. |
| `slidesPerView` | `number` | `1` | Número de diapositivas visibles simultáneamente. |
| `showNavigation` | `boolean` | `true` | Muestra u oculta los botones de navegación anterior/siguiente. |
| `showPagination` | `boolean` | `true` | Muestra u oculta la barra de puntos de paginación animada. |
| `buttonVariant` | `ButtonVariant` | `'floating'` | Variante de color/estilo para los botones de navegación (`primary`, `secondary`, `tertiary`, `glass`, etc.). |
| `children` | `React.ReactNode` | `undefined` | Diapositivas personalizadas con `<SwiperSlide>`. |

---

## 🎨 API de `<CarouselCard />`

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `image` | `string` | **(Requerido)** Ruta o URL de la imagen. |
| `title` | `string` | Título de la tarjeta (fuente `$font-serif`). |
| `date` | `string` | Fecha o pretítulo (fuente `$font-cursive`). |
| `description` | `string` | Descripción o historia (fuente `$font-sans`). |
| `badge` | `string` | Etiqueta flotante en la esquina superior izquierda de la foto. |
