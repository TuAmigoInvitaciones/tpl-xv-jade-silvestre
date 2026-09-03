# Invitación Digital XV Años — Jade Silvestre

![Evento](https://img.shields.io/badge/Evento-XV%20A%C3%B1os-05445E?style=for-the-badge)
![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-v8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Abrasa RSVP](https://img.shields.io/badge/RSVP-Plataforma%20Abrasa-FF4500?style=for-the-badge)
![Mobile First](https://img.shields.io/badge/Dise%C3%B1o-Mobile%20First-2E7D32?style=for-the-badge)

Plantilla de **Invitación Digital Interactiva** diseñada especialmente para la celebración de **XV Años**. Destaca por su elegante estética botánica en tonos **Jade Silvestre**, detalles dorados, animaciones interactivas, sobre rascable, reproductor de música y sincronización de pases con confirmación RSVP.

---

## Galería y Vista Previa (Espacio para Imágenes)

| Sección | Captura de Pantalla |
| :--- | :---: |
| **Portada & Hero** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470454/TuAmigoInvitaciones/xv/jade-silvestre/1-mockup_hsiqu1.png" width="260" alt="Portada & Hero" /> |
| **Sobre Digital & Scratch Reveal** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470451/TuAmigoInvitaciones/xv/jade-silvestre/15-mockup_gxneyu.png" width="260" alt="Sobre & Rascable" /> |
| **Ubicaciones GPS & Mapas** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470429/TuAmigoInvitaciones/xv/jade-silvestre/3-mockup_ibsytl.png" width="260" alt="Ubicaciones GPS" /> |
| **Itinerario de Celebración** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470436/TuAmigoInvitaciones/xv/jade-silvestre/4-mockup_v4oukw.png" width="260" alt="Itinerario" /> |
| **Código de Vestimenta (Dress Code)** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470444/TuAmigoInvitaciones/xv/jade-silvestre/11-mockup_q5bcma.png" width="260" alt="Dress Code" /> |
| **Mesa de Regalos & Datos Bancarios** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470435/TuAmigoInvitaciones/xv/jade-silvestre/6-mockup_ffnc9z.png" width="260" alt="Mesa de Regalos" /> |
| **Pase Digital & RSVP Abrasa** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788471332/TuAmigoInvitaciones/xv/jade-silvestre/142shots_so_wclir9.png" width="330" alt="Pase Digital & RSVP" /> |
| **Galería & Álbum QR de Invitados** | <img src="https://res.cloudinary.com/dlamufioy/image/upload/v1788470455/TuAmigoInvitaciones/xv/jade-silvestre/5-mockup_zjhvzy.png" width="260" alt="Álbum QR Invitados" /> |

---

## Características y Módulos Incluidos

- **Sobre Digital Interactivo**: Animación de apertura al ingresar a la invitación.
- **Música de Fondo Flotante**: Reproductor de audio ambiental con controles de play/pausa.
- **Conteo Regresivo en Tiempo Real**: Temporizador reactivo hacia la fecha del evento.
- **Sección de Padres y Padrinos**: Espacio dedicado para el cortejo y bendición familiar.
- **Navegación GPS Directa**: Botones interactivos hacia Google Maps (Ceremonia Religiosa y Recepción).
- **Itinerario por Horarios**: Cronograma estructurado con iconos para cada momento del evento.
- **Código de Vestimenta (Dress Code)**: Especificación de etiqueta formal con sugerencia y restricción de colores.
- **Mesa de Regalos Flexible**: Soporte para enlaces departamentales (Liverpool), transferencia bancaria (CLABE) y Lluvia de Sobres.
- **Confirmación RSVP & Pase Digital (Abrasa Sync)**: Gestión de boletos por invitado con código QR.
- **Galería Mosaico & Álbum QR Colaborativo**: Exposición de fotos de la festejada y enlace con código QR para que los invitados suban sus fotografías durante la fiesta.

---

## Personalización (`invitation.config.json`)

Los datos completos de la celebración se configuran desde `invitation.config.json`. Puedes modificar textos, fechas, enlaces y activar/desactivar módulos:

```json
{
  "metaTitle": "Jade Silvestre | Mis XV Años",
  "eventType": "xv",
  "sections": {
    "hero": {
      "names": "Grethel Stefania",
      "subtitle": "Mis XV Años",
      "date": "18 DE DICIEMBRE DE 2026",
      "city": "Aguascalientes, México"
    },
    "places": {
      "showPlaces": true,
      "locations": [
        {
          "title": "Ceremonia Religiosa",
          "venue": "Parroquia del Sagrado Corazón de Jesús",
          "time": "19:00 HRS",
          "url": "https://maps.app.goo.gl/..."
        }
      ]
    },
    "confirmation": {
      "type": "abrasa"
    }
  }
}
```

---

## Recursos Visuales y Multimedia

Para cambiar los contenidos multimedia de la invitación, reemplaza los archivos en las siguientes rutas:

- **Fotografías de la Festejada**: `src/assets/images/photos/`
- **Música de Fondo**: `src/assets/music/`
- **Video de Sobre Digital**: `src/assets/videos/`

---

## Guía Rápida de Comandos

```bash
# 1. Instalar dependencias del proyecto
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Sincronizar tokens SCSS del tema
npm run theme:sync

# 4. Optimizar imágenes de forma recursiva
npm run optimize-images

# 5. Compilar la aplicación para producción
npm run build
```

---

## Arquitectura del Proyecto

```text
tpl-xv-jade-silvestre/
├── public/                      # Favicon, imágenes OG y recursos estáticos
├── src/
│   ├── assets/                  # Imágenes, música, videos y fuentes
│   ├── modules/                 # Componentes React de cada sección
│   ├── styles/                  # Sistema SCSS y tokens de color
│   └── InvitationApp.tsx        # Componente principal de la invitación
├── invitation.config.json       # Configuración central del evento
├── package.json
└── README.md
```
