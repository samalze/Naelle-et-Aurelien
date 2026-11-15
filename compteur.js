function petale(){
    const zone = document.getElementById("petales");
    const couleurs = ["#ffb3c6", "#ff9eb5", "#ffc8d6", "#f48fb1"];
    
    const petale = document.createElement("div")
    petale.className = "petale"

    const taille = 8 + Math.random() * 10;
    petale.style.left = Math.random() * 100 + "%";
    petale.style.width = taille + "px";
    petale.style.height = taille * 1.3 + "px";
    petale.style.background = couleurs[Math.floor(Math.random() * couleurs.length)];
    petale.style.opacity = 0.5 + Math.random() * 0.4;
    petale.style.animationDuration = 10 + Math.random() * 6 + "s";

    // Supprime le pétale une fois sa chute terminée
     petale.addEventListener("animationend", () => petale.remove());

    zone.appendChild(petale);
}

setInterval(petale, 250);



const debut = new Date(2026, 4, 22, 21, 30); // Date de mise en couple

function pad(n) {
  return String(n).padStart(2, "0"); // Rajoute un 0 devant les heures, minutes et secondes
}

function compteur() {
const maintenant = new Date(); // Date actuelle
const duree = maintenant-debut; // durée du couple
const jours = Math.floor(duree / (1000 * 60 * 60 * 24)); // Conversions
const heures = Math.floor(duree / (1000 * 60 * 60)) % 24; 
const minutes = Math.floor(duree / (1000 * 60)) % 60;
const secondes = Math.floor(duree / 1000) % 60;

document.getElementById("jours").textContent = jours
document.getElementById("heures").textContent = pad(heures)
document.getElementById("minutes").textContent = pad(minutes)
document.getElementById("secondes").textContent = pad(secondes)
}


compteur(); // un premier affichage immédiat
setInterval(compteur, 1000); // puis toutes les secondes



const grandCadre = document.getElementById("grand_cadre");
const piste = document.getElementById("cadre_principal");
const pages = piste.children;
const boutonRecule = document.getElementById("recule");
const boutonAvance = document.getElementById("avance");
const conteneurPoints = document.getElementById("points");

let courant = 0;  // page affichée
let maxVu = 0;    // page la plus avancée déjà visitée


function aller(numero) {
  // 1. Refuser les numéros interdits
  if (numero < 0) return;
  if (numero > pages.length - 1) return;
  if (numero > maxVu + 1) return; // verrouillage

  // 2. Mettre à jour les variables
  courant = numero;
  if (courant > maxVu) maxVu = courant;

  // 3. Décaler la piste
  piste.style.transform = "translateX(-" + courant * 100 + "%)";

  // 4. Mettre à jour l'affichage
  majAffichage();

  if (pages[courant].id === "page_musique") {
  demarrerComptage();
  }
  if (pages[courant].id === "page_messages") {
    demarrerMessages();
  }
  if (pages[courant].id === "page_stats") {
    demarrerStats();
  }
}

for (let i = 0; i < pages.length; i++) {
  const point = document.createElement("button");
  point.className = "point";
  point.setAttribute("aria-label", "Page " + (i + 1));
  point.addEventListener("click", () => aller(i));
  conteneurPoints.appendChild(point);
}

function majAffichage() {
  const points = document.querySelectorAll(".point");

  points.forEach((point, i) => {
    point.classList.toggle("actif", i === courant);
    point.classList.toggle("verrouille", i > maxVu + 1);
  });

  boutonRecule.disabled = courant === 0;
  boutonAvance.disabled = courant === pages.length - 1;
}

boutonRecule.addEventListener("click", () => aller(courant - 1));
boutonAvance.addEventListener("click", () => aller(courant + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") aller(courant - 1);
  if (e.key === "ArrowRight") aller(courant + 1);
});

majAffichage();

//Musique

const nbMusiques = document.getElementById("nb_musiques");
const cibleMusiques = 153;      // le nombre à atteindre
let minuteurMusiques = null;    // retient le setInterval en cours

