# 🧙‍♂️ CLI Wizard: Generador Interactivo de Invitaciones (`create-invitation`)

El asistente interactivo `create-invitation` solicita los datos completos del evento para configurar y desplegar una nueva invitación para clientes sin tocar una sola línea de código.

Ruta de destino predeterminada: `C:\Users\roman\OneDrive\Escritorio\proyectos-desarrollo\invitaciones\Clientes`

---

## 🚀 Cómo Usarlo

Desde la terminal del proyecto raíz, ejecuta:

```bash
npm run create:invitation
```

---

## 📋 Las 14 Preguntas del Asistente

1. **Nombre de los novios / festejados**: (ej: `María & Carlos`).
2. **Fecha de la ceremonia religiosa**: (ej: `2026-11-20`).
3. **Hora de la ceremonia religiosa**: (ej: `17:00 HRS`).
4. **Dirección Completa (Ceremonia Religiosa)**: (ej: `Catedral Metropolitana`).
5. **URL de Google Maps (Ceremonia Religiosa)**: (ej: `https://maps.google.com/...`).
6. **Fecha de la fiesta / recepción**: (ej: `2026-11-20`).
7. **Hora de la fiesta / recepción**: (ej: `19:00 HRS`).
8. **Dirección Completa (Fiesta / Recepción)**: (ej: `Salón Los Pinos`).
9. **URL de Google Maps (Fiesta / Recepción)**: (ej: `https://maps.google.com/...`).
10. **Itinerario de eventos**: Bucle interactivo que solicita la hora y el título de cada amenidad hasta ingresar `-1`.
11. **Título de Mesa de Regalos**: (ej: `Mesa de Regalos Liverpool`).
12. **Link / URL de la Mesa de Regalos**: (ej: `https://mesaderegalos.liverpool.com.mx`).
13. **Paleta de Colores a usar**: (Selección interactiva de las 8 paletas oficiales registradas en `_palettes.scss`).
14. **Estilo de Tipografía (Font Pack)**: (Selección interactiva de los 5 Packs oficiales registrados en `_fonts.scss`).

---

## ⚙️ ¿Qué hace internamente?

1. Duplica la estructura del proyecto en `Clientes/<nombre-carpeta>`.
2. Genera el manifiesto [invitation.config.json](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/invitation.config.json) con todas las respuestas capturadas.
3. Ejecuta `node scripts/sync-theme.js` en la carpeta generada para compilar los tokens de fuentes y colores.
4. Muestra las instrucciones finales para ejecutar `npm run dev` en el nuevo proyecto.
