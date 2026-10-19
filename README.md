# Belladele Couture — site web

Site de l'atelier **Retouches et Créations Belladele Couture**, 1 rue Magnier Bédu, 95410 Groslay.
Astro 7 (pages statiques) + une fonction serveur Vercel pour le formulaire de contact.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build de production (.vercel/output)
```

> **Windows avec Smart App Control** : le compilateur natif d'Astro (non signé) peut être bloqué
> (« Une stratégie de contrôle d'application a bloqué ce fichier »). Installer la variante WebAssembly,
> sans l'enregistrer dans `package.json` :
> `npm i --no-save --force @astrojs/compiler-binding-wasm32-wasi@0.5.2`
> Le build Vercel (Linux) n'est pas concerné.

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : proposition de valeur, prestations, atelier, note Google, déroulé, horaires, carte, FAQ |
| `/creation-sur-mesure` | Robes de soirée, cocktail, mère-fille, accessoires ; sur-mesure vs semi-mesure |
| `/robe-de-mariee` | Création, robe de mairie, ajustement de robe de mariée |
| `/retouches` | Retouches de vêtements, conseils pratiques |
| `/galerie` | Galerie (photos d'illustration provisoires) + lien Instagram |
| `/contact` | Appel, e-mail, formulaire de devis, horaires, carte |
| `/mentions-legales`, `/confidentialite` | Pages légales (champs à compléter signalés) |
| `/404` | Page introuvable |

## Fonctionnalités

- Boutons d'appel (`tel:`), itinéraire Google Maps, e-mail ; barre d'actions fixe sur mobile.
- Statut « Ouvert maintenant / Fermé · ouvre … » calculé à l'heure de Paris ; jour courant surligné dans les horaires.
- Formulaire de contact : validation en ligne, anti-spam (pot de miel), états chargement / succès / erreur.
  Si l'envoi n'est pas configuré, le formulaire propose d'ouvrir le message prérempli dans la messagerie ou d'appeler.
- Carte Google chargée au clic seulement (pas de cookie tiers avant action de l'utilisateur).
- SEO local : titres et descriptions uniques, canonique, Open Graph, `LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList` en JSON-LD, sitemap, `robots.txt`, `llms.txt`.
- Images AVIF responsives (Astro Image), polices auto-hébergées, aucune dépendance JS côté client hormis de petits scripts.
- Accessibilité : lien d'évitement, focus visibles, contrastes ≥ 4,5:1, menu mobile au clavier (Échap), `prefers-reduced-motion` respecté.

## Configuration de l'envoi du formulaire (Resend)

1. Créer un compte sur [resend.com](https://resend.com), vérifier un domaine d'envoi, créer une clé API.
2. Dans Vercel → Project → Settings → Environment Variables (Production) :
   - `RESEND_API_KEY` = la clé
   - `CONTACT_FROM` = expéditeur vérifié, ex. `Site Belladele <contact@votre-domaine.fr>`
   - `CONTACT_TO` = `belladelecouture@gmail.com` (par défaut)
3. Redéployer. Les clés restent côté serveur (`src/pages/api/contact.ts`), jamais dans le navigateur.

## Informations collectées (vérifiées le 19/10/2026)

| Information | Valeur | Source |
|---|---|---|
| Nom | Retouches et Créations BELLADELE Couture | Fiche Google Maps |
| Catégorie | Service de retouche de vêtements | Google Maps |
| Adresse | 1 rue Magnier Bédu, 95410 Groslay | Google Maps |
| Téléphone | 06 34 42 51 68 | Google Maps + bio Instagram |
| E-mail | belladelecouture@gmail.com | Bio Instagram |
| Horaires | Lun–jeu 10 h 30–16 h ; ven–dim fermé | Google Maps |
| Note | 4,9/5 sur 16 avis | Google Maps |
| Instagram | [@belladele_couture](https://www.instagram.com/belladele_couture/) (nom affiché « Sterna Couture », ~3 160 abonnés) | Instagram |
| Activité | « Création sur mesures et semi-mesures de robes de soirée et cocktails » ; robes de mairie, de mariée, modèles mère/fille, accessoires | Bio et légendes Instagram |
| Logo | « Bell Adèle Couture », script doré sur fond blanc | Photo de profil Instagram |

Non trouvé : site web existant, Facebook, TikTok, LinkedIn, Pinterest, tarifs publics, SIREN (aucun résultat dans l'annuaire des entreprises pour ce nom ou cette adresse).

## À confirmer auprès de la commerçante

- [ ] Identité légale de l'exploitant, SIREN, forme juridique, TVA, médiateur → `src/pages/mentions-legales.astro`
- [ ] Prénom à afficher (« Sterna » ?) et présentation de la couturière (parcours, années d'expérience)
- [ ] Liste des retouches réalisées (exemples génériques dans `src/pages/retouches.astro`) et éventuels tarifs indicatifs
- [ ] Rendez-vous obligatoire ou passage libre pour les retouches ; délais habituels
- [ ] Autorisation d'utiliser les photos Instagram de ses créations (remplaceront les illustrations)
- [ ] Logo vectoriel officiel (le logotype actuel est une reprise typographique provisoire)
- [ ] Autorisation de citer des avis clients nommément (aujourd'hui : note globale + lien vers Google uniquement)
- [ ] Autres réseaux sociaux éventuels, nom de domaine souhaité
- [ ] Ajouter l'URL du site sur la fiche Google Business Profile

## Remplacer les photos

Les photos actuelles viennent d'Unsplash (licence libre) et sont marquées « Illustration » avec le nom du photographe.
Pour mettre les vraies photos : déposer les fichiers dans `src/assets/photos/`, mettre à jour les imports dans
`src/data/photos.ts`, puis passer `illustration: false` et `credit: null`.

Toutes les coordonnées sont centralisées dans `src/data/site.ts`.

## Mise en ligne avec un nom de domaine

1. Acheter le domaine (ex. `belladele-couture.fr`) chez un registrar (OVH, Gandi…) ou dans Vercel → Domains.
2. Vercel → Project → Settings → Domains → ajouter le domaine, puis créer chez le registrar les enregistrements indiqués
   (A `76.76.21.21` pour l'apex, CNAME `cname.vercel-dns.com` pour `www`).
3. Remplacer `https://belladele-couture.vercel.app` par le nouveau domaine dans `astro.config.mjs` (`site`),
   `public/robots.txt` et `public/llms.txt`, puis pousser sur `main` (redéploiement automatique).
4. Déclarer le site dans Google Search Console (envoyer `sitemap-index.xml`) et l'ajouter à la fiche Google.
