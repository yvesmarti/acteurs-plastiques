/* SVG icons — inner markup designed for viewBox 0 0 24 24, stroke = currentColor.
   Rendered by the <Icon> component (components.jsx). */
window.ICONS = {
  /* types d'acteurs */
  broyeur: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  recycleur: '<polyline points="7 17.5 4.2 17.5 5.7 14.9"/><polyline points="16.2 5.2 17.7 7.8 20.2 6.4"/><polyline points="9.1 20.5 7.6 17.9 10.2 16.4"/><path d="M9.5 4.8 12 9 7.6 9.7"/><path d="M14.6 5.2 16.2 5.2 18.6 12.2"/><path d="M5.7 14.9 9.6 8.5"/><path d="M14.4 16.4 20.2 6.4"/><path d="M9.1 20.5 16.5 20.5 14.4 16.4"/>',
  trieur: '<polygon points="21 4 3 4 10 12.2 10 19 14 21 14 12.2 21 4"/>',
  negociant: '<polyline points="16.5 2.5 20.5 6.5 16.5 10.5"/><path d="M3.5 11.5V9a3 3 0 0 1 3-3h14"/><polyline points="7.5 21.5 3.5 17.5 7.5 13.5"/><path d="M20.5 12.5V15a3 3 0 0 1-3 3h-14"/>',

  /* navigation / actions */
  search: '<circle cx="11" cy="11" r="7.5"/><line x1="21" y1="21" x2="16.8" y2="16.8"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  reset: '<polyline points="2 5 2 11 8 11"/><path d="M4 15a8 8 0 1 0 2-8.5L2 11"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.8"/>',
  crosshair: '<circle cx="12" cy="12" r="9.5"/><line x1="22" y1="12" x2="18.5" y2="12"/><line x1="5.5" y1="12" x2="2" y2="12"/><line x1="12" y1="5.5" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18.5"/>',
  layers: '<polygon points="12 2.5 2.5 7 12 11.5 21.5 7 12 2.5"/><polyline points="2.5 16.5 12 21 21.5 16.5"/><polyline points="2.5 11.8 12 16.3 21.5 11.8"/>',
  map: '<polygon points="2 6 2 21 8.5 17.5 15.5 21 22 17.5 22 2.5 15.5 6 8.5 2.5 2 6"/><line x1="8.5" y1="2.5" x2="8.5" y2="17.5"/><line x1="15.5" y1="6" x2="15.5" y2="21"/>',
  list: '<line x1="8.5" y1="6" x2="21" y2="6"/><line x1="8.5" y1="12" x2="21" y2="12"/><line x1="8.5" y1="18" x2="21" y2="18"/><circle cx="3.8" cy="6" r="1.1"/><circle cx="3.8" cy="12" r="1.1"/><circle cx="3.8" cy="18" r="1.1"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.7" x2="21" y2="14.7"/><line x1="11.5" y1="9.5" x2="11.5" y2="20"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1.5" y1="14" x2="6.5" y2="14"/><line x1="9.5" y1="8" x2="14.5" y2="8"/><line x1="17.5" y1="16" x2="22.5" y2="16"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  sort: '<polyline points="7 4 7 20"/><polyline points="4 7 7 4 10 7"/><polyline points="17 20 17 4"/><polyline points="14 17 17 20 20 17"/>',
  download: '<path d="M21 15v3.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V15"/><polyline points="7.5 10.5 12 15 16.5 10.5"/><line x1="12" y1="15" x2="12" y2="3"/>',
  droplet: '<path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.4 0z"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V6l7-3v18"/><path d="M19 21V10l-7-4"/><line x1="8.5" y1="9" x2="8.5" y2="9.01"/><line x1="8.5" y1="13" x2="8.5" y2="13.01"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.5"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
};