function demarrerComptage() {
  clearInterval(minuteurMusiques);     // annule un comptage déjà en cours
  let n = 0;
  nbMusiques.textContent = 0;

  // Si la personne a réduit les animations : affichage direct
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nbMusiques.textContent = cibleMusiques;
    return;
  }

  minuteurMusiques = setInterval(() => {
    n += Math.ceil((cibleMusiques - n) / 12);   // le pas diminue vers la fin
    nbMusiques.textContent = n;

    if (n >= cibleMusiques) {
      nbMusiques.textContent = cibleMusiques;
      clearInterval(minuteurMusiques);          // stoppe le comptage
    }
  }, 40);
}



// frise chronologique

const etapes = [
  {
    court: "Mai",
    titre: "Notre premier mois ensemble ❤️",
    texte: "Après près d'une année de flirt, une mise en couple ça se fête !",
    img: "Photos/Frise/IMG_7584.png",
    alt: "Petit shopping à Velizy 2",
    video:"",
    poster:"",
  },
  {
    court: "Juin",
    titre: "Notre première nuit ensemble 🛌😘",
    texte: "Mais avant, brossage de dents !",
    img: "",             // vide = le cadre de remplacement reste affiché
    alt: "",
    video: "Photos/Frise/IMG_7685.mp4",
    poster: "Photos/Frise/Collé 25-10-2026 à 12.05.22.png"
  },
  {
    court: "Juillet",
    titre: "Nos premiers voyages ensemble 🚂",
    texte: "Entre le camping et interrail, on a vraiment pas chaumé.",
    img: "Photos/Frise/95290520-f200-489a-a588-86f7f4d1b647.JPG",             // vide = le cadre de remplacement reste affiché
    alt: "Nous (trop mignons) dans le train !"
  },
  {
    court: "Août",
    titre: "Les au revoir difficiles... 🥺",
    texte: "Après un mois sans se voir, il était temps de se dire au revoir.",
    img: "Photos/Frise/IMG_7627.png",             // vide = le cadre de remplacement reste affiché
    alt: "Nous (encore trop mignons) en plein shoping !"
  },
  {
    court: "Septembre",
    titre: "Le premier mois à distance 🤳",
    texte: "Même si c'est dur, on réussit quand même à s'amuser !",
    img: "Photos/Frise/IMG_8514.PNG",             // vide = le cadre de remplacement reste affiché
    alt: "Nous qui faisons les débiles en appel"
  },
  {
    court: "Octobre",
    titre: "Nos premières vacances en famille 🏕️",
    texte: "Qui a écrit en premier ?",
    img: "",             // vide = le cadre de remplacement reste affiché
    alt: ""
  },
  {
    court: "Novembre",
    titre: "Le premier message",
    texte: "Qui a écrit en premier ?",
    img: "",             // vide = le cadre de remplacement reste affiché
    alt: ""
  }
];

const frise = document.getElementById("frise");
const rempli = document.getElementById("rempli");
const carteFrise = document.getElementById("carte_frise");
const photo = document.getElementById("photo_frise");
const photoVide = photo.innerHTML;     // mémorise le texte de remplacement
const boutonsEtapes = [];

let courantFrise = 0;   // étape affichée
let maxVuFrise = 0;     // étape la plus avancée déjà atteinte

etapes.forEach((etape, i) => {
  const bouton = document.createElement("button");
  bouton.className = "etape";
  bouton.setAttribute("aria-label", etape.titre);
  bouton.innerHTML = '<span class="rond"></span><span>' + etape.court + '</span>';
  bouton.addEventListener("click", () => choisirEtape(i));

  frise.appendChild(bouton);
  boutonsEtapes.push(bouton);
});

