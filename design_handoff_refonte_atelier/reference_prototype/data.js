/* Acteurs plastiques — jeu de données réaliste (fictif) réparti sur la France.
   types: broyeur, recycleur, trieur, negociant
   resines: PET, PEHD, PEBD, PP, PS, PVC, ABS, PET-G */
window.ACTEURS = [
  { id: 1,  nom: "Valoplast Rhône",          type: "recycleur", commune: "Villeurbanne",        dept: "69", lat: 45.771, lng: 4.881,  resines: ["PEHD","PP","PEBD"], capacite: "24 000 t/an" },
  { id: 2,  nom: "Broyage Lyonnais SAS",      type: "broyeur",   commune: "Vénissieux",          dept: "69", lat: 45.697, lng: 4.886,  resines: ["PP","PS","ABS"],     capacite: "9 500 t/an" },
  { id: 3,  nom: "TriSelect Dauphiné",        type: "trieur",    commune: "Grenoble",            dept: "38", lat: 45.188, lng: 5.724,  resines: ["PET","PEHD","PP","PS"], capacite: "—" },
  { id: 4,  nom: "Négoce Polymères SA",       type: "negociant", commune: "Saint-Priest",        dept: "69", lat: 45.696, lng: 4.944,  resines: ["PET","PEHD","PVC"],  capacite: "—" },
  { id: 5,  nom: "Recyplast Atlantique",      type: "recycleur", commune: "Saint-Herblain",      dept: "44", lat: 47.213, lng: -1.649, resines: ["PET","PET-G"],       capacite: "31 000 t/an" },
  { id: 6,  nom: "Loire Broyage",             type: "broyeur",   commune: "Nantes",              dept: "44", lat: 47.215, lng: -1.553, resines: ["PEHD","PP"],         capacite: "6 200 t/an" },
  { id: 7,  nom: "Pôle Tri Armor",            type: "trieur",    commune: "Rennes",              dept: "35", lat: 48.117, lng: -1.677, resines: ["PET","PEHD","PEBD"], capacite: "—" },
  { id: 8,  nom: "Polymères du Nord",         type: "negociant", commune: "Roubaix",             dept: "59", lat: 50.690, lng: 3.176,  resines: ["PP","PS","ABS","PVC"], capacite: "—" },
  { id: 9,  nom: "Hauts-de-France Recyclage", type: "recycleur", commune: "Lille",               dept: "59", lat: 50.632, lng: 3.058,  resines: ["PEHD","PEBD","PP"],  capacite: "27 500 t/an" },
  { id: 10, nom: "Broyatech Flandre",         type: "broyeur",   commune: "Tourcoing",           dept: "59", lat: 50.724, lng: 3.161,  resines: ["PVC","ABS"],         capacite: "4 800 t/an" },
  { id: 11, nom: "Île-de-France Plast",       type: "recycleur", commune: "Gennevilliers",       dept: "92", lat: 48.933, lng: 2.298,  resines: ["PET","PEHD","PP"],   capacite: "38 000 t/an" },
  { id: 12, nom: "Seine Négoce Matières",     type: "negociant", commune: "Bonneuil-sur-Marne",  dept: "94", lat: 48.770, lng: 2.483,  resines: ["PET","PS","PEBD"],   capacite: "—" },
  { id: 13, nom: "Tri Sud Métropole",         type: "trieur",    commune: "Ivry-sur-Seine",      dept: "94", lat: 48.813, lng: 2.388,  resines: ["PET","PEHD","PP","PS","PVC"], capacite: "—" },
  { id: 14, nom: "Garonne Régénération",      type: "recycleur", commune: "Bègles",              dept: "33", lat: 44.808, lng: -0.547, resines: ["PEHD","PP"],         capacite: "19 000 t/an" },
  { id: 15, nom: "Broyage Aquitain",          type: "broyeur",   commune: "Mérignac",            dept: "33", lat: 44.838, lng: -0.645, resines: ["PP","PS"],           capacite: "7 100 t/an" },
  { id: 16, nom: "Occitanie Polymères",       type: "negociant", commune: "Toulouse",            dept: "31", lat: 43.604, lng: 1.444,  resines: ["PET","PEHD","ABS"],  capacite: "—" },
  { id: 17, nom: "TriOc Centre",              type: "trieur",    commune: "Colomiers",           dept: "31", lat: 43.611, lng: 1.336,  resines: ["PET","PEHD","PEBD","PP"], capacite: "—" },
  { id: 18, nom: "Méditerranée Recyclage",    type: "recycleur", commune: "Marseille",           dept: "13", lat: 43.341, lng: 5.379,  resines: ["PET","PP","PS"],     capacite: "22 000 t/an" },
  { id: 19, nom: "Provence Broyage",          type: "broyeur",   commune: "Vitrolles",           dept: "13", lat: 43.460, lng: 5.248,  resines: ["PEHD","PVC","ABS"],  capacite: "5 600 t/an" },
  { id: 20, nom: "Négoce Plast Méditerranée", type: "negociant", commune: "Aix-en-Provence",     dept: "13", lat: 43.529, lng: 5.447,  resines: ["PP","PS","PET-G"],   capacite: "—" },
  { id: 21, nom: "Hérault Tri Plus",          type: "trieur",    commune: "Montpellier",         dept: "34", lat: 43.611, lng: 3.877,  resines: ["PET","PEHD","PEBD"], capacite: "—" },
  { id: 22, nom: "Alsace Polyrecyclage",      type: "recycleur", commune: "Strasbourg",          dept: "67", lat: 48.573, lng: 7.752,  resines: ["PEHD","PP","PEBD"],  capacite: "16 500 t/an" },
  { id: 23, nom: "Broyage du Rhin",           type: "broyeur",   commune: "Mulhouse",            dept: "68", lat: 47.750, lng: 7.340,  resines: ["PP","ABS"],          capacite: "8 300 t/an" },
  { id: 24, nom: "Grand Est Matières",        type: "negociant", commune: "Nancy",               dept: "54", lat: 48.692, lng: 6.184,  resines: ["PET","PVC","PS"],    capacite: "—" },
  { id: 25, nom: "Normandie Régénération",    type: "recycleur", commune: "Le Havre",            dept: "76", lat: 49.494, lng: 0.107,  resines: ["PET","PEHD"],        capacite: "29 000 t/an" },
  { id: 26, nom: "Seine-Maritime Broyage",    type: "broyeur",   commune: "Rouen",               dept: "76", lat: 49.443, lng: 1.099,  resines: ["PP","PS","PEBD"],    capacite: "6 900 t/an" },
  { id: 27, nom: "Tri Centre Val de Loire",   type: "trieur",    commune: "Orléans",             dept: "45", lat: 47.902, lng: 1.909,  resines: ["PET","PEHD","PP"],   capacite: "—" },
  { id: 28, nom: "Bourgogne Plast Négoce",    type: "negociant", commune: "Dijon",               dept: "21", lat: 47.322, lng: 5.041,  resines: ["PEHD","PP","ABS"],   capacite: "—" },
  { id: 29, nom: "Auvergne Recyclage",        type: "recycleur", commune: "Clermont-Ferrand",    dept: "63", lat: 45.777, lng: 3.087,  resines: ["PEHD","PEBD","PP"],  capacite: "14 200 t/an" },
  { id: 30, nom: "Broyage du Forez",          type: "broyeur",   commune: "Saint-Étienne",       dept: "42", lat: 45.439, lng: 4.387,  resines: ["PP","PVC"],          capacite: "5 100 t/an" },
  { id: 31, nom: "Savoie Tri Montagne",       type: "trieur",    commune: "Chambéry",            dept: "73", lat: 45.564, lng: 5.917,  resines: ["PET","PEHD","PEBD"], capacite: "—" },
  { id: 32, nom: "Léman Polymères",           type: "negociant", commune: "Annecy",              dept: "74", lat: 45.899, lng: 6.129,  resines: ["PET","PP","PS"],     capacite: "—" },
  { id: 33, nom: "Champagne Régénération",    type: "recycleur", commune: "Reims",               dept: "51", lat: 49.258, lng: 4.032,  resines: ["PEHD","PP"],         capacite: "18 700 t/an" },
  { id: 34, nom: "Broyage Picard",            type: "broyeur",   commune: "Amiens",              dept: "80", lat: 49.895, lng: 2.302,  resines: ["PP","PS","ABS"],     capacite: "7 400 t/an" },
  { id: 35, nom: "Anjou Plast Tri",           type: "trieur",    commune: "Angers",              dept: "49", lat: 47.471, lng: -0.551, resines: ["PET","PEHD","PEBD","PP"], capacite: "—" },
  { id: 36, nom: "Limousin Recyclage",        type: "recycleur", commune: "Limoges",             dept: "87", lat: 45.834, lng: 1.261,  resines: ["PEHD","PEBD"],       capacite: "11 300 t/an" },
  { id: 37, nom: "Béarn Négoce Plastiques",   type: "negociant", commune: "Pau",                 dept: "64", lat: 43.295, lng: -0.370, resines: ["PP","PVC","PS"],     capacite: "—" },
  { id: 38, nom: "Côte Basque Broyage",       type: "broyeur",   commune: "Bayonne",             dept: "64", lat: 43.493, lng: -1.475, resines: ["PEHD","PP"],         capacite: "4 200 t/an" },
  { id: 39, nom: "Roussillon Tri Sélectif",   type: "trieur",    commune: "Perpignan",           dept: "66", lat: 42.698, lng: 2.895,  resines: ["PET","PEHD","PP","PS"], capacite: "—" },
  { id: 40, nom: "Touraine Régénération",     type: "recycleur", commune: "Tours",               dept: "37", lat: 47.394, lng: 0.684,  resines: ["PET","PEHD","PP"],   capacite: "20 400 t/an" }
];

window.TYPES = [
  { key: "broyeur",   label: "Broyeur" },
  { key: "recycleur", label: "Recycleur" },
  { key: "trieur",    label: "Trieur" },
  { key: "negociant", label: "Négociant" }
];

window.RESINES = ["PET","PEHD","PEBD","PP","PS","PVC","ABS","PET-G"];

/* Villes de référence pour le filtre de proximité */
window.VILLES_REF = [
  { nom: "Lyon",      lat: 45.764, lng: 4.835 },
  { nom: "Paris",     lat: 48.857, lng: 2.352 },
  { nom: "Marseille", lat: 43.296, lng: 5.370 },
  { nom: "Bordeaux",  lat: 44.838, lng: -0.579 },
  { nom: "Lille",     lat: 50.629, lng: 3.057 },
  { nom: "Toulouse",  lat: 43.604, lng: 1.444 },
  { nom: "Nantes",    lat: 47.218, lng: -1.554 },
  { nom: "Strasbourg",lat: 48.573, lng: 7.752 }
];
