# 💻 Guía de Comandos y Scripts del Proyecto

Este proyecto cuenta con scripts y comandos para automatizar la configuración del tema, sincronizar variables de estilos, compilar para producción y optimizar imágenes recursivamente.

---

## 🛠️ Comandos Disponibles en `package.json`

### 1. `npm run dev`
- **¿Para qué sirve?**: Inicia el servidor de desarrollo local de Vite con recarga rápida (HMR).
- **Ejecución previa**: Ejecuta automáticamente `npm run theme:sync` en segundo plano para asegurar que los colores y fuentes en `invitation.config.json` estén aplicados.
- **Uso**:
  ```bash
  npm run dev
  ```

---

### 2. `npm run build`
- **¿Para qué sirve?**: Ejecuta la verificación estática de TypeScript (`tsc -b`) y empaqueta el proyecto para producción en la carpeta `dist/`.
- **Ejecución previa**: Sincroniza automáticamente los estilos con `npm run theme:sync`.
- **Uso**:
  ```bash
  npm run build
  ```

---

### 3. `npm run theme:sync`
- **¿Para qué sirve?**: Lee la configuración de `invitation.config.json` y genera automáticamente el archivo Sass [_active_theme.scss](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/common/styles/_active_theme.scss), asignando el paquete de fuentes y la paleta cromática activa.
- **Uso**:
  ```bash
  npm run theme:sync
  ```

---

### 4. `npm run theme:set` / `node scripts/set-theme.js`
- **¿Para qué sirve?**: Permite modificar la configuración de tema, variante de menú, música y botones directamente desde la terminal, actualizando [invitation.config.json](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/invitation.config.json) y sincronizando los archivos Sass al instante.

#### 🚩 Banderas Disponibles (Flags):

| Flag | Opciones | Descripción |
| :--- | :--- | :--- |
| `--font=N` | `1` al `5` | Define el paquete de fuentes activo. |
| `--palette=N` | `1` al `8` | Define la paleta de colores activa. |
| `--menu=X` | `floating` \| `bar` | Define si el menú es un botón flotante o una barra fija superior. |
| `--music=X` | `floating` \| `card` | Define si el reproductor de música es un botón flotante o una tarjeta. |
| `--button=X` | `primary` \| `secondary` \| `tertiary` \| `outline` \| `ghost` \| `glass` | Define el estilo de botón predeterminado. |

#### 💡 Ejemplos de Uso:

```bash
# Cambiar Paquete de Fuentes (1 al 5) y Paleta (1 al 8) por orden posicional:
node scripts/set-theme.js 2 3

# Cambiar únicamente el menú a barra y la música a tarjeta:
node scripts/set-theme.js --menu=bar --music=card

# Configurar todos los parámetros en un solo comando:
node scripts/set-theme.js --font=2 --palette=4 --menu=bar --music=floating --button=secondary
```

---

### 5. `node scripts/optimize-images.js`
- **¿Para qué sirve?**: Recorre recursivamente todas las carpetas y subcarpetas dentro de `src/assets/images/`, comprime y optimiza imágenes JPG/PNG a formatos WebP livianos manteniendo la estructura de directorios y creando respaldos.
- **Uso**:
  ```bash
  node scripts/optimize-images.js
  ```
