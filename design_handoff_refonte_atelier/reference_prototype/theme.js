/* Trois directions visuelles. Chaque thème pilote :
   - des variables CSS (couleurs, typo, rayons, ombres) appliquées sur la racine
   - des valeurs lues par le JS (fond de carte, forme des marqueurs, couleurs par type) */

window.THEMES = {
  atelier: {
    name: "Atelier",
    tagline: "Épuré, lumineux, précis",
    dark: false,
    markerShape: "pin",
    texture: false,
    tile: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '© OpenStreetMap · © CARTO'
    },
    types: { broyeur: "#E07A1F", recycleur: "#0E8C53", trieur: "#2563EB", negociant: "#7C5CFC" },
    vars: {
      "bg": "#F6F6F2",
      "panel": "#FFFFFF",
      "panel-2": "#F1F1EC",
      "ink": "#1A1E1B",
      "ink-2": "#545A53",
      "ink-3": "#8C9189",
      "line": "#E5E5DF",
      "line-strong": "#D6D6CE",
      "accent": "#0E8C53",
      "accent-2": "#0B7344",
      "accent-ink": "#FFFFFF",
      "accent-soft": "#E5F4EC",
      "radius": "12px",
      "radius-lg": "18px",
      "radius-pill": "999px",
      "shadow-sm": "0 1px 2px rgba(20,24,20,.07)",
      "shadow": "0 1px 2px rgba(20,24,20,.06), 0 10px 28px rgba(20,24,20,.07)",
      "shadow-lg": "0 24px 60px rgba(20,24,20,.16)",
      "font-display": "'Space Grotesk', system-ui, sans-serif",
      "font-body": "'Instrument Sans', system-ui, sans-serif",
      "font-label": "'Space Grotesk', system-ui, sans-serif",
      "display-weight": "600",
      "display-spacing": "-0.02em",
      "display-transform": "none",
      "label-spacing": "0.04em",
      "label-transform": "uppercase",
      "label-weight": "600"
    }
  },

  matiere: {
    name: "Matière",
    tagline: "Chaleureux, organique, tactile",
    dark: false,
    markerShape: "blob",
    texture: true,
    tile: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: '© OpenStreetMap · © CARTO'
    },
    types: { broyeur: "#C0612C", recycleur: "#2E7D52", trieur: "#3E6B8B", negociant: "#9A6B2F" },
    vars: {
      "bg": "#ECE5D6",
      "panel": "#F6F1E6",
      "panel-2": "#E6DCC8",
      "ink": "#2A2920",
      "ink-2": "#5C594A",
      "ink-3": "#8C846F",
      "line": "#D8CDB6",
      "line-strong": "#C7B99C",
      "accent": "#1F4D3A",
      "accent-2": "#163A2B",
      "accent-ink": "#F4EFE2",
      "accent-soft": "#DCE6DB",
      "radius": "16px",
      "radius-lg": "26px",
      "radius-pill": "999px",
      "shadow-sm": "0 1px 2px rgba(60,48,24,.10)",
      "shadow": "0 2px 6px rgba(60,48,24,.10), 0 14px 34px rgba(60,48,24,.10)",
      "shadow-lg": "0 26px 64px rgba(60,48,24,.22)",
      "font-display": "'Newsreader', Georgia, serif",
      "font-body": "'Spline Sans', system-ui, sans-serif",
      "font-label": "'Spline Sans', system-ui, sans-serif",
      "display-weight": "500",
      "display-spacing": "-0.01em",
      "display-transform": "none",
      "label-spacing": "0.06em",
      "label-transform": "uppercase",
      "label-weight": "600"
    }
  },

  signal: {
    name: "Signal",
    tagline: "Contrasté, éditorial, data",
    dark: true,
    markerShape: "tag",
    texture: false,
    tile: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: '© OpenStreetMap · © CARTO'
    },
    types: { broyeur: "#FF8A3D", recycleur: "#54E08A", trieur: "#54C8FF", negociant: "#C79BFF" },
    vars: {
      "bg": "#0D0F0D",
      "panel": "#151915",
      "panel-2": "#1E241E",
      "ink": "#F1F4ED",
      "ink-2": "#A6ACA2",
      "ink-3": "#6C726A",
      "line": "#2A302A",
      "line-strong": "#3A413A",
      "accent": "#C7F24E",
      "accent-2": "#B2DE38",
      "accent-ink": "#0D0F0D",
      "accent-soft": "#1F2A14",
      "radius": "5px",
      "radius-lg": "8px",
      "radius-pill": "4px",
      "shadow-sm": "0 1px 2px rgba(0,0,0,.5)",
      "shadow": "0 2px 8px rgba(0,0,0,.5), 0 14px 34px rgba(0,0,0,.45)",
      "shadow-lg": "0 26px 64px rgba(0,0,0,.6)",
      "font-display": "'Archivo', system-ui, sans-serif",
      "font-body": "'Archivo', system-ui, sans-serif",
      "font-label": "'IBM Plex Mono', ui-monospace, monospace",
      "display-weight": "800",
      "display-spacing": "-0.01em",
      "display-transform": "none",
      "label-spacing": "0.08em",
      "label-transform": "uppercase",
      "label-weight": "600"
    }
  }
};

window.applyTheme = function (key, root) {
  const t = window.THEMES[key] || window.THEMES.atelier;
  const el = root || document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => el.style.setProperty("--" + k, v));
  Object.entries(t.types).forEach(([type, color]) => {
    el.style.setProperty("--t-" + type, color);
  });
  el.setAttribute("data-theme", key);
  el.setAttribute("data-mode", t.dark ? "dark" : "light");
  el.setAttribute("data-texture", t.texture ? "on" : "off");
  return t;
};
