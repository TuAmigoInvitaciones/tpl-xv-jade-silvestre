# 🎨 Guía de Personalización y Sobrescritura de Componentes

Nuestra arquitectura está diseñada con una **Jerarquía de Prioridad Flexible**. Si en algún momento no deseas que un componente utilice el tema o la configuración global de [invitation.config.json](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/invitation.config.json), dispones de 3 niveles para sobrescribirlo y customizarlo libremente.

---

## 📊 Jerarquía de Prioridad (Order of Precedence)

$$\text{Estilos Inline (`style`)} > \text{Clases SCSS (`className`)} > \text{Props Explícitas en React} > \text{`invitation.config.json`} \text{ (Tema Global)}$$

---

## 🛠️ Métodos de Personalización

### 1. 🥇 Sobrescritura por Props en React (Nivel JS)
Todos los componentes respetan las props explícitas pasadas en JSX sobre la configuración global.

```tsx
{/* Ignora la configuración global y fuerza menú flotante */}
<Menu variant="floating" buttonVariant="ghost" title="Título Personalizado" />

{/* Fuerza tarjeta de música con botón secundario */}
<MusicPlayer variant="card" buttonVariant="secondary" songTitle="Nuestra Canción" />
```

---

### 2. 🥈 Sobrescritura por Clases SCSS / BEM (`className`)
Todos los componentes aceptan la prop `className`. Puedes pasar una clase CSS propia y modificar libremente sus reglas en SCSS:

**En tu componente JSX**:
```tsx
<Accordion items={faqItems} className="accordion-custom-boda" />
```

**En la hoja de estilos SCSS de tu sección**:
```scss
.accordion-custom-boda {
    background-color: #1a1a1a;
    border-color: #d4af37;

    .accordion__header {
        font-family: 'Cinzel', serif;
        color: #d4af37;
    }
}
```

---

### 3. 🥉 Estilos Directos Inline (`style`)
Ideal para ajustes inmediatos sin necesidad de editar hojas SCSS:

```tsx
<Button style={{ backgroundColor: '#e91e63', color: '#ffffff', borderRadius: '50px' }}>
    Botón Exclusivo
</Button>
```
