# Fusion Games - site web

Site du studio **Fusion Games**

## Structure

```
fusion-games/
├── index.html            ← 
├── style.css         
├── main.js           
└── images/
    ├── logo.png         
    ├── favicon.png       
    ├── about-game-over.jpg   
    ├── knight-monsters.png      
    ├── Mouchouchat.jpg
    ├── Aziryo.jpg
    ├── Your average seahull.jpg
    ├── Mordak.jpg


## Modifier le site

- **Un texte** : dans `index.html`, changer `data-fr`, `data-en` ET le texte entre les balises.
- **Une image** : remplacer le fichier dans `assets/images/` en gardant le même nom.
- **Les couleurs / tailles de texte** : variables au début de `css/style.css`.
- **Ajouter un jeu ou un membre** : copier un bloc `<div class="game">` ou `<div class="card">`.
- **Adresse qui reçoit les messages** : créer une clé sur https://web3forms.com et la remplacer dans le champ `access_key` de `index.html`.
- **Mentions légales** : remplacer ou compléter le texte dans le bloc `<dialog id="legal">`.

## Voir le site sur son ordinateur

Double-cliquer sur `index.html` (il faut internet pour la police pixel).
Le formulaire de contact ne marche qu'une fois le site publié.

## Publier gratuitement sur GitHub Pages

1. Créer un dépôt sur github.com (public).
2. Envoyer tout le contenu du dossier à la racine du dépôt (`index.html` doit être à la racine).
3. Dépôt → **Settings** → **Pages** → Source : branche `main`, dossier `/ (root)` → **Save**.
4. Le site est en ligne après 1 à 2 minutes à l'adresse `https://TON-PSEUDO.github.io/NOM-DU-DEPOT/`.
