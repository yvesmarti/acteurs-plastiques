# Handoff — Refonte visuelle « Acteurs plastiques » (direction **Atelier**)

## Objectif (à lire en premier)

C'est une **refonte d'apparence uniquement**. L'application existante
(`https://yvesmarti.github.io/acteurs-plastiques/`) garde **exactement** les
mêmes fonctionnalités, la même logique, les mêmes données et le même
comportement. On ne touche **qu'au CSS, au balisage de présentation et au style
des marqueurs de carte**.

> ⚠️ **Ne rien changer côté fonctionnel.** Pas de modification du moteur de
> filtrage, du calcul de distance, du chargement des données, de la logique
> Leaflet, des URLs, ni de l'export CSV. Si une fonctionnalité change de
> comportement, c'est un bug.

Direction visuelle retenue : **Atelier** (clair, lumineux, accent vert émeraude).
Forme des marqueurs retenue : **Galet** (pastille organique — classe `.mk-blob`).

---

## À propos des fichiers de ce dossier

Les fichiers ici sont des **références de design réalisées en HTML/CSS** : un
prototype montrant l'apparence cible. **Il ne s'agit pas de remplacer
l'application existante par ce prototype.** Le travail consiste à **reporter ce
langage visuel sur le code existant**, en réutilisant ses balises et sa logique.

Concrètement, deux ressources sont directement réutilisables telles quelles :

| Fichier | Rôle | Réutilisation |
|---|---|---|
| **`acteurs-atelier.css`** | Feuille de style autonome, tokens Atelier figés (plus de système multi-thèmes). | **À déposer dans le repo** et à brancher sur le balisage existant. |
| **`icons.js`** | Jeu d'icônes SVG (types d'acteurs + UI), `viewBox 0 0 24 24`, `stroke=currentColor`. | À réutiliser pour les marqueurs, pastilles et boutons. |
| `reference_prototype/` | Le prototype complet et **exécutable** (ouvrir `index.html`). | **Référence visuelle uniquement** — sert à voir le rendu cible en vrai. |

Le prototype de référence est déjà réglé sur **Atelier + Galet**. Un panneau
« Tweaks » y existe pour la démo : **il n'est pas à reporter** dans l'app.

### Captures (`screenshots/`)

| Fichier | Montre |
|---|---|
| `01-carte.png` | Vue carte complète : en-tête, sélecteur de vue, sidebar de filtres (pastilles toggle par type, pills résines), légende, bascule de fond de carte, marqueurs **Galet** colorés par type. |
| `02-proximite.png` | Filtre **Proximité** activé : point de référence, cercle de rayon en pointillés, acteurs filtrés et marqueurs colorés (1 couleur par type). |

> Les vues **Liste** (fiches) et **Tableau** ne sont pas en capture ici : ouvrir
> `reference_prototype/index.html` et cliquer les onglets *Liste* / *Tableau*
> pour les voir en vrai (leur style est documenté plus bas).

---

## Fidélité

**Haute fidélité (hifi).** Couleurs, typographies, espacements, rayons et états
sont définitifs. À reproduire au pixel près avec les patterns du code existant.

---

## Comment intégrer (vue d'ensemble)

1. Copier `acteurs-atelier.css` dans le projet et l'inclure **après** la CSS de
   Leaflet.
2. Charger les deux polices Google Fonts (voir plus bas).
3. Mapper les éléments existants sur les **classes** documentées ci-dessous
   (en ajoutant les classes ou en adaptant les sélecteurs, sans changer la
   structure logique). Le balisage est volontairement simple et basé sur des
   classes ; il n'impose aucun framework.
4. Pour les marqueurs Leaflet, remplacer la création d'icône par un
   `L.divIcon` utilisant le HTML « Galet » fourni.
5. Vérifier que **chaque interaction se comporte comme avant** ; seul le style
   change.

> Tout est piloté par des **variables CSS** (`:root` en tête de
> `acteurs-atelier.css`). Pour ajuster une couleur ou un rayon globalement,
> modifier le token — pas les règles.

---

## Tokens de design (thème Atelier)

### Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | `#F6F6F2` | Fond global de l'app |
| `--panel` | `#FFFFFF` | Panneaux (header, sidebar, cartes, contrôles) |
| `--panel-2` | `#F1F1EC` | Fonds secondaires (champ de recherche, pastilles inactives, survols) |
| `--ink` | `#1A1E1B` | Texte principal |
| `--ink-2` | `#545A53` | Texte secondaire |
| `--ink-3` | `#8C9189` | Texte tertiaire / placeholders |
| `--line` | `#E5E5DF` | Bordures |
| `--line-strong` | `#D6D6CE` | Bordures appuyées / pistes de slider |
| `--accent` | `#0E8C53` | Accent (vert émeraude) — actions, sélection |
| `--accent-2` | `#0B7344` | Accent foncé (survol) |
| `--accent-ink` | `#FFFFFF` | Texte sur accent |
| `--accent-soft` | `#E5F4EC` | Fond accent léger (halo focus, badge distance) |

**Couleurs par type d'acteur** (utilisées pour pastilles, marqueurs, badges) :

| Type | Token | Valeur |
|---|---|---|
| Broyeur | `--t-broyeur` | `#E07A1F` (ambre) |
| Recycleur | `--t-recycleur` | `#0E8C53` (vert) |
| Trieur | `--t-trieur` | `#2563EB` (bleu) |
| Négociant | `--t-negociant` | `#7C5CFC` (violet) |

### Rayons

`--radius: 12px` · `--radius-lg: 18px` · `--radius-pill: 999px`

### Ombres

- `--shadow-sm: 0 1px 2px rgba(20,24,20,.07)`
- `--shadow: 0 1px 2px rgba(20,24,20,.06), 0 10px 28px rgba(20,24,20,.07)`
- `--shadow-lg: 0 24px 60px rgba(20,24,20,.16)`

### Typographie

| Token | Police | Usage |
|---|---|---|
| `--font-display` | **Space Grotesk** (600) | Titres, noms d'acteurs, chiffres clés |
| `--font-body` | **Instrument Sans** (400–600) | Texte courant |
| `--font-label` | **Space Grotesk** (600) | Étiquettes en capitales (`text-transform: uppercase`, `letter-spacing: .04em`) |

Chargement (à mettre dans le `<head>`, **avant** `acteurs-atelier.css`) :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Composants & balisage

Les sélecteurs ci-dessous existent tels quels dans `acteurs-atelier.css`.
Réutiliser ces classes sur les éléments correspondants de l'app.

### 1. Coquille de l'app

```html
<div class="app">
  <header class="hdr"> … </header>
  <div class="body">
    <aside class="side"> … </aside>     <!-- filtres -->
    <div class="content"> … </div>      <!-- carte / liste / tableau -->
  </div>
</div>
```
`.app` est en `flex` colonne pleine hauteur ; `.body` en `flex` ligne. La
sidebar fait **332px** de large. `body { overflow: hidden }` (coquille plein
écran). `.side.collapsed` la rétracte (`margin-left: -332px`).

### 2. En-tête + sélecteur de vue (segmented control)

```html
<header class="hdr">
  <div class="brand">
    <div class="brand-mark"><!-- icône recycleur (icons.js) --></div>
    <div class="brand-txt">
      <span class="t">Acteurs plastiques</span>
      <span class="s">Cartographie de la filière de recyclage</span>
    </div>
  </div>
  <div class="seg">
    <button class="on"><!-- icône map -->Carte</button>
    <button>Liste</button>
    <button>Tableau</button>
  </div>
  <div class="hdr-spacer"></div>
  <div class="hdr-stat"><span class="n">40</span><span class="l">/ 40 acteurs affichés</span></div>
</header>
```
- `.seg` = segment de 3 boutons. L'onglet actif porte `.on` (fond `--panel`,
  léger relief). C'est le remplacement « Carte / Liste / Tableau ».
- `.hdr-stat .n` affiche le compteur en `--accent`.

### 3. ⭐ Filtres « type d'acteur » (le composant clé)

Remplace les cases à cocher brutes par de grandes **pastilles toggle**
colorées. C'est l'élément que le client apprécie particulièrement.

```html
<div class="types">
  <button class="tchip on" style="--c: var(--t-broyeur)">
    <span class="dot"><!-- icône broyeur (blanc) --></span>
    <span class="tx">
      <span class="nm">Broyeur</span>
      <span class="ct">8 acteurs</span>
    </span>
    <span class="tick"><!-- icône check --></span>
  </button>
  <!-- recycleur / trieur / négociant : idem, changer --c -->
</div>
```
États (gérés par classes, à piloter par la logique existante) :
- **sélectionné** : `.tchip.on` → bordure `--c`, fond `color-mix(--c 9%, --panel)`,
  case `.tick` remplie + coche visible.
