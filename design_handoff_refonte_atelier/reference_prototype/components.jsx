/* ============================================================
   components.jsx — presentational pieces (exported to window)
   ============================================================ */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- helpers ---------- */
function Icon({ name, size }) {
  const inner = window.ICONS[name] || "";
  return (
    <span className="ic">
      <svg width={size || 18} height={size || 18} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: inner }} />
    </span>
  );
}
const TYPE_LABEL = { broyeur: "Broyeur", recycleur: "Recycleur", trieur: "Trieur", negociant: "Négociant" };
function cvar(type) { return { "--c": `var(--t-${type})` }; }
function haversine(a, b) {
  const R = 6371, toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

/* ============================================================ HEADER */
function Header({ view, setView, count, total, onToggleSide }) {
  const tabs = [
    { k: "map", lbl: "Carte", ic: "map" },
    { k: "list", lbl: "Liste", ic: "list" },
    { k: "table", lbl: "Tableau", ic: "table" }
  ];
  return (
    <header className="hdr">
      <div className="brand">
        <div className="brand-mark"><Icon name="recycleur" size={19} /></div>
        <div className="brand-txt">
          <span className="t">Acteurs plastiques</span>
          <span className="s">Cartographie de la filière de recyclage</span>
        </div>
      </div>
      <div className="seg" role="tablist">
        {tabs.map((t) => (
          <button key={t.k} className={view === t.k ? "on" : ""} onClick={() => setView(t.k)} role="tab" aria-selected={view === t.k}>
            <Icon name={t.ic} /><span className="lbl">{t.lbl}</span>
          </button>
        ))}
      </div>
      <div className="hdr-spacer" />
      <div className="hdr-stat">
        <span className="n">{count}</span>
        <span className="l">/ {total} acteurs affichés</span>
      </div>
    </header>
  );
}

/* ============================================================ FILTERS / SIDEBAR */
function TypeChip({ type, count, state, onToggle }) {
  const cls = state === "on" ? "on" : state === "off" ? "off" : "";
  return (
    <button className={`tchip ${cls}`} style={cvar(type)} onClick={onToggle} aria-pressed={state === "on"}>
      <span className="dot"><Icon name={type} /></span>
      <span className="tx">
        <span className="nm">{TYPE_LABEL[type]}</span>
        <span className="ct">{count} {count > 1 ? "acteurs" : "acteur"}</span>
      </span>
      <span className="tick"><Icon name="check" /></span>
    </button>
  );
}

function Sidebar({ collapsed, f, set, counts, total, shown, onReset }) {
  const allTypes = window.TYPES;
  const anyType = f.types.length > 0;
  return (
    <aside className={`side ${collapsed ? "collapsed" : ""}`}>
      <div className="side-scroll">
        <div className="side-top">
          <div className="ttl"><Icon name="sliders" /><h2>Filtres</h2></div>
          <button className="reset-btn" onClick={onReset}><Icon name="reset" />Réinitialiser</button>
        </div>

        {/* search */}
        <div className="search">
          <Icon name="search" />
          <input value={f.q} onChange={(e) => set("q", e.target.value)} placeholder="Rechercher un acteur, une commune…" />
          {f.q && <button className="clr" onClick={() => set("q", "")}><Icon name="close" /></button>}
        </div>

        {/* types */}
        <div className="fgroup">
          <div className="fgroup-hd"><span className="label-kicker">Type d'acteur</span></div>
          <div className="types">
            {allTypes.map((t) => {
              const state = !anyType ? "neutral" : f.types.includes(t.key) ? "on" : "off";
              return (
                <TypeChip key={t.key} type={t.key} count={counts[t.key] || 0} state={state}
                  onToggle={() => set("types", f.types.includes(t.key) ? f.types.filter((x) => x !== t.key) : [...f.types, t.key])} />
              );
            })}
          </div>
        </div>

        {/* résines */}
        <div className="fgroup">
          <div className="fgroup-hd"><span className="label-kicker">Résines traitées</span>
            {f.resines.length > 0 && <button className="reset-btn" style={{ padding: "2px 4px" }} onClick={() => set("resines", [])}>Tout</button>}
          </div>
          <div className="resines">
            {window.RESINES.map((r) => (
              <button key={r} className={`rpill ${f.resines.includes(r) ? "on" : ""}`}
                onClick={() => set("resines", f.resines.includes(r) ? f.resines.filter((x) => x !== r) : [...f.resines, r])}>
                <Icon name="check" />{r}
              </button>
            ))}
          </div>
        </div>

        {/* proximité */}
        <div className={`prox ${f.proxOn ? "on" : ""}`}>
          <div className="prox-hd">
            <div className="lt"><Icon name="crosshair" /><b>Proximité</b></div>
            <button className={`switch ${f.proxOn ? "on" : ""}`} onClick={() => set("proxOn", !f.proxOn)} aria-pressed={f.proxOn} />
          </div>
          {f.proxOn && (
            <>
              <div>
                <div className="label-kicker" style={{ marginBottom: 7 }}>Point de référence</div>
                <div className="ville-row">
                  {window.VILLES_REF.map((v) => (
                    <button key={v.nom} className={`ville ${f.ville === v.nom ? "on" : ""}`} onClick={() => set("ville", v.nom)}>{v.nom}</button>
                  ))}
                </div>
              </div>
              <div className="radius-wrap">
                <div className="radius-top">
                  <span className="label-kicker">Rayon</span>
                  <span className="v">{f.radius}<small>km</small></span>
                </div>
                <input className="rng" type="range" min="20" max="600" step="10" value={f.radius} onChange={(e) => set("radius", +e.target.value)} />
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ============================================================ LIST */
function ActorCard({ a, dist }) {
  return (
    <article className="card" style={cvar(a.type)}>
      <div className="card-top">
        <div className="card-ic"><Icon name={a.type} size={21} /></div>
        <div className="card-hd">
          <div className="card-type">{TYPE_LABEL[a.type]}</div>
          <h3>{a.nom}</h3>
        </div>
      </div>
      <div className="card-meta">
        <span><Icon name="pin" />{a.commune} ({a.dept})</span>
        {a.capacite !== "—" && <span><Icon name="building" />{a.capacite}</span>}
      </div>
      <div className="card-res">
        {a.resines.map((r) => <span key={r}>{r}</span>)}
      </div>
      {dist != null && <span className="card-dist"><Icon name="route" />{dist} km</span>}
    </article>
  );
}

function ListView({ rows, proxOn }) {
  return (
    <div className="list">
      {rows.map((a) => <ActorCard key={a.id} a={a} dist={proxOn ? a._dist : null} />)}
    </div>
  );
}

/* ============================================================ TABLE */
function Th({ col, label, sort, setSort }) {
  const active = sort.col === col;
  return (
    <th className={active ? "sorted" : ""} onClick={() => setSort({ col, dir: active && sort.dir === "asc" ? "desc" : "asc" })}>
      {label}<Icon name="sort" />
    </th>
  );
}
function TableView({ rows, sort, setSort, proxOn }) {
  return (
    <div className="table-wrap">
      <table className="tbl">
        <thead>
          <tr>
            <Th col="nom" label="Nom" sort={sort} setSort={setSort} />
            <Th col="type" label="Type d'acteur" sort={sort} setSort={setSort} />
            <Th col="commune" label="Commune" sort={sort} setSort={setSort} />
            <th>Résines</th>
            {proxOn && <Th col="dist" label="Distance" sort={sort} setSort={setSort} />}
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id}>
              <td><div className="tbl-name"><span className="tbl-dot" style={cvar(a.type)}><Icon name={a.type} size={15} /></span><b>{a.nom}</b></div></td>
              <td><span className="tbl-badge" style={{ ...cvar(a.type), color: `var(--t-${a.type})`, background: `color-mix(in srgb, var(--t-${a.type}) 14%, transparent)` }}>{TYPE_LABEL[a.type]}</span></td>
              <td>{a.commune} <span className="faint">({a.dept})</span></td>
              <td><div className="tbl-res">{a.resines.map((r) => <span key={r}>{r}</span>)}</div></td>
              {proxOn && <td><span className={`tbl-dist ${a._dist == null ? "faint" : ""}`}>{a._dist != null ? a._dist + " km" : "—"}</span></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================ LEGEND + EMPTY */
function Legend() {
  return (
    <div className="legend">
      <h5>Légende</h5>
      <ul>
        {window.TYPES.map((t) => (
          <li key={t.key}><span className="sw" style={{ background: `var(--t-${t.key})` }} /><b>{t.label}</b></li>
        ))}
      </ul>
    </div>
  );
}
function Empty() {
  return (
    <div className="empty"><div className="box">
      <div className="ic"><Icon name="search" size={26} /></div>
      <h3>Aucun acteur trouvé</h3>
      <p>Aucun résultat ne correspond à vos filtres. Élargissez le rayon ou réinitialisez la recherche.</p>
    </div></div>
  );
}

Object.assign(window, { Icon, Header, Sidebar, ListView, TableView, Legend, Empty, haversine, TYPE_LABEL, cvar });
