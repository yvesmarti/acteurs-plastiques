/* ============================================================
   app.jsx — state, filtering, Leaflet map, tweaks
   ============================================================ */

const TILES = {
  satellite: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attribution: "© Esri" },
  osm: { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: "© OpenStreetMap" }
};
const SHAPE_MAP = { auto: null, goutte: "pin", galet: "blob", balise: "tag" };

function markerHTML(a, shape, selected) {
  const inner = window.ICONS[a.type];
  const svg = `<span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg></span>`;
  const cls = shape === "pin" ? "mk-pin" : shape === "blob" ? "mk-blob" : "mk-tag";
  return `<div class="mk ${selected ? "sel" : ""}" style="--c:var(--t-${a.type})">${selected ? '<span class="mk-pulse"></span>' : ""}<div class="${cls}">${svg}</div></div>`;
}
function popupHTML(a) {
  const ti = window.ICONS[a.type], pin = window.ICONS.pin;
  const tsvg = (n, s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`;
  return `<div class="pop">
    <span class="pop-type" style="background:var(--t-${a.type})">${tsvg(ti, 12)}${window.TYPE_LABEL[a.type]}</span>
    <h4>${a.nom}</h4>
    <div class="loc">${tsvg(pin, 13)}${a.commune} (${a.dept})</div>
    <div class="res">${a.resines.map((r) => `<span>${r}</span>`).join("")}</div>
  </div>`;
}

/* ---------- Tweaks: theme picker ---------- */
function ThemePicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {Object.entries(window.THEMES).map(([key, th]) => {
        const on = value === key;
        return (
          <button key={key} onClick={() => onChange(key)} style={{
            display: "flex", alignItems: "center", gap: 10, textAlign: "left", width: "100%",
            padding: "9px 10px", borderRadius: 10, cursor: "default",
            border: on ? "1.5px solid #29261b" : "1.5px solid rgba(41,38,27,.14)",
            background: on ? "rgba(41,38,27,.06)" : "transparent"
          }}>
            <span style={{ display: "flex", gap: 3, flex: "none" }}>
              {Object.values(th.types).map((c, i) => (
                <span key={i} style={{ width: 9, height: 18, borderRadius: 3, background: c }} />
              ))}
            </span>
            <span style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
              <span style={{ display: "block", fontWeight: 700, fontSize: 12 }}>{th.name}</span>
              <span style={{ display: "block", fontSize: 10.5, opacity: .6 }}>{th.tagline}</span>
            </span>
            <span style={{
              width: 16, height: 16, borderRadius: "50%", flex: "none",
              border: on ? "5px solid #29261b" : "1.5px solid rgba(41,38,27,.3)", boxSizing: "border-box"
            }} />
          </button>
        );
      })}
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "atelier",
  "markerShape": "galet",
  "startView": "map"
}/*EDITMODE-END*/;

const DEFAULT_FILTERS = { q: "", types: [], resines: [], proxOn: false, ville: "Lyon", radius: 200 };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useState(t.startView || "map");
  const [f, setF] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState({ col: "nom", dir: "asc" });
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [basemap, setBasemap] = useState("standard");
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const theme = window.THEMES[t.theme] || window.THEMES.atelier;
  const shape = SHAPE_MAP[t.markerShape] || theme.markerShape;

  /* react to start-view tweak */
  useEffect(() => { setView(t.startView); }, [t.startView]);

  /* apply theme variables */
  React.useLayoutEffect(() => { window.applyTheme(t.theme, document.documentElement); }, [t.theme]);

  /* ---------- filtering ---------- */
  const refPt = window.VILLES_REF.find((v) => v.nom === f.ville) || window.VILLES_REF[0];
  const withDist = useMemo(() => window.ACTEURS.map((a) => ({ ...a, _dist: f.proxOn ? window.haversine(refPt, a) : null })), [f.proxOn, f.ville]);

  const base = useMemo(() => withDist.filter((a) => {
    if (f.resines.length && !f.resines.some((r) => a.resines.includes(r))) return false;
    if (f.q) { const q = f.q.toLowerCase(); if (!(a.nom.toLowerCase().includes(q) || a.commune.toLowerCase().includes(q))) return false; }
    if (f.proxOn && a._dist > f.radius) return false;
    return true;
  }), [withDist, f.resines, f.q, f.proxOn, f.radius]);

  const counts = useMemo(() => { const c = {}; base.forEach((a) => { c[a.type] = (c[a.type] || 0) + 1; }); return c; }, [base]);

  const rows = useMemo(() => {
    let list = base.filter((a) => !f.types.length || f.types.includes(a.type));
    const dir = sort.dir === "asc" ? 1 : -1;
    const col = f.proxOn && sort.col === "nom" && f._autoDist ? "dist" : sort.col;
    list = [...list].sort((a, b) => {
      let r = 0;
      if (col === "nom") r = a.nom.localeCompare(b.nom, "fr");
      else if (col === "type") r = window.TYPE_LABEL[a.type].localeCompare(window.TYPE_LABEL[b.type], "fr");
      else if (col === "commune") r = a.commune.localeCompare(b.commune, "fr");
      else if (col === "dist") r = (a._dist ?? 1e9) - (b._dist ?? 1e9);
      return r * dir;
    });
    return list;
  }, [base, f.types, sort, f.proxOn]);

  const reset = () => { setF(DEFAULT_FILTERS); setSort({ col: "nom", dir: "asc" }); };

  /* ---------- Leaflet ---------- */
  const mapEl = useRef(null), mapRef = useRef(null), tileRef = useRef(null), markersRef = useRef(null), circleRef = useRef(null), refMkRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapEl.current, { zoomControl: false, attributionControl: true, minZoom: 5, maxZoom: 16 }).setView([46.6, 2.45], 6);
    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  /* tiles (theme + basemap) */
  useEffect(() => {
    const map = mapRef.current; if (!map) return;
    const conf = basemap === "standard" ? theme.tile : TILES[basemap];
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = L.tileLayer(conf.url, { attribution: conf.attribution, subdomains: "abcd", maxZoom: 19 }).addTo(map);
    tileRef.current.bringToBack();
  }, [t.theme, basemap]);

  /* markers */
  useEffect(() => {
    const map = mapRef.current, grp = markersRef.current; if (!map || !grp) return;
    grp.clearLayers();
    rows.forEach((a) => {
      const anchor = shape === "pin" ? [15, 30] : shape === "blob" ? [16, 16] : [14, 14];
      const icon = L.divIcon({ className: "mk-wrap", html: markerHTML(a, shape, false), iconSize: shape === "pin" ? [30, 30] : [32, 32], iconAnchor: anchor });
      L.marker([a.lat, a.lng], { icon }).addTo(grp).bindPopup(popupHTML(a), { closeButton: false, offset: [0, shape === "pin" ? -26 : -14] });
    });
  }, [rows, shape, t.theme]);

  /* proximity circle + reference marker */
  useEffect(() => {
    const map = mapRef.current; if (!map) return;
    if (circleRef.current) { map.removeLayer(circleRef.current); circleRef.current = null; }
    if (refMkRef.current) { map.removeLayer(refMkRef.current); refMkRef.current = null; }
    if (f.proxOn) {
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0E8C53";
      circleRef.current = L.circle([refPt.lat, refPt.lng], { radius: f.radius * 1000, color: accent, weight: 1.5, fillColor: accent, fillOpacity: .07, dashArray: "4 5" }).addTo(map);
      refMkRef.current = L.marker([refPt.lat, refPt.lng], {
        icon: L.divIcon({ className: "mk-wrap", html: `<div style="width:18px;height:18px;border-radius:50%;background:${accent};border:3px solid #fff;box-shadow:0 0 0 2px ${accent},0 2px 6px rgba(0,0,0,.4)"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] }),
        zIndexOffset: -100, interactive: false
      }).addTo(map);
      map.flyToBounds(circleRef.current.getBounds(), { padding: [60, 60], duration: .6, maxZoom: 9 });
    }
  }, [f.proxOn, f.ville, f.radius, t.theme]);

  /* invalidate size on layout change */
  useEffect(() => { const id = setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 360); return () => clearTimeout(id); }, [sideCollapsed, view]);
  useEffect(() => { const h = () => mapRef.current && mapRef.current.invalidateSize(); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);

  const zoom = (d) => mapRef.current && mapRef.current.setZoom(mapRef.current.getZoom() + d);

  const downloadCSV = () => {
    const head = ["Nom", "Type", "Commune", "Département", "Résines", f.proxOn ? "Distance (km)" : null].filter(Boolean);
    const lines = rows.map((a) => [a.nom, window.TYPE_LABEL[a.type], a.commune, a.dept, a.resines.join(" "), f.proxOn ? a._dist : null].filter((x) => x !== null).map((x) => `"${x}"`).join(","));
    const blob = new Blob(["\uFEFF" + [head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "acteurs-plastiques.csv"; link.click(); URL.revokeObjectURL(url);
  };

  const sortLabel = { nom: "Nom", type: "Type", commune: "Commune", dist: "Distance" };

  return (
    <div className="app">
      <Header view={view} setView={setView} count={rows.length} total={window.ACTEURS.length} />
      <div className="body">
        <Sidebar collapsed={sideCollapsed} f={f} set={set} counts={counts} total={window.ACTEURS.length} shown={rows.length} onReset={reset} />
        <button className="side-handle" onClick={() => setSideCollapsed((c) => !c)} title="Afficher / masquer les filtres">
          <Icon name={sideCollapsed ? "chevronRight" : "chevronLeft"} />
        </button>
        {!sideCollapsed && <div className="scrim" onClick={() => setSideCollapsed(true)} />}

        <div className="content">
          <div className="map" ref={mapEl} />

          {/* mobile filter trigger */}
          <button className="mobile-filter" onClick={() => setSideCollapsed((c) => !c)}><Icon name="sliders" />Filtres</button>

          {view === "map" && (
            <>
              <div className="map-ctrl tr">
                <div className="basemap">
                  <button className={basemap === "standard" ? "on" : ""} onClick={() => setBasemap("standard")}><Icon name="map" />Plan</button>
                  <button className={basemap === "osm" ? "on" : ""} onClick={() => setBasemap("osm")}>OSM</button>
                  <button className={basemap === "satellite" ? "on" : ""} onClick={() => setBasemap("satellite")}><Icon name="layers" />Satellite</button>
                </div>
              </div>
              <div className="map-ctrl br">
                <div className="zoomer">
                  <button onClick={() => zoom(1)}><Icon name="plus" /></button>
                  <button onClick={() => zoom(-1)}><Icon name="minus" /></button>
                </div>
              </div>
              <div className="map-ctrl" style={{ left: 14, bottom: 22 }}><Legend /></div>
            </>
          )}

          {view === "list" && (
            <div className="overlay">
              <div className="view-bar">
                <div className="cnt"><b>{rows.length}</b> acteur{rows.length > 1 ? "s" : ""}{f.proxOn ? ` à moins de ${f.radius} km de ${f.ville}` : ""}</div>
                <div className="sortsel">
                  <button className="sel-btn" onClick={() => setSort((s) => ({ col: s.col === "nom" ? (f.proxOn ? "dist" : "type") : s.col === "type" ? "commune" : s.col === "commune" ? (f.proxOn ? "dist" : "nom") : "nom", dir: "asc" }))}>
                    <Icon name="sort" />Trier : {sortLabel[sort.col]}
                  </button>
                </div>
              </div>
              <div className="ov-scroll">
                {rows.length ? <ListView rows={rows} proxOn={f.proxOn} /> : <div style={{ position: "relative", height: "100%" }}><Empty /></div>}
              </div>
            </div>
          )}

          {view === "table" && (
            <div className="overlay">
              <div className="view-bar">
                <div className="cnt"><b>{rows.length}</b> acteur{rows.length > 1 ? "s" : ""} · tableau</div>
                <button className="dl-btn" onClick={downloadCSV}><Icon name="download" />Exporter CSV</button>
              </div>
              <div className="ov-scroll">
                {rows.length ? <TableView rows={rows} sort={sort} setSort={setSort} proxOn={f.proxOn} /> : <div style={{ position: "relative", height: "100%" }}><Empty /></div>}
              </div>
            </div>
          )}
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Direction visuelle" />
        <ThemePicker value={t.theme} onChange={(v) => setTweak("theme", v)} />
        <TweakSection label="Carte" />
        <TweakRadio label="Marqueurs" value={t.markerShape} options={[{ value: "auto", label: "Auto" }, { value: "goutte", label: "Goutte" }, { value: "galet", label: "Galet" }, { value: "balise", label: "Balise" }]} onChange={(v) => setTweak("markerShape", v)} />
        <TweakSection label="Démarrage" />
        <TweakRadio label="Vue par défaut" value={t.startView} options={[{ value: "map", label: "Carte" }, { value: "list", label: "Liste" }, { value: "table", label: "Tableau" }]} onChange={(v) => setTweak("startView", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