- **désélectionné quand d'autres sont actifs** : `.tchip.off` → opacité .62,
  pastille grisée.
- **neutre (aucun filtre actif)** : classe de base seule.
- survol : translation -1px + bordure `--c`.

La couleur du type est passée par la **variable inline `--c`** sur le `.tchip`
(ex. `style="--c: var(--t-trieur)"`). Le compteur `.ct` reflète le nombre
d'acteurs (logique existante).

### 4. Résines (pills)

```html
<div class="resines">
  <button class="rpill on"><!-- check -->PET</button>
  <button class="rpill">PEHD</button>
  …
</div>
```
`.rpill.on` se remplit en `--accent`. La coche apparaît en fondu à la sélection.

### 5. Recherche

```html
<div class="search">
  <!-- icône search -->
  <input placeholder="Rechercher un acteur, une commune…">
  <button class="clr"><!-- icône close --></button>
</div>
```
Focus : bordure `--accent` + halo `--accent-soft`.

### 6. Carte « Proximité » (interrupteur + ville + rayon)

```html
<div class="prox on">                       <!-- .on quand activé -->
  <div class="prox-hd">
    <div class="lt"><!-- icône crosshair --><b>Proximité</b></div>
    <button class="switch on"></button>      <!-- toggle -->
  </div>
  <div class="ville-row">
    <button class="ville on">Lyon</button>
    <button class="ville">Paris</button> …
  </div>
  <div class="radius-wrap">
    <div class="radius-top">
      <span class="label-kicker">Rayon</span>
      <span class="v">200<small>km</small></span>
    </div>
    <input class="rng" type="range" min="20" max="600" step="10" value="200">
  </div>
</div>
```
- `.switch` = interrupteur custom (pastille qui glisse), `.on` → vert.
- `.rng` = slider stylé (piste fine, pouce vert cerclé de blanc).
- Ces contrôles **remplacent visuellement** les filtres de proximité/rayon
  existants ; la valeur et le calcul de distance restent ceux de l'app.

### 7. Contrôles de carte

```html
<!-- bascule de fond de carte (remplace OSM / CartoDB / Satellite) -->
<div class="basemap">
  <button class="on"><!-- map -->Plan</button>
  <button>OSM</button>
  <button><!-- layers -->Satellite</button>
</div>

<!-- zoom -->
<div class="zoomer">
  <button><!-- plus --></button>
  <button><!-- minus --></button>
</div>

<!-- légende -->
<div class="legend">
  <h5>Légende</h5>
  <ul>
    <li><span class="sw" style="background: var(--t-broyeur)"></span><b>Broyeur</b></li>
    …
  </ul>
</div>
```
Astuce : désactiver le `zoomControl` natif de Leaflet
(`L.map(el, { zoomControl: false })`) et utiliser `.zoomer`, ou simplement
re-styler le contrôle natif. Idem pour l'attribution (déjà stylée dans la CSS
via `.leaflet-control-attribution`).

### 8. ⭐ Marqueurs « Galet » (Leaflet `divIcon`)

Forme retenue : **galet** (`.mk-blob`), pastille organique colorée par type,
icône blanche au centre.

```js
function markerHTML(a) {            // a = acteur { type, … }
  const inner = window.ICONS[a.type];   // depuis icons.js
  const svg = `<span class="ic"><svg width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2.2"
      stroke-linecap="round" stroke-linejoin="round">${inner}</svg></span>`;
  return `<div class="mk" style="--c: var(--t-${a.type})">
            <div class="mk-blob">${svg}</div>
          </div>`;
}

const icon = L.divIcon({
  className: 'mk-wrap',
  html: markerHTML(a),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});
L.marker([a.lat, a.lng], { icon }).addTo(map)
 .bindPopup(popupHTML(a), { closeButton: false, offset: [0, -14] });
```
- Sélection : ajouter `.sel` au `.mk` (contour `--accent`).
- Cercle de proximité : `L.circle(..., { color, fillColor })` avec la valeur de
  `--accent` lue via `getComputedStyle(document.documentElement).getPropertyValue('--accent')`.
- Popup : conteneur `.pop` (badge `.pop-type` coloré, `h4`, `.loc`, `.res`).

### 9. Fiches (vue Liste)