function choisirEtape(i) {
  // 1. Verrouillage
  if (i > maxVuFrise + 1) return;

  // 2. Mise à jour des variables
  courantFrise = i;
  if (i > maxVuFrise) maxVuFrise = i;

  // 3. Apparence des points
  boutonsEtapes.forEach((b, n) => {
    b.classList.toggle("actif", n === i);
    b.classList.toggle("fait", n < i);
    b.classList.toggle("verrouille", n > maxVuFrise + 1);
  });

  // 4. Barre de progression
  rempli.style.width = "calc((100% - 26px) * " + i / (etapes.length - 1) + ")";

  // 5. Textes
  const etape = etapes[i];
  document.getElementById("date_frise").textContent = etape.date;
  document.getElementById("titre_frise").textContent = etape.titre;
  document.getElementById("texte_frise").textContent = etape.texte;

  // 6. Photo
  if (etape.video) {
    const clip = document.createElement("video");
    clip.src = etape.video;
    clip.loop = true;          // tourne en boucle
    clip.muted = true;         // obligatoire pour que le démarrage automatique soit autorisé
    clip.autoplay = true;      // démarre tout seul
    clip.playsInline = true;   // évite le plein écran forcé sur iPhone
    // pas de clip.controls : le menu disparaît
  if (etape.poster) clip.poster = etape.poster;
     photo.replaceChildren(clip);
} else if (etape.img) {
    const image = document.createElement("img");
    image.src = etape.img;
    image.alt = etape.alt;
    photo.replaceChildren(image);
} else {
  photo.innerHTML = photoVide;
}

  // 7. Rejouer l'animation de la carte
  carteFrise.style.animation = "none";
  carteFrise.offsetWidth;            // force le navigateur à recalculer
  carteFrise.style.animation = "";
}

choisirEtape(0);


const agrandi = document.getElementById("agrandi");
const agrandiImg = document.getElementById("agrandi_img");
const agrandiVideo = document.getElementById("agrandi_video");


// Ouvrir : un clic dans le conteneur de la photo
photo.addEventListener("click", (e) => {
  const media = e.target.closest("img, video");
  if (!media) return;
  if (agrandi.classList.contains("ouvert")) return;

  if (media.tagName === "VIDEO") {
    agrandiVideo.src = media.currentSrc;
    agrandiVideo.hidden = false;
    agrandiImg.hidden = true;
    agrandiVideo.play();
  } else {
    agrandiImg.src = media.src;
    agrandiImg.alt = media.alt;
    agrandiImg.hidden = false;
    agrandiVideo.hidden = true;
  }

  agrandi.classList.add("ouvert");
});

function fermerAgrandi() {
  agrandi.classList.remove("ouvert");
  agrandiVideo.pause();
}

agrandi.addEventListener("click", fermerAgrandi);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fermerAgrandi();
});


// Page messages

const cibleMessages = 121743; 
const cibleElle = 74713;                        // messages envoyés par Naëlle
const cibleLui = 47030;                         // messages envoyés par Aurélien


const messagesExemple = [
  { de: "elle", texte: "🚨🚨🚨🚨", pause: 0},
  { de: "elle", texte: "Aurélien", pause: 2000},
  { de: "lui",  texte: "Voui ?", pause: 1000},
  { de: "elle", texte: "Regarder l'heure", pause: 2000},
  { de: "lui",  texte: "Ah ouais tu conjugues même plus c’est chaud là", pause: 2000},
  { de: "elle", texte: "Javoue pardon", pause: 0},
  { de: "elle", texte: "Je te vouvoie", pause: 1000},
  { de: "lui",  texte: "Bah nn toujours pas", pause: 0},
  { de: "lui",  texte: "Y’aurais un z", pause: 2000},
  { de: "elle", texte: "Regarderz ?", pause: 1000},
  { de: "lui",  texte: "Regardez", pause: 1000},
  { de: "elle", texte: "Tavais compris que javaks compeis quznd meme ?", pause: 2000},
  { de: "lui",  texte: "Nn", pause: 1000},
  { de: "lui",  texte: "En plus guette le nombre de fautes", pause: 1000},
  { de: "elle", texte: "Mais CEST TON NOIR LA !", pause: 2000},
  { de: "lui",  texte: "MDRRRRR", pause: 0},
  { de: "lui",  texte: "NE PAS SORTIR DU CONTEXTE", pause: 0},
];

const nbMessages = document.getElementById("nb_messages");
const chatMessages = document.getElementById("chat_messages");

let minuteurMessages = null;   // retient le setInterval du compteur
let delaisBulles = [];         // retient les setTimeout des bulles en attente

