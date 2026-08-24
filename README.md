# TuAmigoInvitaciones — Sistema de Plantillas & Wizard CLI

![NodeJS](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-v18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-v5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Plataforma](https://img.shields.io/badge/Abrasa-RSVP%20Sync-ff4500?style=flat-square)

Plataforma profesional de maquetación, configuración y generación de **Invitaciones Digitales Interactivas** para Bodas, XV Años, Graduaciones y Fiestas Infantiles.

---

## Características Principales

* **Wizard CLI Interactivo (`npm run create`)**: Generador modular paso a paso para orquestar carpetas de invitaciones listas para producción en `C:\TuAmigoInvitaciones\Paquetes\`.
* **Estructura Comercial Espejo por Piedras Preciosas**: 2 Líneas de Producto (**Sin Fotos** vs **Con Fotos**) con los paquetes **Bronce**, **Platino**, **Oro**, **Rubí**, **Esmeralda** y **Cuarzo**.
* **Manifiesto Dinámico (`invitation.config.json`)**: Control centralizado de flags de secciones, colores, fuentes tipográficas y configuración del evento.
* **Experiencias Interactivas VIP**:
  * **Scratch Reveal (Rascable)** en portada.
  * **Álbum QR de Invitados** para recolección de fotografías durante la fiesta.
  * **Monograma Exclusivo** personalizado.
  * **Botonera Save The Date** integrada con Google/Apple Calendar.
  * **Gestión RSVP en tiempo real con Plataforma Abrasa**.

---

## Ficha Comercial de Paquetes

La oferta comercial se organiza en 2 variantes (Línea Sin Fotos y Línea Con Fotos), manteniendo idéntica estructura y contenido logístico por nivel de servicio:

| Paquete | Concepto Comercial | Línea SIN Fotos | Línea CON Fotos | Secciones Clave Incluidas |
| :--- | :--- | :---: | :---: | :--- |
| **Bronce** | **Esencial** | **$499.99 MXN** | **$699.99 MXN** | Portada, Sobre Digital, Conteo, Save The Date, Mapas GPS, Itinerario, Dress Code y RSVP WhatsApp. |
| **Platino** | **Intermedio** *(Más Vendido)* | **$699.99 MXN** | **$899.99 MXN** | Todo lo de Bronce + Familia & Cortejo + Mesa de Regalos + Hashtag & Despedida + Plataforma Abrasa + Galería (Con Fotos). |
| **Oro** | **VIP Premium** | **$899.99 MXN** | **$1,099.99 MXN** | Todo lo de Platino + Sobre de Lujo + Scratch Reveal + Álbum QR de Fotos + Monograma Exclusivo + Abrasa Pro. |
| **Rubí** | **A la Medida** | **$1,599.00 MXN** | **$1,899.00 MXN** | Maquetación gráfica 100% creada desde cero fuera de catálogo. |
| **Esmeralda** | **Infantil Básica** | **$199.99 MXN** | — | Diseño temático, mapas GPS y confirmación rápida WhatsApp. |
| **Cuarzo** | **Infantil Premium** | **$399.99 MXN** | — | Animaciones, música, Scratch Reveal, galería de fotos y RSVP Abrasa. |

---

## Guía Rápida de Comandos

### 1. Generar una Nueva Invitación
Ejecuta el asistente interactivo en la terminal:
```bash
npm run create
```
El wizard solicitará el tipo de evento, paquete comercial, fuentes, paleta de colores, datos del festejo, ubicaciones, itinerario y mesa de regalos, compilando automáticamente el proyecto listo en `C:\TuAmigoInvitaciones\Paquetes\<nombre-invitacion>`.

### 2. Iniciar Servidor de Desarrollo Local
Para visualizar la invitación en tiempo real con recarga caliente (Vite + React):
```bash
npm run dev
```

### 3. Sincronizar Tokens SCSS de Tema
Para compilar los tokens de colores y fuentes definidos en `invitation.config.json`:
```bash
npm run theme:sync
```

### 4. Optimización Recursiva de Imágenes
Para comprimir todas las imágenes manteniendo la calidad en `src/assets/images/`:
```bash
npm run images:optimize
```

---

## Arquitectura del Proyecto

```text
invitation-template/
├── doc/
│   └── paquetes_invitaciones.md     # Ficha técnica comercial oficial y mapa conceptual
├── scripts/
│   ├── create-invitation.js         # Script orquestador principal
│   ├── sync-theme.js                # Compilador de tokens SCSS
│   ├── optimize-images.js           # Optimizador recursivo de imágenes
│   └── wizard/                      # Módulos del asistente CLI (Pasos 0 a 10)
├── src/
│   ├── modules/                     # Módulos React (Hero, Places, Itinerary, RSVP, Gallery)
│   ├── styles/                      # Sistema de diseño SCSS y tokens croma
│   └── InvitationApp.tsx            # Componente raíz reactivo
├── invitation.config.json           # Manifiesto activo de configuración
└── package.json
```

---

## Documentación Adicional

Para consultar la ficha técnica comercial completa y mapas de jerarquía, revisa [`doc/paquetes_invitaciones.md`](file:///c:/TuAmigoInvitaciones/invitation-template/doc/paquetes_invitaciones.md).
