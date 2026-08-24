# Componente Reproductor de Música (`MusicPlayer`)

El componente `MusicPlayer` proporciona un reproductor de audio flexible para la música de fondo de la invitación. Permite alternar mediante la prop `variant` entre un **botón flotante** circular (sin etiquetas estorbosas) o una **tarjeta contenedora** completa (caja con título, estado y botón). Está sincronizado con el estado global de **Redux Toolkit** ([music.slice.ts](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/store/ui/music.slice.ts)) y utiliza el custom hook `useMusicPlayer`.

---

## 📦 1. Importación

```tsx
import { MusicPlayer } from '@/common/components/music-player/MusicPlayer';
```

---

## ⚙️ 2. API & Props de `<MusicPlayer />`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `variant` | `'floating' \| 'card'` | `'floating'` | **`'floating'`**: Únicamente el botón flotante circular en la esquina inferior derecha.<br>**`'card'`**: Tarjeta/caja contenedora embebida con icono, título del tema, estado/ecualizador y botón. |
| `src` | `string` | `'/audio/background-music.mp3'` | Ruta del archivo de audio MP3/WAV a reproducir. |
| `songTitle` | `string` | `'Música de fondo'` | Título de la canción (mostrado en la variante `card`). |
| `artistName` | `string` | `'Música del evento'` | Subtítulo/Artista (mostrado cuando está pausado en la variante `card`). |
| `className` | `string` | `''` | Clases CSS adicionales. |

---

## 🎨 3. Ejemplos de Uso

### A. Variante Botón Flotante (`variant="floating"`)

Monta un botón circular flotante limpio sin etiquetas fijado en la esquina inferior derecha (`position: fixed; bottom: 2rem; right: 2rem; z-index: 800`).

```tsx
import React from 'react';
import { MusicPlayer } from '@/common/components/music-player/MusicPlayer';
import song from '@/assets/music/song-2.mp3';

export const InvitationPage = () => (
    <MusicPlayer 
        variant="floating" 
        src={song} 
    />
);
```

---

### B. Variante Caja / Tarjeta (`variant="card"`)

Monta una tarjeta contenedora embebida dentro de cualquier sección de la invitación (por ejemplo, en la portada o en una tarjeta con la canción de los novios):

```tsx
import React from 'react';
import { MusicPlayer } from '@/common/components/music-player/MusicPlayer';
import song from '@/assets/music/song-2.mp3';

export const MusicSection = () => (
    <div style={{ padding: '2rem' }}>
        <MusicPlayer 
            variant="card" 
            src={song}
            songTitle="A Thousand Years - Christina Perri"
            artistName="Canción de Entrada"
        />
    </div>
);
```

---

## 🛠️ 4. API del Hook `useMusicPlayer`

Permite controlar la reproducción desde cualquier otro componente de la invitación (por ejemplo, desde un botón en la portada):

```tsx
import { useMusicPlayer } from '@/common/hooks';

const { isPlaying, onPlayMusic, onPauseMusic, onToggleMusic } = useMusicPlayer();
```

| Prop / Método | Tipo | Descripción |
| :--- | :--- | :--- |
| `isPlaying` | `boolean` | `true` si el audio está en reproducción. |
| `onPlayMusic()` | `() => void` | Inicia la reproducción de la música. |
| `onPauseMusic()` | `() => void` | Pausa la reproducción de la música. |
| `onToggleMusic()` | `() => void` | Alterna entre reproducir y pausar. |

---

## 💅 5. Estilos SCSS ([_music-player.scss](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/common/components/music-player/_music-player.scss))

- **`.music-player--floating`**: Botón circular flotante con sombra de elevación y animación `pulseGlow` durante la reproducción.
- **`.music-player--card`**: Tarjeta contenedora responsiva (`max-width: 44rem`) con icono de nota musical animado (`spinSlow`), título en la fuente del tema (`$font-serif`) y botón `<Button>`.
- **`.music-player__equalizer`**: Ecualizador animado de 3 barras que oscilan durante la reproducción.