```html
<article class="card" style="--c: var(--t-recycleur)">
  <div class="card-top">
    <div class="card-ic"><!-- icône type, blanc --></div>
    <div class="card-hd">
      <div class="card-type">Recycleur</div>
      <h3>Valoplast Rhône</h3>
    </div>
  </div>
  <div class="card-meta">
    <span><!-- pin -->Villeurbanne (69)</span>
    <span><!-- building -->24 000 t/an</span>
  </div>
  <div class="card-res"><span>PEHD</span><span>PP</span></div>
  <span class="card-dist"><!-- route -->18 km</span>   <!-- si proximité active -->
</article>
```
Liseré couleur à gauche (`--c`), survol = légère élévation. Grille responsive
(`repeat(auto-fill, minmax(290px, 1fr))`).

### 10. Tableau (vue Tableau)

```html
<table class="tbl">
  <thead><tr>
    <th>Nom <!-- icône sort --></th>
    <th>Type d'acteur</th><th>Commune</th><th>Résines</th>
    <th>Distance</th>   <!-- colonne affichée si proximité active -->
  </tr></thead>
  <tbody><tr>
    <td><div class="tbl-name"><span class="tbl-dot" style="--c: var(--t-broyeur)"><!-- icône --></span><b>…</b></div></td>
    <td><span class="tbl-badge">Broyeur</span></td>
    <td>Vénissieux <span class="faint">(69)</span></td>
    <td><div class="tbl-res"><span>PP</span>…</div></td>
    <td><span class="tbl-dist">12 km</span></td>
  </tr></tbody>
</table>
```
En-têtes triables (`th` cliquable, `.sorted` quand actif). Le tri reste celui de
l'app ; on ne fait que reprendre le style.

---

## États & interactions (apparence — comportement inchangé)

- **Transitions** : 0,14–0,2 s sur survols, bascules d'onglets, ouverture
  sidebar (0,32 s `cubic-bezier(.4,0,.1,1)`).
- **Focus clavier** : champ de recherche → halo `--accent-soft`. Conserver des
  états focus visibles sur tous les contrôles interactifs (accessibilité).
- **Sidebar** : poignée `.side-handle` (desktop) ; bouton `.mobile-filter` +
  voile `.scrim` (mobile, < 860px).
- **Vide** : bloc `.empty` (« Aucun acteur trouvé »).
- **Responsive** : sous 860px, la sidebar passe en panneau coulissant
  superposé ; la liste passe sur une colonne. Règles déjà incluses dans la CSS.

---

## Icônes (`icons.js`)

Objet global `window.ICONS` : balisage SVG interne (sans `<svg>`), pour
`viewBox 0 0 24 24`, à tracer en `stroke=currentColor`.

- Types : `broyeur` (engrenage), `recycleur` (boucle), `trieur` (entonnoir),
  `negociant` (échange).
- UI : `search, close, reset, chevronDown/Left/Right, pin, crosshair, layers,
  map, list, table, sliders, plus, minus, sort, download, droplet, building,
  check, route, external`.

Patron d'insertion :
```js
const svg = name => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none"
  stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
  stroke-linejoin="round">${window.ICONS[name]}</svg>`;
```

---

## Récapitulatif des fichiers

| Fichier | À faire |
|---|---|
| `acteurs-atelier.css` | **Déposer dans le repo + brancher** sur le balisage. Tokens en tête. |
| `icons.js` | **Réutiliser** (marqueurs, pastilles, boutons). |
| `reference_prototype/index.html` | Ouvrir comme **référence visuelle** (rendu cible en vrai). |
| `reference_prototype/styles.css` | Version multi-thèmes d'origine (pour comprendre la mécanique des variables). |
| `reference_prototype/components.jsx` | Référence du **balisage** des composants (React, mais les classes sont les mêmes). |
| `reference_prototype/app.jsx` | Référence du câblage Leaflet (marqueurs, cercle, popups, fonds de carte). |
| `reference_prototype/{theme,data}.js` | Mécanique de thème / jeu de données de démo (données **fictives**). |

---

## Garde-fous

- ✅ Reskin uniquement : CSS, classes de présentation, style des marqueurs.
- ✅ Conserver Leaflet, le filtrage, le calcul de distance, l'export CSV, les
  données et URLs existants.
- ❌ Ne pas reprendre le panneau « Tweaks » du prototype.
- ❌ Ne pas importer les **données de démo** du prototype (acteurs fictifs).
- ❌ Ne pas introduire de dépendance lourde : la CSS est autonome, les icônes
  sont des SVG inline.
