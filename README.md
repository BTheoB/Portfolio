# Portfolio — Théo Bastienne-Banco

Portfolio personnel développé à la main pour présenter mes projets et compétences en développement full stack.

🔗 **Site en ligne :** [[https://theobastienne.com](https://theobastienne.com)]

##  Aperçu

Ce portfolio a été pensé comme une démonstration concrète de compétences techniques (front-end, animations, structuration de contenu), avec une attention particulière portée aux détails visuels et à l'expérience utilisateur.

##  Stack technique

| Catégorie | Technologies |
|---|---|
| Framework | [Astro](https://astro.build/) |
| UI interactive | React + TypeScript |
| Styles | Tailwind CSS v4 |
| Animations | GSAP (ScrollTrigger, SplitText, ScrambleText) |
| Contenu | Astro Content Collections + validation Zod |
| Médias | `yet-another-react-lightbox` (zoom, navigation, support vidéo) |
| 3D | Google `<model-viewer>` |
| Icônes | astro-icon (Simple Icons, Iconify) |

##  Fonctionnalités

- **Thème clair / sombre** — bascule persistante via `localStorage`, sans flash de contenu au chargement
- **Curseur lumineux** — halo qui suit le curseur
- **Texte animé** — effet "scramble" sur des textes, via GSAP `ScrambleTextPlugin`
- **Apparition progressive au scroll** — effets sur les médias et sections révélés avec `ScrollTrigger`
- **Galerie de projets** — Modale (Pop-up) avec zoom, navigation entre médias, et lecture vidéo intégrée
- **Modèle 3D interactif** — buste scanné, manipulable à la souris/au tactile
- **Design system cohérent** — variables CSS centralisées (couleurs, typographie fluide en `clamp()`) partagées entre les deux thèmes
- **Contenu structuré** — chaque projet est un fichier Markdown avec frontmatter validé (Zod), séparant métadonnées et contenu détaillé
- **Responsive** — attention particulière sur la mise en page adaptative mobile/tablette/desktop

##  Structure du projet

```
/
├── public/
│   ├── 3d/                  # Modèles 3D (.glb)
│   ├── cv-*.pdf             # CV téléchargeable
|   └── medias               # Le contenue image et video
├── src/
│   ├── components/
│   │   ├── astro/           # Composants statiques (.astro)      
│   │   │   └── ProjectHead.astro
│   │   └── react/           # Composants interactifs (.tsx)
│   │       ├── BorderStyle.tsx
│   │       ├── GlowCursor.tsx
│   │       ├── ProjectLightbox.tsx
│   │       ├── ProjectScroll.tsx
│   │       ├── RotatingMe.tsx
│   │       ├── ScrambleText.tsx
│   │       └── ThemeToggle.tsx
│   ├── content/
│   │   ├── projects/        # Fiches projets (Markdown)
│   │   └── projectsMockUp/  # Projets de démonstration
│   ├── content.config.ts    # Schémas de validation des collections
│   ├── layouts/
│   ├── pages/
│   └── styles/
│       └── global.css       # Thème, variables, typographie
└── astro.config.mjs
```

##  Installation

```bash
# Cloner le dépôt
git clone https://github.com/BTheoB/Portfolio.git
cd [Portfolio]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site est alors accessible sur `http://localhost:4321`.

##  Scripts disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Génère la version de production |
| `npm run preview` | Prévisualise le build de production en local |

##  Ajouter un projet

Chaque projet est un fichier Markdown dans `src/content/projects/`, structuré ainsi :

```markdown
---
title: "Nom du projet"
description: "Résumé court affiché sur la carte projet"
media:
  - "chemin/vers/image.jpg"
  - "chemin/vers/video.mp4"
displayStructure: [2, 1]  # Répartition des médias par ligne d'affichage
technologies: ["React", "TypeScript"]
githubUrl: "https://github.com/..."
date: 2025-03-15
---

## Le contexte

Contenu détaillé du projet, en Markdown complet (titres, listes, etc.)
```

Le schéma est validé automatiquement via Zod (`content.config.ts`) — notamment la cohérence entre `media` et `displayStructure`.

##  Licence

Projet personnel — libre de consultation pour d'inspiration, merci de ne pas réutiliser le contenu (textes, médias).

##  Contact
- Mail : tbastienne@gmail.com
- GitHub : [@BTheoB](https://github.com/BTheoB)
- LinkedIn : [Théo Bastienne-Banco](https://www.linkedin.com/in/théo-bastienne-banco-0ba518163)