# Prompt pour Claude Code

Copiez-collez le texte ci-dessous dans Claude Code, à la racine du dépôt de
`acteurs-plastiques`, après y avoir déposé le dossier `design_handoff_refonte_atelier/`.

---

```
Tu vas appliquer une REFONTE VISUELLE à cette application (le site
« Acteurs plastiques » : carte Leaflet + filtres + vues liste/tableau).

RÈGLE ABSOLUE : on ne change QUE l'apparence. Aucune modification de
fonctionnalité, de logique, de données, d'URLs ni de comportement. Le filtrage,
le calcul de distance, l'export CSV, le chargement des données et le câblage
Leaflet doivent fonctionner exactement comme avant. Si un comportement change,
c'est un bug à corriger.

Direction visuelle : « Atelier » (clair, accent vert émeraude #0E8C53).
Marqueurs de carte : forme « Galet » (pastille organique, classe .mk-blob).

RESSOURCES (dans design_handoff_refonte_atelier/) :
- README.md          : doc complète — tokens, balisage, classes, snippets. À LIRE EN ENTIER d'abord.
- acteurs-atelier.css: feuille de style autonome (tokens Atelier figés en :root). À déposer dans le projet.
- icons.js           : jeu d'icônes SVG (types d'acteurs + UI).
- reference_prototype/: prototype exécutable = rendu cible de référence (NE PAS le copier tel quel, NE PAS reprendre son panneau « Tweaks » ni ses données de démo).

DÉROULÉ :
1. Lis design_handoff_refonte_atelier/README.md intégralement.
2. Explore le code existant et dresse la correspondance entre les éléments
   actuels (en-tête, onglets Carte/Liste/Tableau, filtres par type, filtres
   résines, recherche, proximité/rayon, contrôles de carte, légende, marqueurs,
   fiches, tableau) et les classes documentées (.hdr, .seg, .side, .tchip,
   .rpill, .search, .prox, .switch, .rng, .basemap, .zoomer, .legend, .mk-blob,
   .card, .tbl, …). Montre-moi ce plan de correspondance AVANT de coder.
3. Charge les polices (Space Grotesk + Instrument Sans) et inclus
   acteurs-atelier.css après la CSS de Leaflet.
4. Applique les classes/styles au balisage existant. Tu peux réorganiser le
   markup de PRÉSENTATION (ex. transformer les cases à cocher en pastilles
   toggle .tchip), mais conserve les mêmes handlers et la même logique d'état.
5. Pour les marqueurs Leaflet : remplace l'icône actuelle par un L.divIcon
   utilisant le HTML « Galet » du README (.mk + .mk-blob + icône blanche,
   couleur via style="--c: var(--t-<type>)"). Garde les mêmes coordonnées,
   popups et interactions.
6. Reproduis les états documentés (sélection .on / désélection .off des
   pastilles, focus de recherche, survols, responsive < 860px).
7. Vérifie que toutes les fonctionnalités d'origine marchent à l'identique.

CONTRAINTES :
- Réutilise les patterns et la stack déjà présents dans le repo ; n'ajoute pas
  de dépendance lourde (la CSS est autonome, les icônes sont des SVG inline).
- Tout est piloté par des variables CSS (:root). Pour ajuster une couleur ou un
  rayon, modifie le token, pas les règles.
- N'importe PAS les acteurs fictifs du prototype : garde la vraie source de
  données de l'app.

Commence par l'étape 1 (lecture du README), puis présente-moi le plan de
correspondance de l'étape 2.
```