function compterVers(element, cible) {
  clearInterval(element.minuteur);         // chaque élément garde son propre minuteur
  let n = 0;
  element.textContent = "0";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = cible.toLocaleString("fr-FR");
    return;
  }

  element.minuteur = setInterval(() => {
    n += Math.ceil((cible - n) / 14);
    element.textContent = n.toLocaleString("fr-FR");

    if (n >= cible) {
      element.textContent = cible.toLocaleString("fr-FR");
      clearInterval(element.minuteur);
    }
  }, 40);
}

function compterMessages() {
  compterVers(nbMessages, cibleMessages);
  compterVers(document.getElementById("nb_elle"), cibleElle);
  compterVers(document.getElementById("nb_lui"), cibleLui);
}

function creerBulle(message) {
  const bulle = document.createElement("div");
  bulle.className = "bulle " + message.de;

  const auteur = document.createElement("small");
  auteur.textContent = message.de === "elle" ? "Prix Nobel de Physique" : "Prof particulier de physique";

  bulle.appendChild(auteur);
  bulle.appendChild(document.createTextNode(message.texte));
  chatMessages.appendChild(bulle);
}
const attenteDepart = 500;    // avant la première bulle
const ecartBulles = 1000;     // entre deux bulles

function lancerBulles() {
  // Annule les bulles encore en attente et vide la conversation
  delaisBulles.forEach(clearTimeout);
  delaisBulles = [];
  chatMessages.innerHTML = "";

  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduit) {
    messagesExemple.forEach(creerBulle);      // tout d'un coup
    return;
  }
  let temps = attenteDepart;

  messagesExemple.forEach((message) => {
    const duree = Math.min(500 + message.texte.length * 40, 2200);

    // Temps 1 : les points apparaissent
    const t1 = setTimeout(() => {
      message.indicateur = creerIndicateur(message);
    }, temps);

    // Temps 2 : les points disparaissent, le message arrive
    const t2 = setTimeout(() => {
      message.indicateur.remove();
      creerBulle(message);
    }, temps + duree);

    delaisBulles.push(t1, t2);
    temps += duree + (message.pause ?? ecartBulles);
})};

function demarrerMessages() {
  compterMessages();
  lancerBulles();
}

function creerIndicateur(message) {
  const indicateur = document.createElement("div");
  indicateur.className = "bulle ecrit " + message.de;
  indicateur.setAttribute("aria-hidden", "true");   // ignoré par les lecteurs d'écran
  indicateur.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.appendChild(indicateur);
  return indicateur;     // on le renvoie pour pouvoir le supprimer plus tard
}

// Page stats

const statsDonnees = {
  heures: 312,     // total d'heures d'appel
  appels: 184,
  vocaux: 1250,
  photos: 2310
};

function compterVers(element, cible, quandFini) {
  clearInterval(element.minuteur);
  let n = 0;
  element.textContent = "0";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = cible.toLocaleString("fr-FR");
    if (quandFini) quandFini(cible);
    return;
  }

  element.minuteur = setInterval(() => {
    n += Math.ceil((cible - n) / 14);
    element.textContent = n.toLocaleString("fr-FR");

    if (n >= cible) {
      element.textContent = cible.toLocaleString("fr-FR");
      clearInterval(element.minuteur);
      if (quandFini) quandFini(cible);    // appelle la fonction donnée, si elle existe
    }
  }, 40);
}

function demarrerStats() {
  // Réinitialise le texte sous les heures
  const equiv = document.getElementById("stats_equiv");
  equiv.textContent = "passées au téléphone";

  // Les trois comptages
  compterVers(document.getElementById("stats_heures"), statsDonnees.heures, (h) => {
    equiv.textContent = "soit environ " + Math.round(h / 24) + " jours d'affilée";
  });
  compterVers(document.getElementById("stats_appels"), statsDonnees.appels);
  compterVers(document.getElementById("stats_vocaux"), statsDonnees.vocaux);
  compterVers(document.getElementById("stats_photos"), statsDonnees.photos);

  // Rejoue l'apparition des cartes
  document.querySelectorAll(".stats_carte").forEach((carte) => {
    carte.style.animation = "none";
    carte.offsetWidth;              // force le navigateur à recalculer
    carte.style.animation = "";
  });
}