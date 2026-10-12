/* ==========================================================
   FUSION GAMES - code du site
   Plan du fichier :
     1. Changement de langue (FR / EN)
     2. Menu mobile (3 traits)
     3. Formulaire de contact (Web3Forms)
     4. Fenêtre "Mentions légales"
     5. Navigation entre l'accueil et la page "Contact"
   ========================================================== */


/* ---------- 1. CHANGEMENT DE LANGUE ----------
   Chaque texte traduisible porte data-fr="..." et data-en="...".
   Au clic, on remplace le texte affiché par celui de la langue choisie. */
let lang = "fr";                                   // langue actuelle
const langButton = document.getElementById("lang");

langButton.addEventListener("click", () => {
  lang = lang === "fr" ? "en" : "fr";              // on bascule
  document.documentElement.lang = lang;            // utile pour le CSS (.fr / .en) et l'accessibilité
  langButton.textContent = "🌐 " + (lang === "fr" ? "Français" : "English");

  document.querySelectorAll("[data-fr]").forEach((element) => {
    element.textContent = element.dataset[lang];   // data-fr ou data-en
  });
});


/* ---------- 2. MENU MOBILE ----------
   Sur petit écran, le bouton "☰" ouvre / ferme la liste des liens. */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");

function setMenu(open) {
  nav.classList.toggle("open", open);              // le CSS affiche le menu si la classe "open" est là
  burger.textContent = open ? "✕" : "☰";
  burger.setAttribute("aria-expanded", open);
}

burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

// Quand on clique sur un lien du menu, on referme le menu
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});


/* ---------- 3. FORMULAIRE DE CONTACT ----------
   Le formulaire est envoyé au service gratuit Web3Forms,
   qui transmet le message par e-mail. */
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const form = document.getElementById("cForm");
const formStatus = document.getElementById("cStatus");  // (évite le nom "status", réservé par le navigateur)

// Messages affichés sous le formulaire, dans les deux langues
const MESSAGES = {
  fr: { wait: "Envoi en cours...", ok: "Message envoyé, merci !", err: "Envoi impossible. Réessayez plus tard." },
  en: { wait: "Sending...",        ok: "Message sent, thank you!", err: "Could not send. Please try again later." },
};

form.addEventListener("submit", (event) => {
  event.preventDefault();                          // empêche le rechargement de la page
  formStatus.textContent = MESSAGES[lang].wait;

  // On transforme les champs du formulaire en objet { email, subject, message, ... }
  const data = Object.fromEntries(new FormData(form).entries());

  fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        formStatus.textContent = MESSAGES[lang].ok;
        form.reset();                              // vide les champs
      } else {
        formStatus.textContent = MESSAGES[lang].err;
      }
    })
    .catch(() => {
      formStatus.textContent = MESSAGES[lang].err;     // pas de connexion, service indisponible...
    });
});


/* ---------- 4. FENÊTRE "MENTIONS LÉGALES" ---------- */
const legal = document.getElementById("legal");

// Ouvre la fenêtre depuis le lien du footer
document.getElementById("legalLink").addEventListener("click", (event) => {
  event.preventDefault();
  legal.showModal();
});

// Ferme avec le bouton "Fermer"
document.getElementById("lClose").addEventListener("click", () => legal.close());

// Ferme aussi quand on clique en dehors de la fenêtre
legal.addEventListener("click", (event) => {
  if (event.target === legal) legal.close();
});


/* ---------- 5. NAVIGATION ENTRE LES "PAGES" ----------
   Le site a deux vues : l'accueil (#home) et le contact (#contactPage).
   On choisit laquelle afficher selon la fin de l'adresse :
     ...index.html           -> accueil
     ...index.html#contact   -> page contact */
const home = document.getElementById("home");
const contactPage = document.getElementById("contactPage");

function route() {
  const showContact = location.hash === "#contact";
  home.hidden = showContact;
  contactPage.hidden = !showContact;

  // Sur l'accueil, si l'adresse vise une section (#jeux, #equipe...), on y défile
  const target = !showContact && location.hash.length > 1
    ? document.querySelector(location.hash)
    : null;

  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);                      // sinon on remonte en haut
}

window.addEventListener("hashchange", route);      // à chaque changement de lien
route();                                           // et une fois au chargement
