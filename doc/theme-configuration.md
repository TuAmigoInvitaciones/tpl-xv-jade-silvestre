# ⚙️ Propósito y Visión de `invitation.config.json` (Manifiesto de Invitación)

`invitation.config.json` es el **Manifiesto Declarativo y Única Fuente de Verdad** (Single Source of Truth) de la invitación. Su objetivo es desacoplar por completo la infraestructura de la plantilla (componentes React, Redux, temas Sass) de los datos y preferencias visuales de cada cliente final.

---

## 🎯 ¿Cuál es el punto de tener `invitation.config.json`?

1. **Desacoplamiento Total**: La aplicación en React funciona como un **Motor de Renderizado Dinámico**. Los componentes no contienen textos ni configuraciones "hardcodeadas", sino que se adaptan reactivamente a las banderas y valores de este JSON.
2. **Generación Automatizada (CLI Wizard / Panel de Administración)**:
   Este archivo es la pieza clave para la automatización total. Permite que en el futuro un script de consola (CLI Wizard interactivo) o un panel web cree un proyecto completo a partir de esta plantilla simplemente generando este archivo de configuración.

---

## 🚀 Flujo de Automatización Futuro (CLI Wizard)

Al ejecutar el script de creación automatizada (ej. `npm run create-invitation`):

```
┌─────────────────────────────────────────────────────────────┐
│              🧙‍♂️ WIZARD DE CREACIÓN DE INVITACIÓN             │
└─────────────────────────────────────────────────────────────┘
  1. ¿Qué tipo de evento es? ➔ Boda / XV Años / Aniversario
  2. Nombres de los festejados ➔ María & Carlos
  3. ¿Qué paquete de fuentes deseas? ➔ Pack 3 (Bodoni & Garamond)
  4. ¿Qué paleta de colores deseas? ➔ Paleta 6 (Dorado & Crema)
  5. ¿Variante de Menú? ➔ Barra Superior ('bar')
  6. ¿Variante de Música? ➔ Flotante ('floating')
  7. ¿Secciones activas? ➔ Hero, Countdown, Places, Itinerary, DressCode, Presents, Confirmation
  8. ¿Requiere sistema de boletería/claves? ➔ No (hasTicketingSystem: false)
```

### ⚡ Acciones Automatizadas del Wizard:
1. **Clona la Plantilla**: Copia la estructura limpia de `invitation-template` a un nuevo proyecto (ej. `dist-clients/boda-maria-carlos/`).
2. **Genera `invitation.config.json`**: Escribe las opciones seleccionadas en el manifiesto.
3. **Ejecuta Sincronización Automática**: Llama a `npm run theme:sync` para compilar los tokens de Sass (`_active_theme.scss`).
4. **Proyecto Listo**: Deja la invitación lista para que solo agregues el contenido creativo específico.

---

## 📄 Estructura de `invitation.config.json`

```json
{
  "theme": {
    "fontPack": 3,
    "palette": 6,
    "buttonVariant": "primary",
    "menu": {
      "variant": "bar",
      "title": "María y Carlos",
      "buttonVariant": "icon"
    },
    "music": {
      "variant": "floating",
      "buttonVariant": "secondary",
      "songTitle": "Música de fondo",
      "artistName": "Música del evento"
    }
  },
  "config": {
    "hasTicketingSystem": false,
    "hasRSVP": true,
    "hasMusic": true
  },
  "sections": {
    "hero": {
      "showHero": true,
      "names": "María & Carlos",
      "subtitle": "Nos complace invitarte a celebrar el día más importante de nuestras vidas",
      "date": "20 DE NOVIEMBRE, 2026"
    },
    "countdown": {
      "showCountdown": true,
      "targetDate": "2026-11-20T17:00:00"
    },
    "places": {
      "showPlaces": true
    },
    "itinerary": {
      "showItinerary": true
    },
    "dressCode": {
      "showDressCode": true
    },
    "gallery": {
      "showGallery": true
    },
    "presents": {
      "showPresents": true
    },
    "confirmation": {
      "showConfirmation": true
    }
  }
}
```
