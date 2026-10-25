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