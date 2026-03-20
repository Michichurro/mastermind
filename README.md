# Brand Soul Discovery

**Brand Soul Discovery** es una experiencia interactiva de quiz que ayuda a marcas y emprendedores a identificar sus arquetipos de marca — los pilares simbólicos que dan forma a la identidad, la comunicación y la personalidad de una marca.

Al finalizar, el usuario obtiene su **Top 3 de arquetipos** con un análisis visual y porcentual de su esencia de marca.

---

## ¿Qué hace?

Una experiencia de 3 fases:

| Fase | Nombre | Mecánica |
|------|--------|----------|
| 1 | **Calibrador** | El usuario elige la carta que más resuena con él (de 4 opciones). Define el grupo principal. |
| 2 | **Entrevista Ciega** | 6 preguntas situacionales. Cada respuesta acumula puntos en arquetipos ocultos. |
| 3 | **ADN de Palabras** | Selección de 3 palabras clave de una grilla visual. Afina y confirma el resultado. |

Al terminar, la pantalla de resultados muestra:
- El **podio de los 3 arquetipos** dominantes (alma, estilo, ingrediente secreto).
- El **Viaje de Descubrimiento**: un recuento visual de todas las cartas seleccionadas durante la experiencia.
- Un CTA estratégico para contactar al estudio.

---

## Stack técnico

- **React 19** + **Vite 7**
- **Tailwind CSS v4**
- **Framer Motion** — animaciones y transiciones
- **Howler.js** — audio ambiente (Boléro loop + SFX)
- **i18n** propio — soporte bilingüe Español / Inglés

---

## Arquitectura de componentes

```
src/
├── App.jsx                  # Router principal + estado global de scores e historial
├── components/
│   ├── WelcomeScreen.jsx
│   ├── BrandTypeScreen.jsx
│   ├── BrandNameScreen.jsx
│   ├── Phase1Screen.jsx     # Calibrador (fan de cartas móvil + drag & drop desktop)
│   ├── Phase2Screen.jsx     # Entrevista Ciega
│   ├── Phase3Screen.jsx     # ADN de Palabras
│   ├── Phase4LeadCapture.jsx
│   ├── ResultsScreen.jsx    # Podio + Viaje de Descubrimiento
│   └── ui/
│       ├── AnswerCard.jsx   # Componente de carta compartido (fases 1, 2 y resumen)
│       ├── BrandCarousel.jsx
│       ├── SoundToggle.jsx
│       └── ProgressBar.jsx
├── context/
│   ├── LanguageContext.jsx
│   └── SoundContext.jsx
└── data/
    ├── archetypes.js        # Los 12 arquetipos con colores, íconos, descripciones y ejemplos
    ├── phase1-questions.js
    ├── phase2-questions.js
    └── phase3-keywords.js
```

---

## Los 12 Arquetipos

La app trabaja con 12 arquetipos de marca organizados en 4 grupos:

| Grupo | Arquetipos |
|-------|-----------|
| **Poder** | El Gobernante, El Héroe, El Forajido |
| **Estructura** | El Cuidador, El Creador, El Inocente |
| **Pertenencia** | El Amante, El Bufón, El Hombre Común |
| **Libertad** | El Explorador, El Sabio, El Mago |

---

## Correr localmente

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## Build de producción

```bash
npm run build
```

El output se genera en `/dist`. La app es 100% estática — no requiere backend.

---

## Deploy en Vercel

1. Importar el repositorio desde Vercel Dashboard.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. No se necesitan variables de entorno.

---

## Créditos

Desarrollado por **Estudio Mastermind**.
Diseño, estrategia y arquetipos de marca: [estudio.mastermind@gmail.com](mailto:estudio.mastermind@gmail.com)
